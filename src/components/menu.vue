<script setup>
import { onMounted, ref } from "vue";
import UserMask from "@/components/UserMask.vue";
import RoomrMask from "@/components/RoomMask.vue";
import { mainStore } from "@/store/index";
import { userInfo } from "@/api/user";
import { Rooms } from "@/api/rooms";
import { useRouter } from "vue-router";

const router = useRouter();
const store = mainStore();
const user = ref({});
const rooms = ref([]);
const getUserInfo = async () => {
	const res = await userInfo();
	store.user = res.data;
	user.value = store.user;
};
// 获取聊天室列表
const getRooms = async () => {
	const { data } = await Rooms();
	rooms.value = data;
};
// 前往对应聊天室
const toRooms = (item) => {
	selectRooms.value = item;
	router.push(`/chat/chatroom/${item}`);
};
const selectRooms = ref(1);
onMounted(() => getRooms());

// 更新房间信息
const upadataRoom = () => {
	getRooms();
};
// 更新用户信息
const upadtaUser = () => {
	getUserInfo();
};
onMounted(() => getUserInfo());
</script>

<template>
	<div class="menu">
		<div class="header">
			<div class="user">
				<div class="user-img">
					<img :src="user.avatar" alt="" />
				</div>
				<div class="user-info">
					<div class="info-header">
						<h3 class="nickname">{{ user.nickname }}</h3>
						<div
							class="edit myCenter"
							@click="store.showUserMask = true">
							<span>修改</span>
						</div>
					</div>
					<p class="description">{{ user.description }}</p>
				</div>
			</div>
			<div class="button">
				<p @click="store.showRoomMask = true">+ 新建聊天室</p>
			</div>
		</div>
		<div class="content">
			<RoomItem
				v-for="item in rooms"
				:rooms="item"
				time="22:24"
				:active="selectRooms == item.id"
				@click="toRooms(item.id)"
				:key="item.id"></RoomItem>
		</div>
		<div class="bottom">
			<p><i class="iconfont icon-tuichu"></i>退出聊天室</p>
		</div>
		<RoomMask @upadta="upadta"></RoomMask>
		<UserMask @upadta="upadtaUser" :user="user"></UserMask>
	</div>
</template>

<style lang="scss" scoped>
.menu {
	width: 100%;
	height: 100%;
	padding: 1.25rem;
	.header {
		.user {
			cursor: pointer;
			display: flex;
			justify-content: center;
			align-items: center;
			.user-img {
				width: 4.875rem;
				height: 4.875rem;
				border-radius: 50%;
				overflow: hidden;
				background: $userBgColor;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.user-info {
				margin-top: 1rem;
				margin-left: 1.125rem;
				.info-header {
					display: flex;
					justify-content: center;
					align-items: center;
					.nickname {
						width: 7.1875rem;
						height: 1.9375rem;
						font-weight: 700;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
						font-size: 1rem;
						line-height: 1.9375rem;
						color: $fontColor;
					}
					.edit {
						width: 2.6875rem;
						height: 1.1875rem;
						font-size: 0.75rem;
						border-radius: 0.375rem;
						color: $mainColor;
						cursor: pointer;
						background-color: $secondaryColor;
					}
				}
				.description {
					margin-top: 0.8125rem;
					width: 8.1875rem;
					height: 1.625rem;
					font-size: 0.625rem;
					line-height: 0.8125rem;
					letter-spacing: 0.1em;
					color: #a8a8a8;
					display: -webkit-box; /* 设置为块级元素 */
					-webkit-line-clamp: 2; /* 显示行数 */
					-webkit-box-orient: vertical; /* 垂直排列 */
					overflow: hidden; /* 隐藏超出范围的内容 */
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
	.mask {
		width: 100vw;
		height: 100vh;
		background-color: #7f7f7f;
	}
}
</style>
