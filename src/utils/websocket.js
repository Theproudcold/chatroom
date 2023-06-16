import { WS_ADDRESS } from "@/configs";

export function useWebSocket(handelOpen, handelMessage, url) {
	const ws = new WebSocket(WS_ADDRESS + `${url}`);
	function bindEvent() {
		ws.addEventListener("open", handelOpen, false);
		ws.addEventListener("close", handelClose, false);
		ws.addEventListener("error", handelError, false);
		ws.addEventListener("message", handelMessage);
	}
	bindEvent();
	function handelError(e) {
		console.log("webSocket error", e);
	}
	// 发送心跳包
	function sendHeartbeat() {
		ws.send(
			JSON.stringify({
				type: 4,
			})
		);
	}
	let heartbeatInterval = setInterval(sendHeartbeat, 10000);
	// 监听连接关闭事件
	function handelClose(e) {
		console.log("服务器关闭");
		clearInterval(heartbeatInterval);
	}
	return ws;
}
