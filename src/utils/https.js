// axios 基础封装
import axios from "axios";
import { HTTP_ADDRESS } from "@/configs/index";
// 创建axios实例
const httpInstance = axios.create({
	baseURL: HTTP_ADDRESS,
	timeout: 5000,
});

// axios请求拦截器
httpInstance.interceptors.request.use(
	(config) => {
		if (localStorage.token)
			config.headers.Authorization = localStorage.token;
		return config;
	},
	(e) => Promise.reject(e)
);

// axios响应式拦截器
httpInstance.interceptors.response.use(
	(res) => res.data,
	(e) => {
		return Promise.reject(e);
	}
);

export default httpInstance;
