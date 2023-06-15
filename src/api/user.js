import request from "@/utils/https";

const BASE_URL = "/chatUser";
// 登录
export function login(user) {
	return request({
		url: `${BASE_URL}/login`,
		method: "post",
		data: user,
	});
}
// 注册
export function register(user) {
	return request({
		url: `${BASE_URL}/register`,
		method: "post",
		data: user,
	});
}
// 修改用户信息
export function updataUserInfo(userInfo) {
	return request({
		url: `${BASE_URL}/updateUserInfo`,
		method: "post",
		data: userInfo,
	});
}
// 获取当前用户信息
export function userInfo() {
	return request({
		url: `${BASE_URL}/userInfo`,
	});
}
// 获取当前在线用户人数
export function onlineUsers() {
	return request({
		url: `${BASE_URL}/onlineUsers`,
	});
}
