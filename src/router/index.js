import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "@/view/Home/index.vue";
import LoginView from "@/view/Login/Login.vue";
const routes = [
	{
		path: "/",
		redirect: "/login",
	},
	{
		path: "/chat",
		name: "index",
		component: HomeView,
		redirect: "/chat/room/1", // 添加重定向
		children: [
			{
				path: "room/:id",
				name: "room",
				component: () =>
					import("@/view/Home/components/ChatBox/index.vue"),
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
		component: LoginView,
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
