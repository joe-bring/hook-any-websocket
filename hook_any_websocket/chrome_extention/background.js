let externalSocket;

// 建立外部 WebSocket 连接
function connectToExternalWebSocket() {
  externalSocket = new WebSocket('ws://127.0.0.1:8080');

  externalSocket.onopen = () => {
    console.log('Connected to external WebSocket server.');
  };

  externalSocket.onmessage = (event) => {
    console.log('Received from external server:', event.data);
    // 如果需要，可以将外部 WebSocket 消息发送回 content.js 或其他页面
  };

  externalSocket.onerror = (error) => {
    console.error('External WebSocket error:', error);
  };

  externalSocket.onclose = () => {
    console.log('External WebSocket connection closed. Reconnecting...');
    setTimeout(connectToExternalWebSocket, 5000); // 自动重连
  };
}

// 初次连接
connectToExternalWebSocket();

// 监听来自 content.js 的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'RECEIVED_WEBSOCKET_MESSAGE') {
    console.log(`Forwarding ${message.type} data to external WebSocket:`, message.data);

    if (externalSocket && externalSocket.readyState === WebSocket.OPEN) {
      externalSocket.send(message.data); // 转发数据到外部 WebSocket
    }
  }
});
