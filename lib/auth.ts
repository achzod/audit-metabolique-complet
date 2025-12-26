import NextAuth from "next-auth"
import Email from "next-auth/providers/nodemailer"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"
import { sendMagicLink } from "./email"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    // Magic Link Login UNIQUEMENT
    Email({
      server: {
        host: 'smtp-pulse.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.SENDPULSE_SMTP_USER,
          pass: process.env.SENDPULSE_SMTP_PASS,
        },
      },
      from: `AchZod Coaching <${process.env.SENDPULSE_FROM_EMAIL || 'coaching@achzodcoaching.com'}>`,
      async sendVerificationRequest({ identifier: email, url }) {
        // Extraire le token de l'URL
        const urlObj = new URL(url);
        const token = urlObj.searchParams.get('token') || '';

        // Envoyer notre email personnalisé
        await sendMagicLink({ email, token });
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    verifyRequest: "/auth/verify-request",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
})
