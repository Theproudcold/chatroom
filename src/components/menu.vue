<script setup>
const user = {
	avatar: "",
	nickname: "光头强",
	description: "我是神",
};
</script>

<template>
	<div class="menu">
		<div class="header">
			<div class="user">
				<div class="user-img">
					<h1>我是头像</h1>
					<img :src="user.avatar" alt="" />
				</div>
				<div class="user-info">
					<h3 class="nickname">{{ user.nickname }}</h3>
					<p class="description">{{ user.description }}</p>
				</div>
			</div>
			<div class="button">
				<p>+ 新建聊天室</p>
			</div>
		</div>
		<div class="content">
			<slot></slot>
		</div>
		<div class="bottom">
			<p><i class="iconfont icon-tuichu"></i>退出聊天室</p>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.menu {
	width: 100%;
	height: 100%;
	padding: 20px;
	.header {
		.user {
			display: flex;
			justify-content: center;
			.user-info {
				margin-left: 1.125rem;
				.nickname {
					width: 7.1875rem;
					height: 1.9375rem;
					font-weight: 700;
					font-size: 1.5rem;
					line-height: 1.9375rem;
					letter-spacing: 0.2em;
					color: $fontColor;
				}
				.description {
					margin-top: 18px;
					width: 8.1875rem;
					height: 1.625rem;
					font-size: 0.625rem;
					line-height: 0.8125rem;
					letter-spacing: 0.1em;
					color: #a8a8a8;
				}
			}
		}
		.button {
			width: 13.8125rem;
			height: 2.875rem;
			margin-top: 2.375rem;
			display: flex;
			justify-content: center;
			align-items: center;
			color: $mainColor;
			font-weight: 700;
			font-size: 14px;
			line-height: 18px;
			letter-spacing: 0.4em;
			border-radius: 1rem;
			cursor: pointer;
			background-color: $secondaryColor;
		}
	}
	.content {
		height: 16.75rem;
		margin: 1.625rem 0;
	}
	.bottom {
		text-align: center;
		p {
			height: 0.875rem;
			font-size: 0.625rem;
			line-height: 0.875rem;
			letter-spacing: 0.2em;
			cursor: pointer;
			color: $secondaryColor;
		}
	}
}
</style>
