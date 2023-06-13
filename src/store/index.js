import { defineStore } from "pinia";
export const mainStore = defineStore("main", {
	state: () => ({
		user: {},
		showMask: false,
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
				key: "store",
				storage: sessionStorage,
				paths: ["user"], // 修改为正确的属性名
			},
		],
	},
});
