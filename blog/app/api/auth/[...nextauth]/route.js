import NextAuth from "next-auth/next"
import  CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers:[
        CredentialsProvider({
            name:'credentials',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: 'your email' },
                password: { label: 'Password', type: 'password' },
              },
              async authorize(credentials){

                //  Check to see if email and password are valid
                if(!credentials.email || !credentials.password) {
                    return null
                }

                // check to see if user exists
                const user = await prisma.utilisateur.findUnique ({
                    where : {
                        email:credentials.email
                    }
                })

                if(!user){
                    return null
                }

                // check to see if passwords match
                const passwordsMatch = await bcrypt.compare(credentials.password, user.mdp)

                if(!passwordsMatch) {
                    return null;
                }

                // return user object 
                return user;
              }
        })
    ],
    session:{
        strategy:'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
    callbacks: {
        async jwt({token, user}){
            console.log("jwt callback",{token,user})
        
            if(user){
                console.log("jwt callback user",{token,user})
                return {
                    ...token,
                    id:user.id,
                    name:user.pseudo
                }
            }
            return token;
        },
        async session({ session, token}) {
            console.log("session callback",{session,token})
            return {
                ...session,
                user:{
                    ...session.user,
                    id:token.id,
                }
            }
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }