<template>
	<div>
		<TweetItemHeader :tweet="tweet" />
		<div :class="tweetBodyWrapper">
			<p :class="`shrink font-medium text-gray-800 dark:text-white ${textSize}`">{{ tweet.text }}</p>
			<div :class="`my-3 mr-2 flex rounded-2xl border-2 ${twitterBorderColor}`" v-for="{ id, url } in tweet.mediaFiles" :key="id">
				<img class="w-full rounded-2xl" :src="url" alt="Post" />
			</div>
			<div class="mt-2" v-if="!hideActions">
				<TweetItemActions :tweet="tweet" :compact="compact" @onCommentClick="handleCommentClick" />
			</div>
		</div>
	</div>
</template>

<script setup>
	const { twitterBorderColor } = useTailwindConfig();
	const emitter = useEmitter();

	const { tweet, compact, hideActions } = defineProps({
		tweet: { type: Object, required: true },
		compact: { type: Boolean, default: false },
		hideActions: { type: Boolean, default: false },
	});

	const tweetBodyWrapper = computed(() => (compact ? 'ml-16' : 'ml-2 mt-4'));
	const textSize = computed(() => (compact ? 'text-base' : 'text-2xl'));

	const handleCommentClick = () => emitter.$emit('replyTweet', tweet);
</script>
