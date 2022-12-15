<template>
	<div :class="`border-x ${twitterBorderColor}`">
		<div class="sticky top-0 bg-white/80 px-4 py-3 backdrop-blur-md dark:bg-dim-900/80">
			<h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">{{ title }}</h2>
		</div>
		<div :class="`flex items-center justify-center border-b p-4 ${twitterBorderColor}`" v-if="loading">
			<UISpinner />
		</div>
		<div v-else>
			<slot />
		</div>
	</div>
</template>

<script setup>
	const { twitterBorderColor } = useTailwindConfig();
	const { loading, title } = defineProps({
		title: { type: String, required: true },
		loading: { type: Boolean, required: true },
	});
</script>
