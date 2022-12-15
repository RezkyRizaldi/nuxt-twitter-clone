<template>
	<div>
		<MainSection title="Tweet" :loading="loading">
			<Head>
				<Title>{{ user.name }} on Twitter Clone: "{{ tweet.text }}{{ ` ${tweet.mediaFiles[0]?.url}` }}" / Twitter Clone</Title>
			</Head>
			<TweetDetails :user="user" :tweet="tweet" />
		</MainSection>
	</div>
</template>

<script setup>
	const loading = ref(false);
	const tweet = ref(null);
	const { getTweetById } = useTweets();
	const { useAuthUser } = useAuth();
	const user = useAuthUser();

	const { id } = useRoute().params;

	const getTweet = async () => {
		loading.value = true;

		try {
			const res = await getTweetById(id);

			tweet.value = res.tweet;
		} catch (error) {
			console.error(error);
		} finally {
			loading.value = false;
		}
	};

	watch(
		() => useRoute().fullPath,
		async () => await getTweet()
	);

	onBeforeMount(async () => await getTweet());
</script>
