<script setup>
import MsgItem from "./MsgItem/index.vue";
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { mainStore } from "@/store/index";
import { onlineUsers } from "@/api/user";
import { useWebSocket } from "@/utils/websocket";
import { messageList } from "@/api/message";
import { onBeforeRouteUpdate, useRouter } from "vue-router";
const store = mainStore();
const router = useRouter();
// 判断登录状态
const iflogin = () => {
	if (!localStorage.token) {
		router.push("/login");
	}
};
onMounted(() => iflogin());
// 路由更新时
onBeforeRouteUpdate((to, from, next) => {
	if (to.params.id !== from.params.id) {
		roomsId.value = router.currentRoute.value.params.id;
		getMsgList(1, roomsId.value);
		scrollToBottom();
	}
	next();
});
// 获取房间id
const roomsId = ref(router.currentRoute.value.params.id);
const content1 = ref(null);
// 创建 WebSocket 客户端实例
// WebSocket HTML5提供的内置对象
const { user } = JSON.parse(localStorage.getItem("userInfo"));
const ws = useWebSocket(handelOpen, handelMessage, user.id);
const newMsg = ref(0);
// 接收消息
function handelMessage(event) {
	const obj = JSON.parse(event.data);
	if (obj.type && obj.type == 1) {
		const data = obj.data;
		msgList.value.push(data);
		store.fastMsg = data;
		newMsg.value++;
		if (slowMotion.value) {
			nextTick(() => {
				scrollToBottom();
			});
		}
	} else if (obj.type == 2 || obj.type == 3) {
		getOnline();
	} else if (obj.type == 4) {
		if (obj.status == "success") return;
	} else {
		(localStorage.token = ""), (store.user = {}), router.push("/login");
	}
}
const getOnline = async (first) => {
	const { data } = await onlineUsers();
	if (data != null) {
		store.online = data.onlineNumber;
		store.onlineUser = data.onlineUsers;
	}
	// if (data == null || (data.onlineNumber == 1 && first)) {
	// 	store.online++;
	// 	store.onlineUser.push(store.user);
	// }
};
function handelOpen() {
	console.log("连接服务器成功");
	sendHeartbeat();
}
getOnline(true);
const msgList = ref([]);

const msg = ref("");
function send() {
	//发送消息
	if (msg.value == "") {
		ElMessage({
			showClose: true,
			message: "不能发送空内容",
			type: "error",
		});
		return;
	}
	const cache = {
		nickname: store.user.nickname,
		avatar: store.user.avatar,
		content: msg.value,
		userId: user.id,
		location: user.location,
		sendTime: Date.now(),
		chatRoomId: roomsId.value,
	};
	ws.send(JSON.stringify(cache));
	msgList.value.push(cache);
	store.fastMsg = cache;
	msg.value = "";
}
// loading
const loading = ref(false);
// 监听滚动事件
const toscroll = ref(0);
// 完美加载
const scroll = () => {
	if (content1.value.scrollTop === 0) {
		if (!noMsg.value) {
			loading.value = true;
			toscroll.value = content1.value.scrollHeight;
			getMsgList(pageSize.value++, roomsId.value).then(() => {
				loading.value = false;
				nextTick(() => {
					content1.value.style.scrollBehavior = "";
					content1.value.scrollTop =
						toscroll.value > 0
							? content1.value.scrollHeight - toscroll.value
							: 0;
				});
			});
		}
	}
};
function scrollToBottom(type) {
	// 滚动到 div 元素的底部
	content1.value.scrollTop = content1.value.scrollHeight;
	if (type == 1) {
		content1.value.style.scrollBehavior = "smooth";
	} else {
		content1.value.style.scrollBehavior = "";
	}
}
// 发送消息
const sendMsg = () => {
	send();
	nextTick(() => {
		scrollToBottom(1);
	});
};
const pageSize = ref(2);
const noMsg = ref(false);
// TODO:获取每个房间的最新消息
const getMsgList = async (pageSize, roomsId) => {
	const res = await messageList(pageSize, roomsId);
	// 验证过期，退出登录
	if ((res.code == 402) | (res.code == 400)) {
		(localStorage.token = ""), (store.user = {}), router.push("/login");
	}
	const { data } = res;
	pageSize == 1
		? (msgList.value = data.message)
		: msgList.value.unshift(...data.message);
	msgList.value = msgList.value.sort((a, b) => {
		return new Date(a.sendTime) - new Date(b.sendTime);
	});
	// TODO：优化逻辑显示
	if (pageSize == 1) {
		store.fastMsg = msgList.value[msgList.value.length - 1];
	}

	noMsg.value = data.listLast;
};
onMounted(async () => {
	await getMsgList(1, roomsId.value);
	scrollToBottom();
});
onBeforeUnmount(() => {
	// 关闭 WebSocket 连接
	if (ws !== null) {
		ws.close();
	}
});
onMounted(() => {
	if (content1.value) {
		content1.value.addEventListener("scroll", handleScroll);
	}
});

