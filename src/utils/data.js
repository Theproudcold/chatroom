import { userInfo } from "@/api/user";
import { mainStore } from "@/store/index";
const store = mainStore();
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
	let month = currentDate.getMonth() + 1;
	let day = currentDate.getDate();
	let hour = currentDate.getHours();
	let minute = currentDate.getMinutes();
	month = month < 10 ? "0" + month : month;
	day = day < 10 ? "0" + day : day;
	hour = hour < 10 ? "0" + hour : hour;
	minute = minute < 10 ? "0" + minute : minute;
	return `${month}-${day} ${hour}:${minute}`;
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
// 时间戳转换
export function getMyDate(str) {
	const date = new Date(str);
	const month =
		date.getMonth() + 1 < 10
			? "0" + (date.getMonth() + 1)
			: date.getMonth() + 1;
	const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
	const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
	const minute =
		date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	return `${month}-${day} ${hour}:${minute}`;
}
//补0操作  小于10的就在数字前面加0，这应该很好理解吧

function getzf(c_num) {
	if (parseInt(c_num) < 10) {
		c_num = "0" + c_num;
	}
	return c_num;
}
