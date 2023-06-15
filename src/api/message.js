import request from "@/utils/https";

const BASE_URL = "/chatMessage";
// 获取聊天室信息列表
export function messageList(pageSize, roomId) {
	return request({
		url: `${BASE_URL}/messageList`,
		params: {
			pageSize: pageSize,
			roomId: roomId,
		},
	});
}
