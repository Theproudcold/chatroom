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
			<div class="user-img">
				<h1>我是头像</h1>
				<img :src="user.avatar" alt="" />
			</div>
			<div class="user-info">
				<h3 class="nickname">{{ user.nickname }}</h3>
				<p class="description">{{ user.description }}</p>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.menu {
	width: 100%;
	height: 100%;
	padding: 20px;
	.header {
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
}
</style>
