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
        revalidateTag('get-projects')
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
    console.log(searchParams)
}   