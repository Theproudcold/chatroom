import { defineStore } from "pinia";
export const mainStore = defineStore("main", {
	state: () => ({
		user: {},
		showUserMask: false,
		showRoomMask: false,
		online: 0,
		onlineUser: [],
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
			{
				key: "userInfo",
				storage: localStorage,
				paths: ["user"], // 修改为正确的属性名
			},
		],
	},
});
