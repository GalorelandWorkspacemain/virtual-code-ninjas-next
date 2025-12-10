"use client";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

let socket;

export default function Dojo({ roomId }) {
  const [code, setCode] = useState("// start coding...");
  const editorRef = useRef(null);

  useEffect(()=>{
    socket = io(process.env.NEXT_PUBLIC_DOJO_SERVER || "http://localhost:4000");
    socket.emit('join-room', { roomId, username: 'student-'+Math.floor(Math.random()*1000) });

    socket.on('code-update', ({ code: newCode }) => {
      setCode(newCode);
    });

    return ()=> socket.disconnect();
  }, [roomId]);

  function onLocalChange(newCode){
    setCode(newCode);
    socket?.emit('code-change', { roomId, code: newCode });
  }

  return (
    <div>
      <textarea value={code} onChange={(e)=>onLocalChange(e.target.value)} style={{width:'100%',height:300}}/>
      <p>Realtime room: {roomId}</p>
    </div>
  );
}
