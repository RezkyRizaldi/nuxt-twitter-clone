<template>
	<div>
		<div class="flex shrink-0 p-4 pb-0">
			<div class="flex w-12">
				<img class="inline-block h-10 w-10 rounded-full" :src="user?.profileImage" :alt="user?.name" />
			</div>
			<div class="w-full p-2 pt-0">
				<textarea class="h-10 w-full resize-none border-0 bg-transparent pt-0 text-lg text-gray-900 placeholder:text-gray-400 focus:ring-0 dark:text-white" :placeholder="placeholder" v-model="text"></textarea>
			</div>
		</div>
		<div class="p-4 pl-16">
			<img class="rounded-2xl border" :class="twitterBorderColor" :src="inputImageURL" alt="Preview" v-if="inputImageURL" />
			<input type="file" accept="image/png, image/gif, image/jpeg" ref="imageInput" aria-label="File" hidden @change="handleImageChange" />
		</div>
		<div class="flex p-2 pl-14">
			<div class="flex w-full">
				<div class="cursor-pointer rounded-full p-2 text-blue-400 hover:bg-blue-50 dark:hover:bg-dim-800" @click="handleImageClick">
					<svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor">
						<g>
							<path
								d="M19.75 2H4.25C3.01 2 2 3.01 2 4.25v15.5C2 20.99 3.01 22 4.25 22h15.5c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2zM4.25 3.5h15.5c.413 0 .75.337.75.75v9.676l-3.858-3.858c-.14-.14-.33-.22-.53-.22h-.003c-.2 0-.393.08-.532.224l-4.317 4.384-1.813-1.806c-.14-.14-.33-.22-.53-.22-.193-.03-.395.08-.535.227L3.5 17.642V4.25c0-.413.337-.75.75-.75zm-.744 16.28l5.418-5.534 6.282 6.254H4.25c-.402 0-.727-.322-.744-.72zm16.244.72h-2.42l-5.007-4.987 3.792-3.85 4.385 4.384v3.703c0 .413-.337.75-.75.75z"
							></path>
							<circle cx="8.868" cy="8.309" r="1.542"></circle>
						</g>
					</svg>
				</div>
				<div class="cursor-pointer rounded-full p-2 text-blue-400 hover:bg-blue-50 dark:hover:bg-dim-800">
					<svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor">
						<g>
							<path
								d="M19 10.5V8.8h-4.4v6.4h1.7v-2h2v-1.7h-2v-1H19zm-7.3-1.7h1.7v6.4h-1.7V8.8zm-3.6 1.6c.4 0 .9.2 1.2.5l1.2-1C9.9 9.2 9 8.8 8.1 8.8c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2c1 0 1.8-.4 2.4-1.1v-2.5H7.7v1.2h1.2v.6c-.2.1-.5.2-.8.2-.9 0-1.6-.7-1.6-1.6 0-.8.7-1.6 1.6-1.6z"
							></path>
							<path
								d="M20.5 2.02h-17c-1.24 0-2.25 1.007-2.25 2.247v15.507c0 1.238 1.01 2.246 2.25 2.246h17c1.24 0 2.25-1.008 2.25-2.246V4.267c0-1.24-1.01-2.247-2.25-2.247zm.75 17.754c0 .41-.336.746-.75.746h-17c-.414 0-.75-.336-.75-.746V4.267c0-.412.336-.747.75-.747h17c.414 0 .75.335.75.747v15.507z"
							></path>
						</g>
					</svg>
				</div>
				<div class="cursor-pointer rounded-full p-2 text-blue-400 hover:bg-blue-50 dark:hover:bg-dim-800">
					<svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor">
						<g>
							<path
								d="M6 5c-1.1 0-2 .895-2 2s.9 2 2 2 2-.895 2-2-.9-2-2-2zM2 7c0-2.209 1.79-4 4-4s4 1.791 4 4-1.79 4-4 4-4-1.791-4-4zm20 1H12V6h10v2zM6 15c-1.1 0-2 .895-2 2s.9 2 2 2 2-.895 2-2-.9-2-2-2zm-4 2c0-2.209 1.79-4 4-4s4 1.791 4 4-1.79 4-4 4-4-1.791-4-4zm20 1H12v-2h10v2zM7 7c0 .552-.45 1-1 1s-1-.448-1-1 .45-1 1-1 1 .448 1 1z"
							></path>
						</g>
					</svg>
				</div>
				<div class="cursor-pointer rounded-full p-2 text-blue-400 hover:bg-blue-50 dark:hover:bg-dim-800">
					<svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor">
						<g>
							<path d="M12 22.75C6.072 22.75 1.25 17.928 1.25 12S6.072 1.25 12 1.25 22.75 6.072 22.75 12 17.928 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z"></path>
							<path
								d="M12 17.115c-1.892 0-3.633-.95-4.656-2.544-.224-.348-.123-.81.226-1.035.348-.226.812-.124 1.036.226.747 1.162 2.016 1.855 3.395 1.855s2.648-.693 3.396-1.854c.224-.35.688-.45 1.036-.225.35.224.45.688.226 1.036-1.025 1.594-2.766 2.545-4.658 2.545z"
							></path>
							<circle cx="14.738" cy="9.458" r="1.478"></circle>
							<circle cx="9.262" cy="9.458" r="1.478"></circle>
						</g>
					</svg>
				</div>
				<div class="cursor-pointer rounded-full p-2 text-blue-400 hover:bg-blue-50 dark:hover:bg-dim-800">
					<svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor">
						<g>
							<path
								d="M6 3V2h2v1h6V2h2v1h1.5C18.88 3 20 4.119 20 5.5v2h-2v-2c0-.276-.22-.5-.5-.5H16v1h-2V5H8v1H6V5H4.5c-.28 0-.5.224-.5.5v12c0 .276.22.5.5.5h3v2h-3C3.12 20 2 18.881 2 17.5v-12C2 4.119 3.12 3 4.5 3H6zm9.5 8c-2.49 0-4.5 2.015-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.01-4.5-4.5-4.5zM9 15.5C9 11.91 11.91 9 15.5 9s6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5S9 19.09 9 15.5zm5.5-2.5h2v2.086l1.71 1.707-1.42 1.414-2.29-2.293V13z"
							></path>
						</g>
					</svg>
				</div>
				<div class="cursor-pointer rounded-full p-2 text-blue-400 hover:bg-blue-50 dark:hover:bg-dim-800">
					<svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor">
						<g>
							<path
								d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z"
							></path>
						</g>
					</svg>
				</div>
			</div>
			<div class="ml-auto">
				<UIButton size="sm" :disabled="isDisabled" @onClick="handleFormSubmit">{{ btnText }}</UIButton>
			</div>
		</div>
	</div>
</template>

<script setup>
	const { twitterBorderColor } = useTailwindConfig();
	const emits = defineEmits(['onSubmit']);
	const imageInput = ref();
	const selectedFile = ref(null);
	const inputImageURL = ref(null);
	const text = ref('');
	const { user, placeholder, btnText } = defineProps({
		user: { type: Object, required: true },
		placeholder: { type: String, required: true },
		btnText: { type: String, required: true },
	});
	const isDisabled = computed(() => text.value === '');

	const handleFormSubmit = () => emits('onSubmit', { text: text.value, mediaFiles: [selectedFile.value] });

	const handleImageClick = () => imageInput.value.click();

	const handleImageChange = (e) => {
		const file = e.target.files[0];

		selectedFile.value = file;

		const reader = new FileReader();

		reader.onload = (e) => {
			inputImageURL.value = e.target.result;
		};

		reader.readAsDataURL(file);
	};
</script>
