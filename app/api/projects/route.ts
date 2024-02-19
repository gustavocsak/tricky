import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function GET() {
    const allProjects = await prisma.project.findMany()
    return Response.json(allProjects)
}