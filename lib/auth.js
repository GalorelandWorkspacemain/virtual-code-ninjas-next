// lib/auth.js
import { auth } from "@clerk/nextjs";
import prisma from "./prisma";

export async function requireUserWithRole(role) {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");
  // Example: check user role in DB (create user record on signup webhook)
  const user = await prisma.user.findUnique({ where: { clerkId: userId }});
  if(!user || user.role !== role) throw new Error("Forbidden");
  return user;
}
