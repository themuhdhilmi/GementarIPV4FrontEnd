import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"; 
import prisma from "@/prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'

export const authOption: NextAuthOptions = {
    adapter : PrismaAdapter(prisma),
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email : { label : 'Email', type: 'email', placeholder: 'Email'},
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          
        if(!credentials?.email || !credentials?.password) return null;
        
        const user = await prisma.user.findUnique({where : { email: credentials.email}})
        
        if(!user) return null;
  
        const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword!);
  
        return passwordMatch ? user : null;
        }
      })
    ],
    session: {
      strategy: 'jwt'
    },
  };
  
  const handler = NextAuth(authOption);
  
  export { handler as GET, handler as POST };