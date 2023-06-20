<script setup>
import { mainStore } from "@/store/index";
import { updataUserInfo } from "@/api/user";
import updataphoto from "./updataphoto.vue";
import { ref } from "vue";
const store = mainStore();
// 退出
const closure = () => {
	store.showUserMask = false;
};
const props = defineProps({
	user: {
		type: Object,
	},
});
const emit = defineEmits(["upadta"]);
const { nickname } = props.user;
const { description } = props.user;
console.log(props.user);
const userInfo = ref({});
userInfo.value.avatar = props.user.avatar;
userInfo.value.id = props.user.id;
userInfo.value.nickname = nickname;
userInfo.value.description = description;
// 保存
const keep = async () => {
	const res = await updataUserInfo(userInfo.value);
	if (res.code == 200) {
		ElMessage({
			showClose: true,
			message: "修改成功",
			type: "success",
		});
		emit("upadta");
	} else {
		ElMessage({
			showClose: true,
			message: "修改失败",
			type: "error",
		});
	}
	closure();
};
</script>
<template>
	<div class="overlay" v-if="store.showUserMask">
		<div class="modal">
			<div class="modal-head">
				<h2>个人资料</h2>
				<i class="iconfont icon-guanbi" @click="closure"></i>
			</div>
			<div class="modal-content">
				<div class="user-avatar">
					<p class="title">头像</p>
					<updataphoto></updataphoto>
				</div>
				<div class="user-name">
					<p class="title">用户名</p>
					<input v-model="userInfo.nickname" type="text" />
				</div>
				<div class="user-info">
					<p class="title">个人简介</p>
					<textarea
						v-model="userInfo.description"
						maxlength="80"></textarea>
				</div>
			</div>
			<div class="button myCenter" @click="keep"><p>保存</p></div>
		</div>
	</div>
</template>
<style lang="scss">
.overlay {
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background: rgba(0, 0, 0, 0.5); /* 将背景透明度调为0.5 */
	z-index: 999; /* 确保遮盖其它元素 */
	.modal {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 28.625rem;
		height: 25.1875rem;
		border-radius: 1.625rem;
		transform: translate(-50%, -50%);
		background-color: $mainColor;
		padding: 20px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
		z-index: 1000;
		.modal-head {
			display: flex;
			justify-content: space-between;
			color: $fontColor;
			i {
				font-weight: 700;
				font-size: 1.5rem;
			}
		}
		.modal-content {
			.user-avatar {
				display: flex;
				align-items: center;
				margin: 1.3125rem 0 1.6875rem 0;
			}
			.title {
				height: 0.8125rem;
				font-size: 0.625rem;
				line-height: 0.8125rem;
				letter-spacing: 0.2em;
				color: $fontColor;
				margin: 0.4375rem;
			}
			.user-name {
				input {
					width: 9.25rem;
					height: 2.3125rem;
					outline: none;
					padding: 0.625rem;
					border: 0.0625rem solid $navFont;
					border-radius: 0.5625rem;
				}
			}
			.user-info {
				textarea {
					width: 16.4375rem;
					height: 5.875rem;
					outline: none;
					padding: 0.625rem;
					border: 0.0625rem solid $navFont;
					border-radius: 0.5625rem;
					resize: none;
				}
			}
		}
		.button {
			position: absolute;
			bottom: 2.625rem;
			right: 2.5625rem;
			width: 4.375rem;
			height: 2.0625rem;
			border-radius: 0.75rem;
			color: $mainColor;
			cursor: pointer;
			background-color: $secondaryColor;
			p {
				width: 1.8125rem;
				height: 1rem;
				font-weight: 700;
				font-size: 0.75rem;
				line-height: 1rem;
				letter-spacing: 0.125rem;
			}
		}
	}
}
</style>
