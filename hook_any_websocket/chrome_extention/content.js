
const script = document.createElement('script');
script.src = chrome.runtime.getURL('inject.js');  // 使用 Chrome 扩展的 API 获取文件的 URL
(document.head || document.documentElement).appendChild(script);
script.onload = function() {
  this.remove();  // 清除脚本标签
};

// 监听网页的消息
window.addEventListener('message', function(event) {
    // 确保消息来自当前页面，而不是其他来源的窗口
    if (event.source !== window) return;

    // 过滤特定的消息类型，避免处理非必要的消息
    if (event.data.type && event.data.type === 'RECEIVED_WEBSOCKET_MESSAGE') {
        // 转发消息到 background.js
        chrome.runtime.sendMessage({ type: 'RECEIVED_WEBSOCKET_MESSAGE', data: event.data.data });
    }
});
