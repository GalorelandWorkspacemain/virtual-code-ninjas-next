// app/instructor/page.js
import { requireUserWithRole } from "@/lib/auth";

export default async function InstructorPage() {
  try {
    const user = await requireUserWithRole("instructor");
    // fetch courses, modules, students via API or Prisma
    return (
      <main style={{padding: 24}}>
        <h1>Instructor Dashboard</h1>
        <p>Welcome, {user.name}</p>
        <div id="instructor-tools">
          {/* show UI to create modules, view student progress, grade capstones */}
        </div>
      </main>
    );
  } catch (err) {
    return <div style={{padding: 24}}>Access denied: {err.message}</div>
  }
}
