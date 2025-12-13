// lib/auth.js
import { auth } from "@clerk/nextjs/server";
import prisma from "./prisma";

export async function requireUserWithRole(role) {
  const authResult = await auth();
  console.log("Auth result:", authResult); // Debug log
  const userId = authResult?.userId;
  console.log("Checking userId:", userId); // This is your error message
  
  if (!userId) {
    throw new Error("Unauthorized - No user ID");
  }
  
  const user = await prisma.user.findUnique({ 
    where: { clerkId: userId } 
  });
  
  if (!user) {
    throw new Error("User not found in database");
  }
  
  if (user.role !== role) {
    throw new Error(`Forbidden - requires ${role} role`);
  }
  
  return user;
}