import NextAuth, { NextAuthOptions } from "next-auth"
import type { NextApiRequest, NextApiResponse, NextPageContext } from "next"
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google"
import { PrismaAdapter } from "../adpater/prisma-adpater"

export const buildNextAuthOptions = (req: NextApiRequest | NextPageContext['req'], res: NextApiResponse | NextPageContext['res']): NextAuthOptions => {


  return {
    // Configure one
    adapter: PrismaAdapter(req,res),//chamando os adapters

    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        authorization: {
          params: {
            prompt: 'consent',
            access_type: 'offline',
            response_type: 'code',
            scope: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
          }
        },
        profile(profile: GoogleProfile) {
          return {
            id: profile.sub,
            name:profile.name,
            username: '',//ja existe pela app por isso to retornando vazio
            email:profile.email,
            avatar_url: profile.picture,
          }
        }
      }),
      // ...add more providers here
    ],
    callbacks: {
      async signIn({ account }) {
        if (!account?.scope?.includes('https://www.googleapis.com/auth/calendar')) {
          return '/register/connect-calendar?error=permissions'
          //false so que redirection
        }
        return true
      },
      async session({session,token,user}) {
        return {
          ...session,
          user,
        }
      }
    }
  }
}


export default async function auth (req: NextApiRequest, res: NextApiResponse) {

  return await NextAuth(req, res, buildNextAuthOptions(req,res))
}
