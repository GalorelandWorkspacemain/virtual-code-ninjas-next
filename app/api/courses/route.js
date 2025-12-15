// app/api/courses/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// GET all courses
export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: {
        modules: {
          orderBy: { id: 'asc' }
        }
      }
    });
    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// CREATE a new course (instructor only)
export async function POST(req) {
  try {
    const authResult = await auth();
    const userId = authResult?.userId;
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (user?.role !== 'instructor') {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { title } = await req.json();
    
    const course = await prisma.course.create({
      data: { title }
    });

    return NextResponse.json(course);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}