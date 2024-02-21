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

}