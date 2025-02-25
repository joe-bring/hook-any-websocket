const WebSocket = require("ws");

// 创建 WebSocket 服务
const wss = new WebSocket.Server({ port: 8080 });

console.log("WebSocket server is running on ws://localhost:8080");

// 监听连接
wss.on("connection", (ws) => {
  console.log("Client connected.");

  // 接收消息并打印
  ws.on("message", (message) => {
    console.log("Received message:", message.toString());
  });

  // 处理关闭事件
  ws.on("close", () => {
    console.log("Client disconnected.");
  });
});
