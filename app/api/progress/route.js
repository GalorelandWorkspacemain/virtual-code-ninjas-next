import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export async function POST(req) {
  const { userId } = auth(); // Clerk server auth
  if(!userId) return NextResponse.json({error: "Unauthorized"}, {status:401});
  const body = await req.json(); // { moduleId, completed }
  // find Prisma user by clerkId
  const user = await prisma.user.findUnique({ where: { clerkId: userId }});
  const record = await prisma.progress.upsert({
    where: { userId_moduleId: { userId: user.id, moduleId: body.moduleId } },
    update: { completed: body.completed },
    create: { userId: user.id, moduleId: body.moduleId, completed: body.completed }
  });
  return NextResponse.json(record);
}
