<script setup>
import { ref } from "vue";
import { HTTP_ADDRESS } from "@/configs/index";
import { mainStore } from "@/store";
const store = mainStore();
const imageUrl = ref("");
const token = ref({});
token.value = {
	Authorization: localStorage.token,
};
const handleAvatarSuccess = (response, uploadFile) => {
	imageUrl.value = URL.createObjectURL(uploadFile.raw);
	store.avatar = imageUrl.value;
	console.log(store.avatar);
};

const beforeAvatarUpload = (rawFile) => {
	if (rawFile.type !== "image/jpeg") {
		ElMessage.error("Avatar picture must be JPG format!");
		return false;
	} else if (rawFile.size / 1024 / 1024 > 2) {
		ElMessage.error("Avatar picture size can not exceed 2MB!");
		return false;
	}
	return true;
};
</script>
<template>
	<el-upload
		class="avatar-uploader"
		:action="`${HTTP_ADDRESS}/chatUser/uploadImage`"
		:show-file-list="false"
		method="post"
		:headers="token"
		:limit="1"
		:on-success="handleAvatarSuccess"
		:before-upload="beforeAvatarUpload">
		<img v-if="imageUrl" :src="imageUrl" class="avatar" />
		<el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
	</el-upload>
</template>
<style scoped>
.avatar-uploader .avatar {
	width: 78px;
	height: 78px;
	display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
	border: 1px dashed var(--el-border-color);
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
	border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 78px;
	height: 78px;
	text-align: center;
}
</style>
