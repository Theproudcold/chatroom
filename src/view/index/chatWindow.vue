<script setup>
import ChatItem from "@/components/chatItem.vue";
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { mainStore } from "@/store/index";
import { onlineUsers } from "@/api/user";
import { useWebSocket } from "@/utils/websocket";

import { onBeforeRouteUpdate, useRouter } from "vue-router";

const router = useRouter();

onBeforeRouteUpdate((to, from, next) => {
	if (to.params.id !== from.params.id) {
		getUserInfo();
		roomsId.value = router.currentRoute.value.params.id;
	}
	next();
});
const roomsId = ref(router.currentRoute.value.params.id);
const user = ref({});
user.value = store.user;
console.log(roomsId.value);
onMounted(() => {
	getUserInfo();
});
const content1 = ref(null);
const store = mainStore();
// 创建 WebSocket 客户端实例
// WebSocket HTML5提供的内置对象
const userId = store.user.id;
const ws = useWebSocket(handelMessage, userId);

ws.onmessage = function (event) {
	const obj = JSON.parse(event.data);
	if (obj.type && obj.type == 1) {
		msgList.value.push(obj.data);
	} else if (obj.type == 2 || obj.type == 3) {
		getOnline();
	} else if (obj.type == 4) {
		return;
	}
	console.log(obj);
};
function handelMessage(e) {
	const data = JSON.parse(e.data);
	console.log(data);
}
// 发送心跳包
function sendHeartbeat() {
	ws.send(
		JSON.stringify({
			type: 4,
		})
	);
}
const msgList = ref([]);
ws.onopen = function () {
	console.log("连接服务器成功");
	getOnline();
};
const getOnline = async () => {
	const { data } = await onlineUsers();
	store.online = data.onlineNumber;
	store.onlineUser = data.onlineUsers;
};
let heartbeatInterval = setInterval(sendHeartbeat, 2000);
const msg = ref("");
// 监听连接关闭事件
ws.addEventListener("close", () => {
	console.log("服务器关闭");
	clearInterval(heartbeatInterval);
});
function send() {
	//发送消息
	ws.send(
		JSON.stringify({
			nickname: store.user.nickname,
			content: msg.value,
			userId: userId,
			sendTime: "2023-6-13 16:47",
			chatRoomId: roomsId.value,
		})
	);
	console.log({
		nickname: store.user.nickname,
		content: msg.value,
		userId: userId,
		sendTime: "2023-6-13 16:47",
		chatRoomId: roomsId.value,
	});
	msgList.value.push({
		content: msg.value,
		userId: userId,
		nickname: store.user.nickname,
		sendTime: "2023-6-13 16:47",
		chatRoomId: roomsId.value,
	});
	msg.value = "";
}
function scrollToBottom(type) {
	// 滚动到 div 元素的底部
	content1.value.scrollTop = content1.value.scrollHeight;
	if (type == 1) {
		content1.value.style.scrollBehavior = "smooth";
	} else {
		content1.value.style.scrollBehavior = "";
	}
}
const sendMsg = () => {
	send();
	nextTick(() => {
		scrollToBottom(1);
	});
};

onMounted(() => {
	scrollToBottom();
});
onBeforeUnmount(() => {
	// 关闭 WebSocket 连接
	if (ws !== null) {
		ws.close();
	}
});
</script>

<template>
	<div class="chat-window">
		<div class="content" ref="content1">
			<ChatItem
				v-for="item in msgList"
				:item="item"
				:myselfy="store.user.id"
				:key="item"></ChatItem>
		</div>
		<div class="bottom">
			<input
				v-model="msg"
				class="inputs"
				placeholder="聊天时请注意文明用语"
				type="text" />
			<div class="button" @click="sendMsg">
				<i class="iconfont icon-icon"></i>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.chat-window {
	width: 100%;
	height: 100%;
	position: relative;
	padding: 0.6875rem 1.1875rem;
	.content {
		height: 30.5rem;
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
