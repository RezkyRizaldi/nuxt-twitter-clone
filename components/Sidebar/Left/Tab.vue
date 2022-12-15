<template>
	<NuxtLink to="#" :class="`flex w-min items-center rounded-full p-3 text-black hover:bg-gray-200 dark:text-white dark:hover:bg-dim-200 ${defaultTransition}`">
		<div class="h-6 w-6">
			<slot name="icon" />
		</div>
		<div :class="`ml-4 hidden text-xl xl:block ${textClasses}`">
			<slot name="name" />
		</div>
	</NuxtLink>
</template>

<script setup>
	const { active } = defineProps({ active: { type: Boolean, default: false } });
	const textClasses = computed(() => (active ? 'font-semibold' : 'font-normal'));
	const { defaultTransition } = useTailwindConfig();
</script>
