<template>
	<div>
		<div class="flex items-center justify-center p-6" v-if="loading">
			<UISpinner />
		</div>
		<div v-else>
			<TweetItem :tweet="replyTo" v-if="replyTo && showReply" hideActions />
			<TweetFormInput :user="user" :placeholder="placeholder" :btnText="btnText" @onSubmit="handleFormSubmit" />
		</div>
	</div>
</template>

<script setup>
	const emits = defineEmits(['onSuccess']);
	const loading = ref(false);
	const { postTweet } = useTweets();
	const { user, placeholder, replyTo, showReply, btnText } = defineProps({
		user: { type: Object, required: true },
		placeholder: { type: String, default: "What's happening?" },
		replyTo: { type: Object, default: null },
		showReply: { type: Boolean, default: false },
		btnText: { type: String, default: 'Tweet' },
	});

	const handleFormSubmit = async ({ text, mediaFiles }) => {
		loading.value = true;

		try {
			const { tweet } = await postTweet({ text, mediaFiles, replyTo: replyTo?.id });

			emits('onSuccess', tweet);
		} catch (error) {
			console.error(error);
		} finally {
			loading.value = false;
		}
	};
</script>
