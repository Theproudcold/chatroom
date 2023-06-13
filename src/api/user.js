import request from "@/utils/https";

// 登录
export function login(user) {
	return request({
		url: "/chatUser/login",
		method: "post",
		data: user,
	});
}
// 注册
export function register(user) {
	return request({
		url: "/chatUser/register",
		method: "post",
		data: user,
	});
}
// 修改用户信息
export function updataUserInfo(userInfo) {
	return request({
		url: "/chatUser/updateUserInfo",
		method: "post",
		data: userInfo,
	});
}
// 获取当前用户信息
export function userInfo() {
	return request({
		url: "/chatUser/userInfo",
	});
}
// 获取当前在线用户人数
export function onlineUsers() {
	return request({
		url: "/chatUser/onlineUsers",
	});
}
