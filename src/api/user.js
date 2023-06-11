import request from "@/utils/https";

// 登录
export function login(user) {
	return request({
		url: "/login",
		method: "post",
		data: user,
	});
}
