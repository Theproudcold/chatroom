<script setup>
import Menu from "@/components/menu.vue";
import MemberList from "@/components/memberList.vue";
import RoomItem from "@/components/RoomItem.vue";
import { ref } from "vue";
const rooms = [
	{
		id: 1,
		roomAvatar:
			"https://article.biliimg.com/bfs/article/a235b562cea354a9797f35eebc2eaf6281e14503.jpg",
		roomUserId: 1,
		roomName: "聊天室1",
		select: true,
	},
	{
		id: 2,
		roomAvatar:
			"https://article.biliimg.com/bfs/article/a235b562cea354a9797f35eebc2eaf6281e14503.jpg",
		roomUserId: 1,
		roomName: "聊天室1",
		select: false,
	},
];
const toRooms = (item) => {
	selectRooms.value = item.id;
};
const selectRooms = ref(0);
selectRooms.value = rooms[0].id;
</script>

<template>
	<div class="main myCenter">
		<div class="window">
			<div class="left">
				<Menu>
					<RoomItem
						v-for="item in rooms"
						:rooms="item"
						time="22:24"
						:active="selectRooms == item.id"
						@click="toRooms(item)"
						:key="item.id"></RoomItem>
				</Menu>
			</div>
			<div class="content">
				<router-view></router-view>
			</div>
			<div class="right">
				<MemberList />
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.window {
	padding: 20px;
	.left {
		width: 290px;
		height: 563px;
		background-color: $mainColor;
		border-radius: 1.25rem;
	}
	.content {
		width: 37.125rem;
		height: 35.1875rem;
		margin: 0 1.375rem;
		background-color: $mainColor;
		border-radius: 1.25rem;
	}
}
</style>
