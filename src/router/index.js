import { createRouter, createWebHashHistory } from "vue-router";
import Index from "@/view/index/index.vue";
import { mainStore } from "@/store/index";
const routes = [
	{
		path: "/",
		redirect: "/login",
	},
	{
		path: "/chat",
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
router.beforeEach((to, from, next) => {
	const store = mainStore();
	if (to.path === "/login" || store.token || to.path === "/register") {
		next();
	} else {
		next("/login");
	}
});
export default router;
