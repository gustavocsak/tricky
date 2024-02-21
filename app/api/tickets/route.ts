import prisma from "../db";

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