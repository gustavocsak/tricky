import { NextResponse } from "next/server";
import prisma from "../db";
import { revalidateTag } from "next/cache";

export async function POST(request: Request) {

    const body = await request.json();

    try {
        const newTicket = await prisma.ticket.create({
            data: {
                title: body.title,
                author: body.author,
                description: body.description,
                status: body.status,
                project: {
                    connect: { id: body.projectId }
                }
            }
        })

        return Response.json(newTicket)
    } catch(e) {
        return Response.json(
            { error: e },
            { status: 500 }
        )
    }
}

export async function GET(request: Request, context: any) {
    const { searchParams } = context;
    try {
        const tickets = await prisma.ticket.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                project: true
            }
        });
        return Response.json(tickets);
    } catch (e) {
        return Response.json(
            { error: e },
            { status: 500 }
        )
    }
}