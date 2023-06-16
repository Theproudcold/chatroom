<script setup>
import Menu from "@/components/menu.vue";
import MemberItem from "@/components/memberItem.vue";
import { mainStore } from "@/store/index";
import { useRouter } from "vue-router";
const router = useRouter();
const store = mainStore();
</script>

<template>
	<div class="main myCenter">
		<div class="window">
			<div class="left">
				<Menu></Menu>
			</div>
			<div class="content">
				<router-view></router-view>
			</div>
			<div class="right">
				<div class="header">
					<span class="online-icon"></span>
					<p class="online-title">在线成员</p>
					<h4 class="online-number">{{ store.online }}</h4>
				</div>
				<div class="member-list">
					<MemberItem
						v-for="item in store.onlineUser"
						:key="item.id"
						:user="item" />
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.window {
	padding: 1.25rem;
	.left {
		width: 18.125rem;
		height: 35.1875rem;
		background-color: $mainColor;
		border-radius: 1.25rem;
	}
	.content {
		width: 37.125rem;
		height: 35.1875rem;
		margin: 0 1.375rem;
		background-color: $mainColor;
		border-radius: 1.25rem;
	}
	.right {
		width: 14.25rem;
		height: 35.1875rem;
		background: $mainColor;
		padding: 1.25rem 0.625rem 0 1.25rem;
		border-radius: 1.389787rem;
		.header {
			height: 1.875rem;
			display: flex;
			align-items: center;
			.online-icon {
				display: block;
				width: 0.5rem;
				height: 0.5rem;
				border-radius: 50%;
				background: #56dc4a;
				box-shadow: 0px 0px 0.3125rem 0.0625rem rgba(86, 220, 74, 0.8);
			}
			.online-title {
				margin: 0 0.59375rem;
			}
			.online-number {
				font-size: 1rem;
				line-height: 1.3125rem;
				color: $fontColor;
			}
		}
		.member-list {
			height: 30rem;
			overflow-y: auto;
			/* 1. 滚动条基础样式 */
			&::-webkit-scrollbar {
				width: 0.5rem; /* 滚动条宽度 */
				border-radius: 0.3125rem; /* 滚动条圆角 */
				background-color: $mainColor; /* 滚动条背景色 */
			}
			&::-webkit-scrollbar-thumb {
				background-color: $secondaryColor; /* 滚动条滑块颜色 */
				border-radius: 0.3125rem; /* 滑块边框圆角 */
			}
		}
	}
}
</style>
