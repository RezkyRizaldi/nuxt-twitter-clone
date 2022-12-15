<template>
	<div class="flex w-full items-center justify-around">
		<TweetItemActionsIcon color="blue" :size="size" @onClick="emits('onCommentClick')">
			<template v-slot:icon="{ classes }">
				<ChatBubbleOvalLeftEllipsisIcon :class="classes" />
			</template>
			<template v-slot:default v-if="showStats">
				{{ tweet.repliesCount }}
			</template>
		</TweetItemActionsIcon>
		<TweetItemActionsIcon color="green" :size="size">
			<template v-slot:icon="{ classes }">
				<ArrowPathIcon :class="classes" />
			</template>
			<template v-slot:default v-if="showStats">
				{{ generateRandomNumber() }}
			</template>
		</TweetItemActionsIcon>
		<TweetItemActionsIcon color="red" :size="size">
			<template v-slot:icon="{ classes }">
				<HeartIcon :class="classes" />
			</template>
			<template v-slot:default v-if="showStats">
				{{ generateRandomNumber() }}
			</template>
		</TweetItemActionsIcon>
		<TweetItemActionsIcon color="blue" :size="size">
			<template v-slot:icon="{ classes }">
				<ArrowUpTrayIcon :class="classes" />
			</template>
			<template v-slot:default v-if="showStats">
				<span>{{ generateRandomNumber() }}</span>
			</template>
		</TweetItemActionsIcon>
	</div>
</template>

<script setup>
	import { ArrowPathIcon, ArrowUpTrayIcon, ChatBubbleOvalLeftEllipsisIcon, HeartIcon } from '@heroicons/vue/24/outline';

	const emits = defineEmits(['onCommentClick']);
	const { tweet, compact } = defineProps({
		tweet: { type: Object, required: true },
		compact: { type: Boolean, default: false },
	});

	const showStats = computed(() => compact);
	const size = computed(() => (compact ? 5 : 8));

	const generateRandomNumber = () => Math.floor(Math.random() * 100);
</script>
