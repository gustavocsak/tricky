import prisma from "../db";

export async function GET() {
  const allProjects = await prisma.project.findMany({
    include: {
      tickets: true,
    },
  });
  return Response.json(allProjects);
}

export async function POST(request: Request, context: any) {
  const body = await request.json();

  console.log(body);

  const project = await prisma.project.create({
    data: {
      ...body,
    },
    include: {
      tickets: true,
    },
  });

  return Response.json(project);
}
