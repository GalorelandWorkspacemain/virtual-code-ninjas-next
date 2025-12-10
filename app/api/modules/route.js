import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const modules = await prisma.module.findMany();
  return NextResponse.json(modules);
}

export async function POST(req) {
  const body = await req.json();
  const m = await prisma.module.create({ data: { title: body.title, content: body.content || "" }});
  return NextResponse.json(m);
}
