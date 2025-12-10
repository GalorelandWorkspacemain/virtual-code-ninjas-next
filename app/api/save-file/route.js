import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  const { filePath, code } = await req.json();

  const abs = path.join(process.cwd(), "runner/student-templates", filePath);

  await writeFile(abs, code, "utf8");

  return Response.json({ success: true });
}
