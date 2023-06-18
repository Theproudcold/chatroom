<script setup>
import { mainStore } from "@/store/index";
import { getTimeStringAutoShort } from "@/utils/data";
const store = mainStore();
const id = store.user.id;
const props = defineProps({
	item: {
		type: Object,
	},
	lastTime: {
		default: null,
	},
});
const shouldShowTime = (time) => {
	const currentTime = new Date(time);
	const lastTime = new Date(props.lastTime);
	if ((currentTime - lastTime) / 1000 > 300 || lastTime === null) {
		return true;
	} else {
		return false;
	}
};
</script>

<template>
	<div class="times" v-if="shouldShowTime(item.sendTime)">
		{{ getTimeStringAutoShort(item.sendTime) }}
	</div>
	<div class="chat-item" :class="{ myselfe: id == item.userId }">
		<div class="left">
			<img :src="item.avatar" alt="" />
		</div>
		<div class="right">
			<div class="header">
				{{ item.nickname }} <span>({{ item.location }})</span>
			</div>
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
.times {
	width: 100%;
	text-align: center;
	font-size: 0.875rem;
}
.chat-item {
	margin-top: 1.5rem;
	display: flex;
	.left {
		width: 2.6875rem;
		height: 2.6875rem;
		border-radius: 50%;
		background: $userBgColor;
		overflow: hidden;
		img {
			display: block;
			width: 100%;
			height: 100%;
		}
	}
	.right {
		margin-left: 0.625rem;
		max-width: 21rem;
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
		p {
			word-wrap: break-word;
		}
	}
}
</style>
