import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Check if the user already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (existingUser) {
    return NextResponse.json(
      {
        success: false,
        error: "User already exists",
      },
      {
        status: 200,
      }
    );
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(body.password, 10);

  // Create the new user
  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      hashedPassword: hashedPassword,
      // Other user properties you may want to include
    },
  });

  // Return success response
  return NextResponse.json({
    success: true,
    userId: newUser.id,
  });
}
