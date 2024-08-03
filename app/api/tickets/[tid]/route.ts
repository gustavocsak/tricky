import { revalidateTag } from "next/cache";
import prisma from "../../db";

export async function GET(request: Request, context: any) {
    const { params } = context;
    const ticket = prisma.ticket.findUnique({
        where: {
            id: params.tid
        }
    })
    return Response.json(ticket)
}

export async function PATCH(request: Request, context: any) {
    const { params } = context;
    const body = await request.json();
    console.log(params);

    const updatedTicket = await prisma.ticket.update({
        where: {
            id: params.tid
        },
        data: {
            ...body
        }
    })

    return Response.json(updatedTicket);
}


export async function DELETE(request: Request, context: any) {
    const { params } = context;
    console.log(params.tid)

    const ticketDeleted = await prisma.ticket.delete({
        where: {
            id: params.tid
        }
    })
    revalidateTag('get-projects')

    return Response.json(ticketDeleted)
}