<script setup>
import { mainStore } from "@/store/index";
const store = mainStore();
const closure = () => {
	store.showMask = false;
};
</script>
<template>
	<div class="overlay" v-if="store.showMask">
		<div class="modal">
			<div class="modal-head">
				<h2>个人资料</h2>
				<i class="iconfont icon-guanbi" @click="closure"></i>
			</div>
			<div class="modal-content">
				<div class="user-avatar">
					<div class="avatar">
						<img src="" alt="" />
					</div>
					<p class="upload">点击上传头像</p>
				</div>
				<div class="user-name">
					<p>用户名</p>
					<input type="text" />
				</div>
				<div class="user-name">
					<p>个人简介</p>
					<textarea name="" id="" cols="30" rows="10"></textarea>
				</div>
			</div>
			<div class="button myCenter"><p>保存</p></div>
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
		}
		.button {
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
