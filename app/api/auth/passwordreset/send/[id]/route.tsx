import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

interface Props {
    params: {
        id: string
    }
}

export async function POST(request: NextRequest, { params }: Props) {

    const user = await prisma.user.findUnique({
        where: {
          email: params.id,
        },
    });

    if(!user)
    {
        return NextResponse.json(
            {
              text: "User invalid",
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
              text: "User are not verified",
            },
            {
              status: 200,
            }
        );
    }

    const random  = params.id + (Math.random() * 99999)

    const verUser = await prisma.user.update({
        where :{
            email : params.id
        },
        data : {
            resetPassword : random
        }
    })

    if(verUser){

        const mailer = require('nodemailer');

        // Create a nodemailer transporter using Google's SMTP server
        const transporter = mailer.createTransport({
            host: "mail.gementar.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
            user: "noreply@gementar.com", // your gmail address
            pass: "noreply@gementar.com@@11++", // your gmail password
            },
        });

        // Setup email data
        var mailoption = {
            from: "noreply@gementar.com",
            to: user.email,
            subject: "GEMENTAR VERIFICATION | IPV4 Mastermind IPV4 Addressing and Subnetting",
            html: `${process.env.NEXTAUTH_URL}/resetpassword/${random}`
        }

        try {
            // Send mail with defined transport object
            await transporter.sendMail(mailoption);
        } catch (error) {
            return NextResponse.json(
            {
                text: "Error" + error,
            },
            {
                status: 200,
            }
            );
        }

        return NextResponse.json(
            {
              text: "Password reset, sended. Please check spam inbox",
            },  
            {
              status: 200,
            }
        );

        
    }

    return NextResponse.json(
        {
          text: "User password reset failed",
        },
        {
          status: 200,
        }
    );
}
