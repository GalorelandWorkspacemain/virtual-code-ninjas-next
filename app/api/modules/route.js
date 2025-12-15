// app/api/modules/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// GET all modules (or by courseId)
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId');
    
    const modules = await prisma.module.findMany({
      where: courseId ? { courseId: parseInt(courseId) } : {},
      orderBy: { id: 'asc' }
    });
    
    return NextResponse.json(modules);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// CREATE a new module (instructor only)
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

    const { title, content, courseId } = await req.json();
    
    const module = await prisma.module.create({
      data: {
        title,
        content,
        courseId: parseInt(courseId)
      }
    });

    return NextResponse.json(module);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// export async function GET() {
//   const modules = await prisma.module.findMany();
//   return NextResponse.json(modules);
// }

// export async function POST(req) {
//   const body = await req.json();
//   const m = await prisma.module.create({ data: { title: body.title, content: body.content || "" }});
//   return NextResponse.json(m);
// }
