<template>
	<div class="flex p-4">
		<div>
			<img class="h-10 w-10 rounded-full" :src="tweet.author?.profileImage" :alt="tweet.author?.name" />
		</div>
		<div class="ml-3">
			<span class="font-medium text-gray-800 dark:text-white">{{ tweet.author?.name }}</span>
			<span class="ml-1 text-sm font-medium text-gray-400">
				<NuxtLink to="#">{{ tweet.author.handle }}</NuxtLink> &middot; {{ tweet.postedAtHuman }}
			</span>
			<p class="text-sm" v-if="tweet.replyTo">
				<span class="text-gray-500">Replying to</span>
				<NuxtLink class="ml-1 text-blue-400" :to="replyToTweetURL">{{ tweet.replyTo.author.handle }}</NuxtLink>
			</p>
		</div>
	</div>
</template>

<script setup>
	const { tweet } = defineProps({ tweet: { type: Object, required: true } });

	const replyToTweetURL = computed(() => `/status/${tweet?.replyTo?.id}`);
</script>
