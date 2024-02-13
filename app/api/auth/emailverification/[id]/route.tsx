import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

interface Props {
    params: {
        id: string
    }
}

export async function POST(request: NextRequest, { params }: Props) {

    const user = await prisma.user.findUnique({
        where: {
          id: params.id,
        },
    });

    if(!user)
    {
        return NextResponse.json(
            {
              text: "User verification failed",
            },
            {
              status: 200,
            }
        );
    }

    if(user.emailVerified)
    {
        return NextResponse.json(
            {
              text: "User already verified",
            },
            {
              status: 200,
            }
        );
    }

    const verUser = await prisma.user.update({
        where :{
            id : params.id
        },
        data : {
            emailVerified : true
        }
    })

    if(verUser){
        return NextResponse.json(
            {
              text: "User found, successfully verified",
            },
            {
              status: 200,
            }
        );
    }

    return NextResponse.json(
        {
          text: "User verification failed",
        },
        {
          status: 200,
        }
    );
}
