import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const { email } = await request.json()

    if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({
        where: { email }
    })

    return NextResponse.json({ exists: !!existingUser })
}
