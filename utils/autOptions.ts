import prisma  from '@/lib/prisma'
import { authUtils } from '@/utils/auth'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'hello@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user || user === null) {
          return null
        }

        const isPasswordValid = await authUtils.comparePassword(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          randomKey: 'Hey cool'
        }
      }
    })
  ],
  callbacks: {
    session({ session, token } : any ) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.randomKey = token.randomKey as string
      }
      return session
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.randomKey = (user as any).randomKey
      }
      return token
    }
  }
}

