<script setup>
import ChatItem from "@/components/chatItem.vue";
import { nextTick, onMounted, ref } from "vue";
const content = ref(null);
function scrollToBottom(type) {
	// 滚动到 div 元素的底部
	content.value.scrollTop = content.value.scrollHeight;
	if (type == 1) {
		content.value.style.scrollBehavior = "smooth";
	} else {
		content.value.style.scrollBehavior = "";
	}
}
const sendMsg = () => {
	scrollToBottom(1);
};
onMounted(() => {
	scrollToBottom();
});
</script>

<template>
	<div class="chat-window">
		<div class="content" ref="content">
			<ChatItem v-for="item in 10" :key="item"></ChatItem>
			<ChatItem v-for="item in 2" myselfe="true" :key="item"></ChatItem>
		</div>
		<div class="bottom">
			<input
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
			background-color: $thirdColor; /* 滚动条背景色 */
		}
		&::-webkit-scrollbar-thumb {
			background-color: $secondaryColor; /* 滚动条滑块颜色 */
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
