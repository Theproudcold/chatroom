import request from "@/utils/https";

// 获取所有聊天室
export function Rooms() {
	return request({
		url: "/chatRoom/rooms",
	});
}
// 获取所有聊天室
export function newRooms(room) {
	return request({
		url: "/chatRoom/newRoom",
		method: "post",
		data: room,
	});
}
