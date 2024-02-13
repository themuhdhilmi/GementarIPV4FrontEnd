import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

interface Props {
    params: {
        id: string
    }
}

export async function POST(request: NextRequest, { params }: Props) {

    if(params.id === "")
    {
      return NextResponse.json(
        {
          status : false,
          error: "String cannot be empty",
        },
        {
          status: 200,
        }
      );
    }

    const user = await prisma.user.findFirst({
        where: {
          resetPassword: params.id,
        },
    });

    if(!user)
    {
        return NextResponse.json(
            {
              status : false,
              text: "User invalid",
            },
            {
              status: 200,
            }
        );
    }


    return NextResponse.json(
        {
          status : true,
          text: "User found",
        },
        {
          status: 200,
        }
    );
}
