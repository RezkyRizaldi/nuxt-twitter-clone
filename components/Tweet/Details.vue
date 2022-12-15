<template>
	<div>
		<TweetItem :tweet="tweet" />
		<TweetForm :user="user" :replyTo="tweet" @onSuccess="handleFormSuccess" placeholder="Tweet your reply" btnText="Reply" />
		<TweetListFeed :tweets="replies" />
	</div>
</template>

<script setup>
	const { tweet, user } = defineProps({
		tweet: { type: Object, required: true },
		user: { type: Object, required: true },
	});
	const replies = computed(() => tweet?.replies ?? []);

	const handleFormSuccess = async (tweet) => await navigateTo({ path: `/status/${tweet.id}` });
</script>
