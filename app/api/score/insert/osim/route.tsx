import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

interface User {
    hashedPassword: string
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
                text: "User doesn't exist",
            },
            {
                status: 200,
            }
        );
    }

    const get = await prisma.user.findUnique({
        where: {
            id: user.id
        }
    })

    if (get?.scoreosim < body.score) {
        const insert = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                scoreosim: body.score
            }
        })

        if (insert) {
            // 3 - If email and password are correct, return login: true
            return NextResponse.json({
                text: "Score inserted successfully"
            });
        }
        // 3
    }
    else
    {
        return NextResponse.json({
            text: "Old Score More Higher"
        });
    }

    return NextResponse.json({
        text: "Score failed to insert"
    });

}
