import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function GET() {
    const allTickets = await prisma.ticket.findMany()
    return Response.json(allTickets)
}