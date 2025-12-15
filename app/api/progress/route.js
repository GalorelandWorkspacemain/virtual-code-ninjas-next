// app/api/progress/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(req) {
  // Clerk server-side auth
  const { userId: clerkId } = auth();

  if (!clerkId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { moduleId, completed = true } = await req.json();

  if (!moduleId) {
    return NextResponse.json(
      { error: "moduleId is required" },
      { status: 400 }
    );
  }

  // Find corresponding Prisma user
  const user = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (!user) {
    return NextResponse.json(
      { error: "User not found in database" },
      { status: 404 }
    );
  }

  // Upsert progress
  const progress = await prisma.progress.upsert({
    where: {
      userId_moduleId: {
        userId: user.id,
        moduleId,
      },
    },
    update: {
      completed,
    },
    create: {
      userId: user.id,
      moduleId,
      completed,
    },
  });

  return NextResponse.json(progress);
}

