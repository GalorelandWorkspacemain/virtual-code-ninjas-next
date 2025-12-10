// app/hooks/useWebSocket.js
import { useEffect, useRef } from "react";

export default function useWebSocket(onMessage) {
  const wsRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL);
    wsRef.current = ws;

    ws.onopen = () => console.log("WS Connected");
    ws.onclose = () => console.log("WS Disconnected");
    ws.onerror = (e) => console.error("WS Error", e);

    ws.onmessage = (event) => {
      onMessage(JSON.parse(event.data));
    };

    return () => ws.close();
  }, []);

  function send(msg) {
    wsRef.current?.send(JSON.stringify(msg));
  }

  return { send };
}
