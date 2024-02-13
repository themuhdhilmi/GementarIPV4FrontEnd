import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {

    const userList = await prisma.user.findMany(
        {
            where : {
                scoreosim : {
                    not : 0
                }
            },
            orderBy : {
                scoreosim : "asc"
            },
            select : {
                email : true,
                scoreosim : true
            }
        }
    )

    return NextResponse.json({
        userList
    });
}
