<script setup></script>

<template>
	<div class="main myCenter">
		<div class="content">
			<div class="left">
				<div class="register">
					<h1 class="title">注册</h1>
					<input
						class="inputs"
						placeholder="请输入用户名"
						type="text" />
					<input
						class="inputs"
						placeholder="请输入密码"
						type="password" />
					<input
						class="inputs"
						placeholder="请再次输入密码"
						type="password" />
					<div class="button">
						<i class="iconfont icon-youjiantou"></i>
					</div>
					<p class="hint">已有账号？点我登录</p>
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
.main {
	width: 100%;
	height: 100vh;
	background: linear-gradient(
		180deg,
		#bcdfff 0%,
		#d5ebff 0.01%,
		#6888c4 98.65%
	);
	.content {
		display: flex;
		width: 80rem;
		height: 37.5rem;
		margin: 1.25rem;
		border-radius: 1.875rem;
		background-size: cover;
		overflow: hidden;
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
				padding: 28px;
				.title {
					font-size: 24px;
					font-weight: 600;
					padding: 20px 0;
					letter-spacing: 0.1em;
					color: $secondaryColor;
				}
				.inputs {
					width: 100%;
					height: 45px;
					margin: 10px 0;
					&::-webkit-input-placeholder {
						color: $fontColor;
					}
					color: $fontColor;
					outline: none;
					border: none;
					background-color: transparent;
					border-bottom: 1px solid $fontColor !important;
				}
				.forget {
					font-size: 12px;
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
						font-size: 24px;
					}
				}
				.hint {
					position: absolute;
					width: 100%;
					height: 1.25rem;
					bottom: 1.75rem;
					text-align: center;
					font-size: 12px;
					cursor: pointer;
					line-height: 16px;
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
				left: -100px;
				transform: translate(0, -50%);
				display: block;
				width: 400px;
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
					width: 288px;
					height: 52px;
					font-weight: 700;
					font-size: 40px;
					line-height: 52px;
					letter-spacing: 0.0125rem;
					color: #ffffff;
				}
			}
		}
	}
}
</style>
