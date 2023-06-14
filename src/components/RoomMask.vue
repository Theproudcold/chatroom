<script setup>
import { mainStore } from "@/store/index";
import { ref } from "vue";
import { newRooms } from "@/api/rooms";
const store = mainStore();
// 退出
const closure = () => {
	store.showRoomMask = false;
};
const room = ref({
	roomAvatar: "",
	roomUserId: store.user.id,
	roomName: "",
});
const emit = defineEmits(["upadta"]);
// 保存
const keep = async () => {
	const res = await newRooms(room.value);
	console.log(room.value);
	console.log(res);
	if (res.code == 200) {
		ElMessage({
			showClose: true,
			message: "创建成功",
			type: "success",
		});
		emit("upadta");
	} else {
		ElMessage({
			showClose: true,
			message: "创建失败",
			type: "error",
		});
	}
	closure();
};
</script>
<template>
	<div class="overlay" v-if="store.showRoomMask">
		<div class="modal">
			<div class="modal-head">
				<h2>新建聊天室</h2>
				<i class="iconfont icon-guanbi" @click="closure"></i>
			</div>
			<div class="modal-content">
				<div class="room-avatar">
					<div class="avatar">
						<img src="" alt="" />
					</div>
					<p class="upload">点击上传头像</p>
				</div>
				<div class="room-name">
					<p class="title">聊天室名称</p>
					<input v-model="room.roomName" type="text" />
				</div>
			</div>
			<div class="button myCenter" @click="keep"><p>确定</p></div>
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
			.room-avatar {
				display: flex;
				align-items: center;
				margin: 1.3125rem 0 1.6875rem 0;
				.avatar {
					width: 3.625rem;
					height: 3.625rem;
					background: $userBgColor;
					border-radius: 50%;
					overflow: hidden;
					img {
						display: block;
						width: 100%;
						height: 100%;
					}
				}
				.upload {
					margin-left: 0.875rem;
					height: 0.8125rem;
					font-size: 0.625rem;
					line-height: 0.8125rem;
					letter-spacing: 0.1em;
					color: $navFont;
				}
			}
			.title {
				height: 0.8125rem;
				font-size: 0.625rem;
				line-height: 0.8125rem;
				letter-spacing: 0.2em;
				color: $fontColor;
				margin-bottom: 0.4375rem;
			}
			.room-name {
				input {
					width: 9.25rem;
					height: 2.3125rem;
					outline: none;
					padding: 0.625rem;
					border: 0.0625rem solid $navFont;
					border-radius: 0.5625rem;
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
