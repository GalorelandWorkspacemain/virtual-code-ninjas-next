// components/Editor/MonacoEditor.js
"use client";
import Editor from "@monaco-editor/react";

export default function MonacoEditor({ initialCode, filePath, onMount }) {
  return (
    <div className="flex flex-col gap-2">
      <Editor
        height="500px"
        defaultLanguage="javascript"
        defaultValue={initialCode}
        onMount={onMount}
      />
    </div>
  );
}