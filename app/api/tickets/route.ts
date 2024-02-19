import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(request: Request, context: any) {
    const { params } = context;
    return NextResponse.json({
        id: params.tid
    })
}

export async function PATCH(request: Request, context: any) {

}

export async function POST(request: Request, context: any) {
    
}