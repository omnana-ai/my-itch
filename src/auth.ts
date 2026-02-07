import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import Credentials from "next-auth/providers/credentials"

export const { handlers, auth, signIn, signOut } = NextAuth({
    secret: "my-super-secret-key-for-development",
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                username: { label: "Username", type: "text" },
                isRegister: { label: "Is Register", type: "text" }
            },
            authorize: async (credentials) => {
                if (!credentials.email || !credentials.password) {
                    return null
                }

                const isRegister = credentials.isRegister === 'true'

                let user = await prisma.user.findUnique({
                    where: { email: credentials.email as string }
                })

                if (isRegister) {
                    // 注册模式：账号已存在则抛出错误
                    if (user) {
                        throw new Error('EMAIL_EXISTS')
                    }
                    const username = (credentials.username as string) || (credentials.email as string).split('@')[0]
                    user = await prisma.user.create({
                        data: {
                            email: credentials.email as string,
                            name: username,
                            password: credentials.password as string, // WARNING: Hash this in prod!
                        }
                    })
                    return user
                } else {
                    // 登录模式：账号不存在或密码错误
                    if (!user) {
                        throw new Error('USER_NOT_FOUND')
                    }
                    if (user.password !== credentials.password) {
                        throw new Error('INVALID_PASSWORD')
                    }
                    return user
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.name = user.name
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.sub as string
                session.user.name = token.name as string
            }
            return session
        },
    },
})
