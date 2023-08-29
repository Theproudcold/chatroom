<script setup>
import MenuBox from "./components/MenuBox/index.vue";
import UserList from "./components/UserList/index.vue";
</script>

<template>
	<div class="main myCenter">
		<div class="window">
			<MenuBox></MenuBox>
			<div class="content">
				<router-view></router-view>
			</div>
			<UserList></UserList>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.window {
	padding: 1.25rem;
}
</style>
