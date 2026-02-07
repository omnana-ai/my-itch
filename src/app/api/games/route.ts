import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// POST: 创建新游戏
export async function POST(req: Request) {
    const session = await auth()

    // 1. 鉴权
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const body = await req.json()
        const { title, description, price, coverUrl } = body

        // 2. 检查用户是否真的存在于当前数据库中 (防止旧 Session 导致的 FK 错误)
        const userExists = await prisma.user.findUnique({
            where: { id: session.user.id }
        })

        if (!userExists) {
            return NextResponse.json({ error: "Session invalid. Please sign out and sign in again." }, { status: 401 })
        }

        // 3. 数据校验
        if (!title || !description) {
            return NextResponse.json({ error: "Title and description are required" }, { status: 400 })
        }

        // 4. 创建游戏记录
        const game = await prisma.game.create({
            data: {
                title,
                description,
                price: parseFloat(price) || 0,
                coverUrl: coverUrl || null,
                authorId: session.user.id,
                // 如果有标签，可以进行关联操作，这里暂时简化
                published: true, // 默认直接发布
            }
        })

        return NextResponse.json(game, { status: 201 })
    } catch (error) {
        console.error("Failed to create game:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

// GET: 获取游戏列表 (替换之前的 Mock 数据)
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const authorId = searchParams.get("authorId")

    try {
        const games = await prisma.game.findMany({
            where: authorId ? { authorId } : {},
            include: {
                author: {
                    select: { name: true }
                },
                tags: true
            },
            orderBy: { createdAt: 'desc' }
        })
        return NextResponse.json(games)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch games" }, { status: 500 })
    }
}
