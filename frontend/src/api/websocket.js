// frontend/src/api/websocket.js

let ws = null;

export function connectWS(onMessage) {
  ws = new WebSocket("ws://localhost:4000/ws");

  ws.onopen = () => {
    console.log("WebSocket connected");
  };

  ws.onmessage = (msg) => {
    try {
      const data = JSON.parse(msg.data);
      onMessage(data);
    } catch (err) {
      console.error("WS parse error:", err);
    }
  };

  ws.onclose = () => {
    console.log("WebSocket closed");
  };
}

export function sendWS(data) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(data));
  }
}

export function closeWS() {
  if (ws) ws.close();
}
