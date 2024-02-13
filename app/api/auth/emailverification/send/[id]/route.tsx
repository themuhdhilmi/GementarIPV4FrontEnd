import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }) {

  const user = await prisma.user.findUnique({
    where : {
      email : params.id
    }
  })

  if(!user)
  {
    return NextResponse.json(
      {
        text: "User not found" + params.id,
      },
      {
        status: 200,
      }
    );
  }

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
    html: `${process.env.NEXTAUTH_URL}/verification/${user.id}`
  }

  try {
    // Send mail with defined transport object
    await transporter.sendMail(mailoption);
    return NextResponse.json(
      {
        text: "Successfully Sended, please check your spam inbox",
      },
      {
        status: 200,
      }
    );
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
}
