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

export async function DELETE(request: Request, context: any) {
    const { params } = context;
    console.log(params)

    const deleteTickets = await prisma.ticket.deleteMany({
        where: {
          projectId: params.pid,
        },
    })

    const deleteProject = await prisma.project.delete({
        where: {
            id: params.pid
        }
    })

    return Response.json(deleteProject)
}