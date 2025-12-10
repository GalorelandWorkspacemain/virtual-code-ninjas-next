import { WebSocketServer } from "ws";

const PORT = process.env.PORT || 8080;

const wss = new WebSocketServer({
  port: PORT,
  host: "0.0.0.0", // REQUIRED for Fly.io
});

console.log("WS server running on port", PORT);

wss.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("message", (data) => {
    const msg = data.toString();

    // Broadcast to all other clients
    wss.clients.forEach((client) => {
      if (client !== socket && client.readyState === 1) {
        client.send(msg);
      }
    });
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});
