"use client";
import { useState } from "react";

export default function ModuleEditor() {
  const [title, setTitle] = useState("");
  async function createModule(e){
    e.preventDefault();
    const res = await fetch("/api/modules", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({title}),
    });
    if(res.ok) { setTitle(""); alert("Module created"); }
  }
  return (
    <form onSubmit={createModule}>
      <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Module title" />
      <button>Create Module</button>
    </form>
  );
}
