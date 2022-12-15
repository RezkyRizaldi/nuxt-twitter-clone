<template>
	<div>
		<MainSection title="Home" :loading="loading">
			<Head>
				<Title>Home / Twitter Clone</Title>
			</Head>
			<div :class="`border-b ${twitterBorderColor}`">
				<TweetForm :user="user" @onSuccess="handleFormSuccess" />
			</div>
			<TweetListFeed :tweets="tweets" />
		</MainSection>
	</div>
</template>

<script setup>
	const { twitterBorderColor } = useTailwindConfig();
	const { getTweets } = useTweets();
	const loading = ref(false);
	const tweets = ref([{ 2: 2 }, { 2: 1 }]);
	const { useAuthUser } = useAuth();
	const user = useAuthUser();

	onBeforeMount(async () => {
		loading.value = true;

		try {
			const res = await getTweets();

			tweets.value = res.tweets;
		} catch (error) {
			console.error(error);
		} finally {
			loading.value = false;
		}
	});

	const handleFormSuccess = async (tweet) => await navigateTo({ path: `/status/${tweet.id}` });
</script>
