<template>
	<div>
		<MainSection title="Search" :loading="loading">
			<Head>
				<Title>{{ q }} - Twitter Clone Search / Twitter Clone</Title>
			</Head>
			<TweetListFeed :tweets="tweets" />
		</MainSection>
	</div>
</template>

<script setup>
	const { getTweets } = useTweets();
	const loading = ref(false);
	const tweets = ref([{ 2: 2 }, { 2: 1 }]);
	const { q } = useRoute().query;

	watch(
		() => useRoute().fullPath,
		async () => await getAllTweets()
	);

	onBeforeMount(async () => await getAllTweets());

	const getAllTweets = async () => {
		loading.value = true;

		try {
			const res = await getTweets({ query: q });

			tweets.value = res.tweets;
		} catch (error) {
			console.error(error);
		} finally {
			loading.value = false;
		}
	};
</script>
