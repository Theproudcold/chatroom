<script setup>
const props = defineProps({
	user: {
		Type: Object,
	},
});
</script>

<template>
	<transition name="showuser">
		<div class="member-item">
			<div class="avatar">
				<img :src="user.avatar" alt="" />
			</div>
			<p class="name">{{ user.nickname }}</p>
		</div>
	</transition>
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
		overflow: hidden;
		img {
			width: 100%;
			height: 100%;
		}
	}
	.name {
		max-width: 9.375rem;
		line-height: 2.875rem;
		padding-left: 0.375rem;
		white-space: nowrap; /* 防止换行 */
		overflow: hidden; /* 溢出隐藏 */
		text-overflow: ellipsis; /* 将溢出部分省略为省略号 */
	}
}
.showuser {
	&-enter {
		&-from {
			opacity: 0;
		}
		&-active {
			transition: all 0.3s ease-in;
		}
		&-to {
			opacity: 1;
		}
	}
	&-leave {
		&-from {
			opacity: 1;
		}
		&-active {
			transition: all 0.3s ease-out;
		}
		&-to {
			opacity: 0;
		}
	}
}
</style>
