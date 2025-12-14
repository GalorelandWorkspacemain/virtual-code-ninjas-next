// app/dashboard/page.js
"use client";
import { useState, useRef, useEffect } from "react";
import MonacoEditor from "@/components/Editor/MonacoEditor";

export default function Dashboard() {
  const [testOutput, setTestOutput] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const editorRef = useRef(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const res = await fetch("/api/courses");
    const data = await res.json();
    setCourses(data);
  };

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
    await saveCode();
    
    const res = await fetch("/api/run-tests");
    const data = await res.json();
    setTestOutput(data.result);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar - Course Navigation */}
      <aside className="w-64 bg-gray-100 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Courses</h2>
        {courses.map((course) => (
          <div key={course.id} className="mb-4">
            <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
            <ul className="space-y-1">
              {course.modules?.map((module) => (
                <li
                  key={module.id}
                  onClick={() => setSelectedModule(module)}
                  className={`p-2 rounded cursor-pointer hover:bg-blue-100 ${
                    selectedModule?.id === module.id ? 'bg-blue-200' : ''
                  }`}
                >
                  {module.title}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1>

        {selectedModule ? (
          <>
            <h2 className="text-2xl font-semibold mb-2">{selectedModule.title}</h2>
            <div className="mb-4 p-4 bg-gray-50 rounded">
              <p className="whitespace-pre-wrap">{selectedModule.content}</p>
            </div>

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
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save Code
              </button>
              <button
                onClick={runTests}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Run Tests
              </button>
            </div>

            <pre className="mt-4 bg-black text-green-400 p-4 rounded overflow-x-auto">
              {testOutput}
            </pre>
          </>
        ) : (
          <p className="text-gray-600">Select a module from the sidebar to begin</p>
        )}
      </main>
    </div>
  );
}