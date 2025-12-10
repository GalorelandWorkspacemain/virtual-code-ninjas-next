"use client";

import { useState } from "react";
import MonacoEditor from "@/components/Editor/MonacoEditor";

export default function Dashboard() {
  const [testOutput, setTestOutput] = useState("");

  const runTests = async () => {
    const res = await fetch("/api/run-tests");
    const data = await res.json();
    setTestOutput(data.result);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1>

      <MonacoEditor
        initialCode={`function greet(){ return "hello" }`}
        filePath="madlib.js"
      />

      <button
        onClick={runTests}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Run Tests
      </button>

      <pre className="mt-4 bg-black text-green-400 p-4 rounded">
        {testOutput}
      </pre>
    </div>
  );
}
