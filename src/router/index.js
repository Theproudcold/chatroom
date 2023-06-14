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
	const token = localStorage.getItem("token"); // 获取Token
	if (token && to.path === "/login") {
		// 如果已经登录且要访问的页面是登录页或不需要登录的页面，则直接跳转到聊天页
		next("/chat");
	}
	if (to.path === "/login" || localStorage.token || to.path === "/register") {
		next();
	} else {
		next("/login");
	}
});
export default router;
