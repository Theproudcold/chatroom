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
// 时间戳转换
export function getMyDate(str, bool) {
	if (str > 9999999999) {
		// 这里判断：时间戳为几位数
		var c_Date = new Date(parseInt(str));
	} else {
		var c_Date = new Date(parseInt(str) * 1000);
	}
	var c_Year = c_Date.getFullYear(),
		c_Month = c_Date.getMonth() + 1,
		c_Day = c_Date.getDate(),
		c_Hour = c_Date.getHours(),
		c_Min = c_Date.getMinutes(),
		c_Sen = c_Date.getSeconds();
	if (bool) {
		// 判断是否需要显示秒
		var c_Time =
			c_Year +
			"-" +
			getzf(c_Month) +
			"-" +
			getzf(c_Day) +
			" " +
			getzf(c_Hour) +
			":" +
			getzf(c_Min) +
			":" +
			getzf(c_Sen); //最后拼接时间
	} else {
		var c_Time =
			c_Year +
			"-" +
			getzf(c_Month) +
			"-" +
			getzf(c_Day) +
			" " +
			getzf(c_Hour) +
			":" +
			getzf(c_Min); //最后拼接时间
	}
	return c_Time;
}
//补0操作  小于10的就在数字前面加0，这应该很好理解吧

function getzf(c_num) {
	if (parseInt(c_num) < 10) {
		c_num = "0" + c_num;
	}
	return c_num;
}
