"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import MonacoEditor from "@/components/Editor/MonacoEditor";

export default function Dashboard() {
  const router = useRouter();

  const [testOutput, setTestOutput] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState("");
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
      body: JSON.stringify({ code, filePath: "madlib.js" }),
    });
  };

  const runTests = async () => {
    await saveCode();
    const res = await fetch("/api/run-tests");
    const data = await res.json();
    setTestOutput(data.result);
  };

  const askAiTutor = async () => {
    if (!aiQuestion) return;

    setAiResponse("Thinking...");
    const res = await fetch("/api/ai-tutor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: aiQuestion }),
    });
    const data = await res.json();
    setAiResponse(data.answer || "No response yet.");
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-100 to-indigo-100">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-xl border-r p-5 overflow-y-auto">
        <h2 className="text-2xl font-extrabold text-indigo-900 mb-6">📚 Courses</h2>

        {courses.map((course) => (
          <div key={course.id} className="mb-6">
            <h3 className="font-semibold text-indigo-700 mb-3">
              {course.title}
            </h3>
            <ul className="space-y-2">
              {course.modules?.map((module) => (
                <li
                  key={module.id}
                  onClick={() => setSelectedModule(module)}
                  className={`px-4 py-3 rounded-xl cursor-pointer transition-all
                    ${
                      selectedModule?.id === module.id
                        ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white"
                        : "bg-gray-50 hover:bg-indigo-50"
                    }`}
                >
                  {module.title}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-extrabold text-indigo-900">
              🎓 Student Dashboard
            </h1>

            <button
              onClick={() => router.back()}
              className="px-5 py-3 rounded-xl bg-white border border-gray-300 shadow hover:bg-gray-100 transition"
            >
              🔙 Back
            </button>
          </div>

          {/* Progress */}
          {selectedModule && (
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-600 mb-1">
                📊 Module Progress
              </p>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full w-1/2"></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">50% completed</p>
            </div>
          )}

          {selectedModule ? (
            <>
              <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold mb-2">
                  {selectedModule.title}
                </h2>
                <p className="text-gray-600 whitespace-pre-wrap">
                  {selectedModule.content}
                </p>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-xl mb-6">
                <MonacoEditor
                  initialCode={`function greet() { return "hello"; }`}
                  filePath="madlib.js"
                  onMount={(editor) => (editorRef.current = editor)}
                />
              </div>

              <div className="flex gap-4 mb-6">
                <button
                  onClick={saveCode}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold shadow hover:shadow-lg"
                >
                  💾 Save Code
                </button>
                <button
                  onClick={runTests}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold shadow hover:shadow-lg"
                >
                  ▶️ Run Tests
                </button>
              </div>

              <pre className="bg-black text-green-400 p-5 rounded-xl mb-8">
                {testOutput || "// Test output will appear here"}
              </pre>
            </>
          ) : (
            <p className="text-gray-500">
              Select a module to begin learning.
            </p>
          )}
        </div>
      </main>

      {/* AI Tutor */}
      <aside className="w-96 bg-white border-l shadow-xl p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-indigo-900 mb-4">
          🧠 AI Tutor
        </h2>

        <textarea
          value={aiQuestion}
          onChange={(e) => setAiQuestion(e.target.value)}
          placeholder="Ask a coding question..."
          className="w-full p-3 border rounded-lg mb-3 resize-none h-24"
        />

        <button
          onClick={askAiTutor}
          className="mb-4 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold"
        >
          Ask AI
        </button>

        <div className="flex-1 bg-gray-50 rounded-xl p-4 overflow-y-auto text-sm">
          {aiResponse || "AI tutor responses will appear here."}
        </div>
      </aside>
    </div>
  );
}
