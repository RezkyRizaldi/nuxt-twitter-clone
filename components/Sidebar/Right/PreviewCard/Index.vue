<template>
	<div :class="`m-2 overflow-hidden rounded-2xl border bg-gray-50 dark:bg-dim-700 ${twitterBorderColor}`">
		<h1 :class="`border-b p-3 text-xl font-extrabold text-gray-900 dark:text-white ${twitterBorderColor}`">{{ title }}</h1>
		<slot />
		<div :class="`cursor-pointer p-3 text-sm text-blue-400 hover:bg-gray-100 dark:hover:bg-dim-300 ${defaultTransition}`">Show more</div>
	</div>
</template>

<script setup>
	const { title } = defineProps({ title: { type: String, required: true } });
	const { defaultTransition, twitterBorderColor } = useTailwindConfig();
</script>
