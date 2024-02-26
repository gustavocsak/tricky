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

export async function PATCH(request: Request, context: any) {
    const { params } = context;
    const body = await request.json();

    const updatedProject = await prisma.project.update({
        where: {
            id: params.pid
        },
        data: {
            ...body
        }
    })

    console.log(updatedProject)

    return Response.json(updatedProject)
}