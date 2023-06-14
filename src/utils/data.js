import { userInfo } from "@/api/user";
import { mainStore } from "@/store/index";
const store = mainStore();

// 获取用户信息
export const getUserInfo = async () => {
	const res = await userInfo();
	store.user = res.data;
	console.log(store.user);
};
