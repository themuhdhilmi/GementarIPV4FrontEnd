import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {

    const userList = await prisma.user.findMany(
        {
            where : {
                scoreipv4 : {
                    not : 0
                }
            },
            orderBy : {
                scoreipv4 : "asc"
            },
            select : {
                email : true,
                scoreipv4 : true
            }
        }
    )

    return NextResponse.json({
        userList
    });
}
