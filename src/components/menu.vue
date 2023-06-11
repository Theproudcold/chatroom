<script setup>
const user = {
	avatar: "https://article.biliimg.com/bfs/article/a235b562cea354a9797f35eebc2eaf6281e14503.jpg",
	nickname: "光头强",
	description: "这个人很懒，没有留下什么简介...",
};
</script>

<template>
	<div class="menu">
		<div class="header">
			<div class="user">
				<div class="user-img">
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
	padding: 1.25rem;
	.header {
		.user {
			display: flex;
			justify-content: center;
			align-items: center;
			.user-img {
				width: 4.875rem;
				height: 4.875rem;
				border-radius: 50%;
				overflow: hidden;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.user-info {
				margin-top: 1rem;
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
					margin-top: 0.8125rem;
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
			font-size: 0.875rem;
			line-height: 1.125rem;
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
