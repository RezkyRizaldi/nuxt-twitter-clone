<template>
	<div class="group flex cursor-pointer items-center text-gray-400" @click.stop.prevent="emits('onClick')">
		<div :class="`rounded-full p-2 group-hover:bg-${color}-100 group-hover:text-${color}-400 dark:group-hover:bg-opacity-20 ${defaultTransition}`">
			<slot name="icon" :classes="`w-${size} h-${size}`" />
		</div>
		<span :class="`ml-1 group-hover:text-${color}-400`">
			<slot />
		</span>
	</div>
</template>

<script setup>
	const { defaultTransition } = useTailwindConfig();
	const emits = defineEmits(['onClick']);
	const { color, size } = defineProps({
		color: { type: String, required: true },
		size: { type: Number, default: 5 },
	});
</script>
