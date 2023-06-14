import { userInfo } from "@/api/user";
import { mainStore } from "@/store/index";
import { useRouter } from "vue-router";
const store = mainStore();
const router = useRouter();
// 获取用户信息
export const getUserInfo = async () => {
	const res = await userInfo();
	store.user = res.data;
};

export function getFormatData() {
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	let month = currentDate.getMonth() + 1;
	let day = currentDate.getDate();
	month = month < 10 ? "0" + month : month;
	day = day < 10 ? "0" + day : day;
	return `${year}-${month}-${day}`;
}
export function getFormatDataTime() {
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	let month = currentDate.getMonth() + 1;
	let day = currentDate.getDate();
	let hour = currentDate.getHours();
	let minute = currentDate.getMinutes();
	month = month < 10 ? "0" + month : month;
	day = day < 10 ? "0" + day : day;
	hour = hour < 10 ? "0" + hour : hour;
	minute = minute < 10 ? "0" + minute : minute;
	return `${year}-${month}-${day} ${hour}:${minute}`;
}
export function getFormatDataTimeSecond() {
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	let month = currentDate.getMonth() + 1;
	let day = currentDate.getDate();
	let hour = currentDate.getHours();
	let minute = currentDate.getMinutes();
	let second = currentDate.getSeconds();
	month = month < 10 ? "0" + month : month;
	day = day < 10 ? "0" + day : day;
	hour = hour < 10 ? "0" + hour : hour;
	minute = minute < 10 ? "0" + minute : minute;
	second = second < 10 ? "0" + second : second;
	return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
