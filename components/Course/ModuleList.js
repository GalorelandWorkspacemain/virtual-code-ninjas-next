"use client";
import { useEffect, useState } from "react";

export default function ModuleList(){
  const [modules, setModules] = useState([]);
  useEffect(()=>{ fetch('/api/modules').then(r=>r.json()).then(setModules) }, []);
  async function markDone(id){
    await fetch('/api/progress', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({moduleId:id, completed:true}) });
    // refresh or optimistically update
  }
  return (
    <div>
      {modules.map(m => (
        <div key={m.id} style={{border:'1px solid #eee', padding: 12, marginBottom:8}}>
          <h3>{m.title}</h3>
          <button onClick={()=>markDone(m.id)}>Mark Complete</button>
        </div>
      ))}
    </div>
  );
}
