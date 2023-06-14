<script setup>
const props = defineProps({
	user: {
		Type: Object,
	},
});
</script>

<template>
	<div class="member-item">
		<div class="avatar">
			<img :src="user.avatar" alt="" />
		</div>
		<p class="name">{{ user.nickname }}</p>
	</div>
</template>

<style lang="scss" scoped>
.member-item {
	display: flex;
	align-items: center;
	margin: 0.625rem;
	.avatar {
		width: 1.625rem;
		height: 1.625rem;
		background: $userBgColor;
		border-radius: 50%;
	}
	.name {
		line-height: 2.875rem;
		padding-left: 0.375rem;
	}
}
</style>
