<template>
	<div :class="`cursor-pointer border-b p-3 hover:bg-gray-100 dark:hover:bg-dim-300 ${wrapperClasses}`">
		<slot />
	</div>
</template>

<script setup>
	const { defaultTransition, twitterBorderColor } = useTailwindConfig();
	const wrapperClasses = computed(() => `${defaultTransition} ${twitterBorderColor}`);
</script>
