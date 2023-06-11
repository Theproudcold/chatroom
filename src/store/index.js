import { defineStore } from "pinia";
export const mainStore = defineStore("main", {
	state: () => ({
		token: "",
	}),
	getters: {},
	actions: {
		addCount() {},
	},
	// 数据持久化
	persist: {
		enabled: true,
		strategies: [
			{
				key: "token",
				storage: sessionStorage,
				paths: ["token"], // 修改为正确的属性名
			},
		],
	},
});
