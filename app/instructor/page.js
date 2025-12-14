// app/instructor/page.js
export const dynamic = 'force-dynamic';

import { requireUserWithRole } from "@/lib/auth";
import InstructorDashboard from "@/components/InstructorDashboard";

export default async function InstructorPage() {
  try {
    const user = await requireUserWithRole("instructor");
    return <InstructorDashboard user={user} />;
  } catch (err) {
    return <div style={{padding: 24}}>Access denied: {err.message}</div>;
  }
}