import { WS_ADDRESS } from "@/configs";

export function useWebSocket(handelMessage, url) {
	const ws = new WebSocket(WS_ADDRESS + `${url}`);
	const init = () => {};
	function bindEvent() {
		ws.addEventListener("open", handelOpen, false);
		ws.addEventListener("close", handelClose, false);
		ws.addEventListener("error", handelError, false);
		ws.addEventListener("message", handelMessage);
	}
	function handelOpen(e) {
		console.log("webSocket open", e);
	}
	function handelError(e) {
		console.log("webSocket error", e);
	}
	function handelClose(e) {
		console.log("webSocket close", e);
	}
	// init();
	return ws;
}
