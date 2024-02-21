import prisma from "../../db";

export async function GET(request: Request, context: any) {
    const { params } = context;
    const project = prisma.project.findUnique({
        where: {
            id: params.pid
        }
    })
    return Response.json(project)
}