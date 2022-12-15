<template>
	<div>
		<div class="p-4" v-if="isEmptyArr">
			<p class="text-center text-gray-500 dark:text-white">No tweets available.</p>
		</div>
		<div :class="`cursor-pointer border-b pb-4 hover:bg-gray-100 dark:hover:bg-dim-300 ${twitterBorderColor} ${defaultTransition}`" v-for="tweet in tweets" :key="tweet.id" @click="redirect(tweet)" v-else>
			<TweetItem :tweet="tweet" compact />
		</div>
	</div>
</template>

<script setup>
	const { defaultTransition, twitterBorderColor } = useTailwindConfig();
	const { tweets } = defineProps({ tweets: { type: Array, required: true } });
	const isEmptyArr = computed(() => tweets.length === 0);

	const redirect = async (tweet) => await navigateTo({ path: `/status/${tweet.id}` });
</script>