onBeforeUnmount(() => {
	if (content1.value) {
		content1.value.removeEventListener("scroll", handleScroll);
	}
});
const slowMotion = ref(false);
function handleScroll() {
	// content 列表元素的 scrollTop 和 scrollHeight 属性
	if (content1.value.scrollHeight - content1.value.scrollTop < 489) {
		newMsg.value = 0;
	}
	content1.value.scrollHeight - content1.value.scrollTop < 660
		? (slowMotion.value = true)
		: (slowMotion.value = false);
}
//
const clearMsg = () => {
	scrollToBottom(1);
	newMsg.value = 0;
};
</script>
<template>
	<div class="chat-box">
		<div class="chat-window">
			<div class="content" ref="content1" @scroll="scroll">
				<p class="loading" v-if="loading">加载中</p>
				<MsgItem
					v-for="(item, index) in msgList"
					:item="item"
					:lastTime="index == 0 ? null : msgList[index - 1].sendTime"
					:key="item.id" />
				<div class="new-msg" v-if="newMsg != 0" @click="clearMsg">
					<span>{{ newMsg }}</span>
				</div>
			</div>
			<div class="bottom">
				<input
					v-model="msg"
					class="inputs"
					placeholder="聊天时请注意文明用语"
					maxlength="200"
					@keyup.enter="sendMsg"
					type="text" />
				<div class="button" @click="sendMsg">
					<i class="iconfont icon-icon"></i>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.chat-box {
	width: 37.125rem;
	height: 35.1875rem;
	margin: 0 1.375rem;
	background-color: $mainColor;
	border-radius: 1.25rem;
}
.chat-window {
	width: 100%;
	height: 100%;
	position: relative;
	padding: 0.6875rem 1.1875rem;
	.content {
		height: 30.5rem;
		padding-top: 0.625rem;
		padding-bottom: 0.625rem;
		padding-right: 0.625rem;
		overflow-y: auto;
		/* 1. 滚动条基础样式 */
		&::-webkit-scrollbar {
			width: 0.5rem; /* 滚动条宽度 */
			border-radius: 0.3125rem; /* 滚动条圆角 */
			background-color: #fff; /* 滚动条背景色 */
		}
		&::-webkit-scrollbar-thumb {
			background-color: #fff; /* 滚动条滑块颜色 */
			border-radius: 0.3125rem; /* 滑块边框圆角 */
		}
		.loading {
			position: absolute;
			top: 0;
			left: 50%;
			transform: translate(-50%, 0);
			text-align: center;
		}
		.new-msg {
			position: absolute;
			right: 54px;
			bottom: 70px;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 30px;
			height: 30px;
			border-radius: 50%;
			color: #fff;
			background-color: $secondaryColor;
			::after {
				content: "";
				position: absolute;
				left: 50%;
				bottom: -4px;
				transform: translate(-50%, 0);
				width: 0;
				height: 0;
				border-left: 10px solid transparent;
				border-right: 10px solid transparent;
				border-top: 10px solid $secondaryColor;
			}
		}
	}
	.bottom {
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 3.625rem;
		background-color: $mainColor;
		.inputs {
			width: 27.25rem;
			height: 2.9375rem;
			outline: none;
			&::-webkit-input-placeholder {
				color: $navFont;
			}
			color: $navFont;
			padding: 0.8125rem 1.3125rem;
			border: 0.0625rem solid $secondaryColor;
			border-radius: 1.052869rem;
		}
		.button {
			width: 5.375rem;
			height: 2.9375rem;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-left: 0.75rem;
			cursor: pointer;
			background: $secondaryColor;
			border-radius: 0.875rem;
			i {
				font-size: 1.25rem;
				color: $mainColor;
			}
		}
	}
}
</style>
