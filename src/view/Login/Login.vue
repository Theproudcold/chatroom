<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login, userInfo } from "@/api/user";
import { mainStore } from "@/store";
const router = useRouter();
const store = mainStore();
const msg = ref(""); //信息提示
// 进行登录操作
const user = ref({
	userName: "",
	password: "",
});

const getUserInfo = async () => {
	const res = await userInfo();
	store.user = res.data;
};
const goLogin = async () => {
	if (user.value.userName == "" || user.value.password == "") {
		msg.value = "不能输入空";
		return;
	}
	const res = await login(user.value);
	if (res.code == 400 || res.code == 402) {
		msg.value = res.msg;
	}
	if (res.code == 200) {
		localStorage.setItem("token", res.data.token);
		ElMessage({
			showClose: true,
			message: "登录成功",
			type: "success",
		});
		async function processUserAndNavigate() {
			await getUserInfo();
			await router.push("/chat");
		}
		processUserAndNavigate();
	}
};
// 前往注册页
const goRegister = () => {
	router.push("/register");
};
</script>

<template>
	<div class="main myCenter">
		<div class="window">
			<div class="left">
				<div class="login">
					<h1 class="title">登录</h1>
					<input
						v-model="user.userName"
						class="inputs"
						placeholder="账号"
						type="text" />
					<input
						v-model="user.password"
						class="inputs"
						placeholder="密码"
						type="password" />
					<p class="msg" v-if="msg">{{ msg }}</p>
					<p class="forget">忘记密码</p>
					<div class="button" @click="goLogin">
						<i class="iconfont icon-youjiantou"></i>
					</div>
					<p class="hint" @click="goRegister">没有账号？点击注册</p>
				</div>
			</div>
			<div class="right">
				<div class="info">
					<p class="welcome">欢迎使用</p>
					<h4 class="title">wfitChat</h4>
				</div>
				<img src="../../assets/images/bg.png" alt="" />
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.left {
	position: relative;
	width: 60%;
	height: 100%;
	background: $loginBgColor;
	.login {
		position: absolute;
		top: 50%;
		left: 40%;
		transform: translate(-50%, -50%);
		width: 26.511875rem;
		height: 32.01375rem;
		background: rgba(255, 255, 255, 0.6);
		border-radius: 10%;
		padding: 1.75rem;
		.title {
			font-size: 1.5rem;
			font-weight: 600;
			padding: 1.25rem 0;
			letter-spacing: 0.1em;
			color: $secondaryColor;
		}
		.inputs {
			width: 100%;
			height: 2.8125rem;
			margin: 0.625rem 0;
			&::-webkit-input-placeholder {
				color: $fontColor;
			}
			color: $fontColor;
			outline: none;
			border: none;
			background-color: transparent;
			border-bottom: 0.0625rem solid $fontColor !important;
		}
		.msg {
			font-size: 0.875rem;
			color: $errorColor;
		}
		.forget {
			font-size: 0.75rem;
			text-align: right;
			cursor: pointer;
			letter-spacing: 0.2em;
			color: rgba($fontColor, 0.6);
		}
		.button {
			position: absolute;
			right: 2.625rem;
			bottom: 6.625rem;
			width: 4.25rem;
			height: 4.25rem;
			border-radius: 50%;
			display: flex;
			color: #fff;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			background-color: $fontColor;
			i {
				font-size: 1.5rem;
			}
		}
		.hint {
			position: absolute;
			width: 100%;
			height: 1.25rem;
			bottom: 1.75rem;
			text-align: center;
			font-size: 0.75rem;
			cursor: pointer;
			line-height: 1rem;
			letter-spacing: 0.2em;
			margin: auto;
			color: rgba($fontColor, 0.6);
		}
	}
}
.right {
	width: 40%;
	height: 100%;
	position: relative;
	background-color: $secondaryColor;
	&::before {
		content: "";
		background-color: $secondaryColor;
		position: absolute;
		top: 50%;
		left: -6.25rem;
		transform: translate(0, -50%);
		display: block;
		width: 25rem;
		height: 140%;
		border-radius: 50%;
	}
	img {
		position: absolute;
		bottom: -1.25rem;
	}
	.info {
		width: 100%;
		position: absolute;
		.welcome {
			margin-top: 3.0625rem;
			width: 10.375rem;
			height: 2.9375rem;
			font-size: 2.25rem;
			padding: 0;
			line-height: 2.9375rem;
			letter-spacing: 0.0125rem;
			color: #ffffff;
		}
		.title {
			margin-top: 1.75rem;
			width: 18rem;
			height: 3.25rem;
			font-weight: 700;
			font-size: 2.5rem;
			line-height: 3.25rem;
			letter-spacing: 0.0125rem;
			color: #ffffff;
		}
	}
}
</style>
