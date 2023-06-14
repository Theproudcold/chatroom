<script setup>
import { mainStore } from "@/store/index";
import { onMounted } from "vue";
const store = mainStore();
const id = store.user.id;
const props = defineProps({
	item: {
		Type: Object,
	},
});
</script>

<template>
	<div class="chat-item" :class="{ myselfe: id == item.userId }">
		<div class="left">
			<img src="" alt="" />
		</div>
		<div class="right">
			<div class="header">{{ item.nickname }}</div>
			<div class="content">
				<p>
					{{ item.content }}
				</p>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.myselfe {
	flex-direction: row-reverse;
	.right {
		margin-left: 0;
		margin-right: 0.625rem;
		.header {
			text-align: right;
		}
		.content {
			background-color: $secondaryColor;
			border-radius: 1.3125rem;
			color: $mainColor;
			border-top-right-radius: 0;
		}
	}
}
.chat-item {
	margin-top: 1.5rem;
	display: flex;
	.left {
		width: 2.6875rem;
		height: 2.6875rem;
		border-radius: 50%;
		background-color: #333;
	}
	.right {
		margin-left: 0.625rem;
		width: 23.9375rem;
		.header {
			height: 1rem;
			font-size: 0.75rem;
			line-height: 1rem;
			margin-bottom: 0.375rem;
			letter-spacing: 0.2em;
			color: $fontColor;
		}
	}
	// 提到外边，减少层级，方便覆盖
	.content {
		background-color: $thirdColor;
		padding: 1.25rem;
		color: $fontColor;
		border-radius: 1.3125rem;
		border-top-left-radius: 0;
	}
}
</style>
