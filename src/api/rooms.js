import request from "@/utils/https";

const BASE_URL = "/chatRoom";
// 获取所有聊天室
export function Rooms() {
	return request({
		url: `${BASE_URL}/rooms`,
	});
}
// 获取所有聊天室
export function newRooms(room) {
	return request({
		url: `${BASE_URL}/newRoom`,
		method: "post",
		data: room,
	});
}
