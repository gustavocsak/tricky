import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(request: Request, context: any) {
    const { params } = context;
    return NextResponse.json({
        id: params.pid
    })
}