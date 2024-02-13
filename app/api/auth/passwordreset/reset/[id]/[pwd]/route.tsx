import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

interface Props {
  params: {
    id: string;
    pwd: string;
  };
}

export async function POST(request: NextRequest, { params }: Props) {
  // Check if the user ID is empty
  if (params.id === "") {
    return NextResponse.json(
      {
        status: false,
        text: "User ID cannot be empty",
      },
      {
        status: 400, // Bad Request
      }
    );
  }

  // Check if the user with the provided resetPassword ID exists
  const user = await prisma.user.findFirst({
    where: {
      resetPassword: params.id,
    },
  });

  if (!user) {
    return NextResponse.json(
      {
        status: false,
        text: "Invalid user",
      },
      {
        status: 404, // Not Found
      }
    );
  }

  // Check if the new password is empty
  if (params.pwd === "") {
    return NextResponse.json(
      {
        status: false,
        text: "Password cannot be empty",
      },
      {
        status: 400, // Bad Request
      }
    );
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(params.pwd, 10);

  // Update the user's password in the database
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      hashedPassword,
      resetPassword: null, // Reset the resetPassword field after password change
    },
  });

  return NextResponse.json(
    {
      status: true,
      text: "Password reset successful",
    },
    {
      status: 200,
    }
  );
}
