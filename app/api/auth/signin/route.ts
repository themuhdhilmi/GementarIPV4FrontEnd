import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

interface User{
  hashedPassword : string
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  // 1 - Find if user exists
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    return NextResponse.json(
      {
        login: false,
        error: "User doesn't exist",
      },
      {
        status: 200,
      }
    );
  }

  // 2 - Compare passwords
  const passwordMatch = await bcrypt.compare(body.password, user.hashedPassword);

  if (!passwordMatch) {
    return NextResponse.json(
      {
        login: false,
        error: "Password Mismatch",
      },
      {
        status: 200,
      }
    );
  }

  if(!user.emailVerified)
  {
    return NextResponse.json(
      {
        login: false,
        error: "Email unverified",
      },
      {
        status: 200,
      }
    );
  }

  // 3 - If email and password are correct, return login: true
  return NextResponse.json({
    login: true,
    userId : user.id,
    userEmail : user.email
  });
}
