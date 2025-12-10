"use client";

import dynamic from "next/dynamic";
import useWebSocket from "../hooks/useWebSocket";
import { useState } from "react";

// Load Monaco in the browser only
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export default function Dojo() {
  const [code, setCode] = useState("");

  const { send } = useWebSocket((msg) => {
    if (msg.type === "update") setCode(msg.code);
  });

  function handleChange(value) {
    setCode(value);
    send({ type: "update", code: value });
  }

  return (
    <div className="p-6">
      <h1>Real-Time Coding Dojo</h1>
      <MonacoEditor
        height="80vh"
        language="javascript"
        theme="vs-dark"
        value={code}
        onChange={handleChange}
      />
    </div>
  );
}
