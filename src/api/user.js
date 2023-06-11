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
		url: "/chatUser/login",
		method: "post",
		data: user,
	});
}
