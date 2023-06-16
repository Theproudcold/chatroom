<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { register, sendEmailCode } from "@/api/user";
const router = useRouter();
const msg = ref(""); //信息提示
// 进行注册操作
const goRegister = async () => {
	if (user.value.userName == "" || user.value.password == "") {
		msg.value = "不能输入空";
		return;
	}
	const res = await register(user.value);
	if (res.code == 400 || res.code == 402) {
		msg.value = res.msg;
	}
	if (res.code == 200) {
		ElMessage({
			showClose: true,
			message: "注册成功",
			type: "success",
		});
		goLogin();
	}
};
// 前往登录页
const goLogin = () => {
	router.push("/login");
};
const user = ref({
	userName: "",
	password: "",
	email: "",
	code: "",
});
const getEmailCode = async () => {
	const res = await sendEmailCode(user.value);
	if (res.code == 400 || res.code == 402) {
		msg.value = res.msg;
	}
	if (res.code == 200) {
		ElMessage({
			showClose: true,
			message: "发送验证码成功",
			type: "success",
		});
	}
	console.log(res);
};
const timer = ref(60);
const prohibit = ref(false);
const getCode = () => {
	if (user.value.email == "") {
		msg.value = "请输入正确邮箱";
		return;
	}
	timer.value = 60;
	const Timing = () => {
		if (timer.value > 0) {
			setTimeout(function () {
				timer.value--;
				Timing(); // 递归调用cont函数
			}, 1000);
		} else {
			prohibit.value = false;
		}
	};
	prohibit.value = true;
	getEmailCode();
	Timing(); // 调用cont函数开始倒计时
};
</script>

<template>
	<div class="main myCenter">
		<div class="window">
			<div class="left">
				<div class="register">
					<h1 class="title">注册</h1>
					<input
						v-model="user.userName"
						class="inputs"
						placeholder="请输入用户名"
						type="text" />
					<input
						v-model="user.password"
						class="inputs"
						placeholder="请输入密码"
						type="password" />
					<div class="emil">
						<input
							v-model="user.email"
							class="inputs"
							placeholder="请输入邮箱"
							type="text" />
						<input
							v-model="user.code"
							class="inputs"
							placeholder="请输入验证码"
							type="text" />
						<button
							class="code"
							@click="getCode"
							:disabled="prohibit"
							:class="{ prohibit: prohibit }">
							{{ prohibit ? timer : "点我发送验证码" }}
						</button>
					</div>
					<p class="msg" v-if="msg">{{ msg }}</p>
					<div class="button" @click="goRegister">
						<i class="iconfont icon-youjiantou"></i>
					</div>
					<p class="hint" @click="goLogin">已有账号？点我登录</p>
				</div>
			</div>
			<div class="right">
				<div class="info">
					<p class="welcome">欢迎使用</p>
					<h4 class="title">“庆海”聊天室</h4>
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
	.register {
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
		.emil {
			position: relative;
			.code {
				position: absolute;
				bottom: 22px;
				right: 2px;
				cursor: pointer;
				color: $secondaryColor;
				border: none;
				background-color: transparent;
			}
			.prohibit {
				color: rgba($secondaryColor, 0.6);
			}
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
			bottom: 60px;
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
