// app/dashboard/page.js
"use client";
import { useState, useRef } from "react";
import MonacoEditor from "@/components/Editor/MonacoEditor";

export default function Dashboard() {
  const [testOutput, setTestOutput] = useState("");
  const editorRef = useRef(null);
  
  const saveCode = async () => {
    if (!editorRef.current) return;
    
    const code = editorRef.current.getValue();
    
    await fetch("/api/save-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        code, 
        filePath: "madlib.js" 
      }),
    });
  };
  
  const runTests = async () => {
    // Save code first
    await saveCode();
    
    // Then run tests
    const res = await fetch("/api/run-tests");
    const data = await res.json();
    setTestOutput(data.result);
  };
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1>
      <MonacoEditor
        initialCode={`function greet() { 
  return "hello" 
}

function makeStory(words) {
  const { name = 'Someone', color = 'colorful', animal = 'creature' } = words;
  return \`Once upon a time, \${name} found a \${color} \${animal}.\`;
}

module.exports = { greet, makeStory };`}
        filePath="madlib.js"
        onMount={(editor) => (editorRef.current = editor)}
      />
      <div className="mt-4 space-x-2">
        <button
          onClick={saveCode}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save Code
        </button>
        <button
          onClick={runTests}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Run Tests
        </button>
      </div>
      <pre className="mt-4 bg-black text-green-400 p-4 rounded">
        {testOutput}
      </pre>
    </div>
  );
}
