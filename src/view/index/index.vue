<script setup>
import Menu from "@/components/menu.vue";
import MemberList from "@/components/memberList.vue";
import ChatWindow from "@/components/chatWindow.vue";
</script>

<template>
	<div class="main myCenter">
		<div class="window">
			<div class="left">
				<Menu></Menu>
			</div>
			<div class="content">
				<MemberList></MemberList>
			</div>
			<div class="right">
				<ChatWindow></ChatWindow>
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
}
</style>
