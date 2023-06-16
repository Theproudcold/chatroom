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

/**
 * 对Date的扩展，将 Date 转化为指定格式的String。
 *
 *  月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *  年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)。
 *
 *  【示例】：
 *  common.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
 *  common.formatDate(new Date(), 'yyyy-M-d h:m:s.S')      ==> 2006-7-2 8:9:4.18
 *  common.formatDate(new Date(), 'hh:mm:ss.S')            ==> 08:09:04.423
 */
let _formatDate = function (date, fmt) {
	let o = {
		"M+": date.getMonth() + 1, //月份
		"d+": date.getDate(), //日
		"h+": date.getHours(), //小时
		"m+": date.getMinutes(), //分
		"s+": date.getSeconds(), //秒
		"q+": Math.floor((date.getMonth() + 3) / 3), //季度
		S: date.getMilliseconds(), //毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(
			RegExp.$1,
			(date.getFullYear() + "").substr(4 - RegExp.$1.length)
		);
	for (let k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(
				RegExp.$1,
				RegExp.$1.length == 1
					? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length)
			);
	return fmt;
};

// 实现完美显示
export function getTimeStringAutoShort(timestamp, mustIncludeTime) {
	// 当前时间
	let currentDate = new Date();
	// 目标判断时间
	let srcDate = new Date(timestamp);
	// console.log(srcDate)

	let currentYear = currentDate.getFullYear();
	let currentMonth = currentDate.getMonth() + 1;
	let currentDateD = currentDate.getDate();

	let srcYear = srcDate.getFullYear();
	let srcMonth = srcDate.getMonth() + 1;
	let srcDateD = srcDate.getDate();

	let ret = "";

	// 要额外显示的时间分钟
	let timeExtraStr = mustIncludeTime
		? " " + _formatDate(srcDate, "hh:mm")
		: "";

	// 当年
	if (currentYear == srcYear) {
		let currentTimestamp = currentDate.getTime();
		let srcTimestamp = timestamp;
		// 相差时间（单位：毫秒）
		let deltaTime = currentTimestamp - srcTimestamp;

		// 当天（月份和日期一致才是）
		if (currentMonth == srcMonth && currentDateD == srcDateD) {
			// 时间相差60秒以内
			if (deltaTime < 60 * 1000) ret = "刚刚";
			// 否则当天其它时间段的，直接显示“时:分”的形式
			else ret = _formatDate(srcDate, "hh:mm");
		}
		// 当年 && 当天之外的时间（即昨天及以前的时间）
		else {
			// 昨天（以“现在”的时候为基准-1天）
			let yesterdayDate = new Date();
			yesterdayDate.setDate(yesterdayDate.getDate() - 1);

			// 前天（以“现在”的时候为基准-2天）
			let beforeYesterdayDate = new Date();
			beforeYesterdayDate.setDate(beforeYesterdayDate.getDate() - 2);

			// 用目标日期的“月”和“天”跟上方计算出来的“昨天”进行比较，是最为准确的（如果用时间戳差值
			// 的形式，是不准确的，比如：现在时刻是2019年02月22日1:00、而srcDate是2019年02月21日23:00，
			// 这两者间只相差2小时，直接用“deltaTime/(3600 * 1000)” > 24小时来判断是否昨天，就完全是扯蛋的逻辑了）
			if (
				srcMonth == yesterdayDate.getMonth() + 1 &&
				srcDateD == yesterdayDate.getDate()
			)
				ret = "昨天" + timeExtraStr; // -1d
			// “前天”判断逻辑同上
			else if (
				srcMonth == beforeYesterdayDate.getMonth() + 1 &&
				srcDateD == beforeYesterdayDate.getDate()
			)
				ret = "前天" + timeExtraStr; // -2d
			else {
				// 跟当前时间相差的小时数
				let deltaHour = deltaTime / (3600 * 1000);

				// 如果小于或等 7*24小时就显示星期几
				if (deltaHour <= 7 * 24) {
					let weekday = new Array(7);
					weekday[0] = "星期日";
					weekday[1] = "星期一";
					weekday[2] = "星期二";
					weekday[3] = "星期三";
					weekday[4] = "星期四";
					weekday[5] = "星期五";
					weekday[6] = "星期六";

					// 取出当前是星期几
					let weedayDesc = weekday[srcDate.getDay()];
					ret = weedayDesc + timeExtraStr;
				}
				// 否则直接显示完整日期时间
				else ret = _formatDate(srcDate, "yyyy/M/d") + timeExtraStr;
			}
		}
	}
	// 往年
	else {
		ret = _formatDate(srcDate, "yyyy/M/d") + timeExtraStr;
	}

	return ret;
}
