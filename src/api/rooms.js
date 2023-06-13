import request from "@/utils/https";

// 获取所有聊天室
export function Rooms() {
	return request({
		url: "/chatRoom/rooms",
	});
}
