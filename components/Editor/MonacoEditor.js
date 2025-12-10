"use client";

import Editor from "@monaco-editor/react";
import { useState } from "react";

export default function MonacoEditor({ initialCode, filePath }) {
  const [code, setCode] = useState(initialCode);

  const saveFile = async () => {
    await fetch("/api/save-file", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filePath, code }),
    });
    alert("File saved!");
  };

  return (
    <div className="flex flex-col gap-2">
      <Editor
        height="500px"
        defaultLanguage="javascript"
        value={code}
        onChange={(value) => setCode(value)}
      />
      <button
        onClick={saveFile}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Save Code
      </button>
    </div>
  );
}
