// components/AI/TutorClient.js (client)
"use client";
import { useState } from "react";

export default function Tutor({ failingOutput }) {
  const [advice, setAdvice] = useState("");
  async function askTutor() {
    const res = await fetch("/api/ai-tutor", {
      method: "POST",
      body: JSON.stringify({ promptContext: failingOutput }),
      headers: {"Content-Type":"application/json"}
    });
    const data = await res.json();
    setAdvice(data.advice);
  }
  return (
    <div>
      <button onClick={askTutor}>Ask AI Tutor</button>
      <pre>{advice}</pre>
    </div>
  );
}
