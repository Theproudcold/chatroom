import { createRouter, createWebHashHistory } from "vue-router";
import MesgIndex from "../views/mesgIndex.vue";

const routes = [
	{
		path: "/",
		name: "index",
		redirect: "/wall",
		children: [
			{
				path: "/wall",
				name: "index",
				component: MesgIndex,
			},
		],
	},

	{
		path: "/register",
		name: "register",
		component: () => import("@/views/register.vue"),
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});
export default router;
