import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const { code, filePath } = await request.json();
    
    const fullPath = path.join(
      process.cwd(), 
      'runner/student-templates', 
      filePath
    );
    
    await writeFile(fullPath, code, 'utf-8');
    
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}