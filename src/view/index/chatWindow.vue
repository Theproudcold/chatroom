<script setup>
import ChatItem from "@/components/chatItem.vue";
import { nextTick, onMounted } from "vue";
function scrollToBottom() {
	const content = this.$refs.content;
	console.log(content);
	// 滚动到 div 元素的底部
	content.scrollTop = content.scrollHeight;
	// // 或者可以使用 scrollIntoView() 方法来滚动
	// messages.lastElementChild.scrollIntoView({ behavior: "smooth" });
}
onMounted(() => {
	nextTick(() => {
		scrollToBottom();
	});
});
</script>

<template>
	<div class="chat-window">
		<div class="content">
			<ChatItem v-for="item in 10" :key="item"></ChatItem>
			<ChatItem v-for="item in 2" myselfe="true" :key="item"></ChatItem>
		</div>
		<div class="bottom">
			<input
				class="inputs"
				placeholder="聊天时请注意文明用语"
				type="text" />
			<div class="button"><i class="iconfont icon-icon"></i></div>
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
		height: 31.125rem;
		padding-bottom: 10px;
		overflow-y: auto;
	}
	.bottom {
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 58px;
		background-color: $mainColor;
		.inputs {
			width: 436px;
			height: 47px;
			outline: none;
			&::-webkit-input-placeholder {
				color: $navFont;
			}
			color: $navFont;
			padding: 0.8125rem 1.3125rem;
			border: 1px solid $secondaryColor;
			border-radius: 16.8459px;
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
