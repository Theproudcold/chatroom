<script setup>
import { msgStore } from "@/store/msg";
const store = msgStore();
const props = defineProps({
	rooms: {
		Type: Array,
	},
	time: {
		Type: String,
	},
	active: {
		Type: Boolean,
		default: false,
	},
});
</script>

<template>
	<div class="room-item" :class="{ active: active }">
		<div class="left">
			<img :src="rooms.roomAvatar" alt="" />
		</div>
		<div class="right">
			<div class="header">
				<div class="room-name">{{ rooms.roomName }}</div>
				<div class="time">{{ store.fastMsg.sendTime }}</div>
			</div>
			<div class="content">
				<p>{{ store.fastMsg.content }}</p>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.active {
	background: $thirdColor;
}
.room-item {
	width: 100%;
	height: 4.1875rem;
	padding: 0.625rem 1.25rem;
	border-radius: 0.6875rem;
	display: flex;
	cursor: pointer;
	.left {
		width: 4rem;
		height: 100%;
		img {
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
	}
	.right {
		width: 12.5rem;
		margin-left: 0.8125rem;
		.header {
			display: flex;
			justify-content: space-between;
			.room-name {
				font-weight: 500;
				font-size: 0.875rem;
				line-height: 1.125rem;
				letter-spacing: 0.1em;
				color: $fontColor;
			}
			.time {
				font-size: 0.625rem;
				line-height: 0.8125rem;
				letter-spacing: 0.1em;
				color: $secondaryColor;
			}
		}
		.content {
			width: 9.375rem;
			height: 1.875rem;
			display: flex;
			align-items: center;
			p {
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
				font-size: 0.625rem;
				line-height: 0.8125rem;
				letter-spacing: 0.1em;
				color: $navFont;
			}
		}
	}
}
</style>
