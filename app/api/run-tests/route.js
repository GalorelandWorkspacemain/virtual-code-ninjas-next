import { NextResponse } from "next/server";

export async function GET() {
  // Temporary stub response until the external runner service is created.
  // This lets Fly.io and Next.js build without Docker.
  return NextResponse.json({
    success: true,
    message: "Docker-based runner disabled. External runner service required.",
    result: "Runner is temporarily disabled.",
  });
}


// import { spawn } from "child_process";
// import path from "path";

// export async function GET() {
//   return new Promise((resolve) => {
//     const runnerPath = path.join(process.cwd(), "runner");

//     // Build & run inside Docker
//     const cmd = spawn("docker", ["build", "-t", "vcn-runner", "."], {
//       cwd: runnerPath,
//     });

//     let output = "";

//     cmd.stdout.on("data", (data) => (output += data.toString()));
//     cmd.stderr.on("data", (data) => (output += data.toString()));

//     cmd.on("close", () => {
//       const testCmd = spawn("docker", ["run", "--rm", "vcn-runner"]);
//       let testOutput = "";

//       testCmd.stdout.on("data", (d) => (testOutput += d.toString()));
//       testCmd.stderr.on("data", (d) => (testOutput += d.toString()));

//       testCmd.on("close", () => {
//         resolve(Response.json({ result: testOutput }));
//       });
//     });
//   });
// }
