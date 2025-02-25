(function () {
    // 保存原生的 WebSocket 构造函数
    const NativeWebSocket = window['WebSocket'];

    // 创建一个新的类，继承原生的 WebSocket
    class CustomWebSocket extends NativeWebSocket {
        constructor(...args) {
            super(...args);

            // 监听 WebSocket 的消息事件
            this.addEventListener('message', event => {
                // 将 WebSocket 接收到的消息通过 postMessage 通知给其他上下文（如 iframe）
                window.postMessage({
                    type: 'RECEIVED_WEBSOCKET_MESSAGE',
                    data: event.data
                }, '*');
            });

            // 保存原始的 send 方法
            const originalSend = this.send;

            // 重写 send 方法，如果需要，可以在这里修改消息的内容
            this.send = function (data) {
                return originalSend.call(this, data);
            };
        }
    }

    // 设置新的 WebSocket 类的原型和静态属性
    Object.setPrototypeOf(CustomWebSocket, NativeWebSocket);

    Object.defineProperty(CustomWebSocket, 'toString', {
        value: () => 'function WebSocket() { [native code] }'
    });

    Object.defineProperty(CustomWebSocket.prototype, Symbol.toStringTag, {
        value: 'WebSocket'
    });

    // 将新的 WebSocket 替换为原生的 WebSocket
    Object.defineProperty(window, 'WebSocket', {
        value: CustomWebSocket,
        writable: false,
        configurable: false,
        enumerable: false
    });
})();
