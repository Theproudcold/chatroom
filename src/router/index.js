import { createRouter, createWebHashHistory } from "vue-router";
import Index from "@/view/index/index.vue";
const routes = [
	{
		path: "/",
		redirect: "/login",
	},
	{
		path: "/chat",
		name: "index",
		component: Index,
		redirect: "/chat/chatroom/1", // 添加重定向
		children: [
			{
				path: "chatroom/:id",
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
router.beforeEach((to, from, next) => {
	if (to.path === "/login" || localStorage.token || to.path === "/register") {
		next();
	} else {
		next("/login");
	}
});
export default router;
