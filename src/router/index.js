import { createRouter, createWebHashHistory } from "vue-router";
import Index from "@/view/index/index.vue";

const routes = [
	{
		path: "/",
		name: "index",
		component: Index,
		children: [
			{
				path: "/",
				name: "home",
				redirect: "/chatroom/1",
			},
			{
				path: "/chatroom/:id",
				name: "chatroom",
				component: () => import("@/view/index/chatWindow.vue"),
			},
		],
	},
	{
		path: "/register",
		name: "register",
		component: () => import("@/view/Register/Register.vue"),
	},
	{
		path: "/login",
		name: "login",
		component: () => import("@/view/Login/Login.vue"),
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});
export default router;
