import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        const game = await prisma.game.findUnique({
            where: { id },
            include: {
                author: {
                    select: { name: true, image: true }
                },
                tags: true,
                builds: true
            }
        })

        if (!game) {
            return NextResponse.json({ error: "Game not found" }, { status: 404 })
        }

        return NextResponse.json(game)
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
