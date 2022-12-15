<template>
	<button :class="`flex justify-center rounded-full bg-blue-400 text-sm font-light text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-300 ${classes}`" :disabled="disabled" @click="handleClick">
		<span :class="textFontSize">
			<slot />
		</span>
	</button>
</template>

<script setup>
	const emits = defineEmits(['onClick']);
	const { disabled, liquid, size } = defineProps({
		disabled: { type: Boolean, default: false },
		size: { type: String, default: 'md' },
		liquid: { type: Boolean, default: false },
	});

	const defaultWidth = computed(() => {
		switch (size) {
			default:
				return 'w-min';
		}
	});
	const textFontSize = computed(() => {
		switch (size) {
			case 'lg':
				return 'text-base';

			default:
				return 'text-sm';
		}
	});
	const paddingClasses = computed(() => {
		switch (size) {
			case 'sm':
				return 'px-3 py-2';

			case 'lg':
				return 'px-4 py-3';

			default:
				return 'p-3';
		}
	});
	const classes = computed(() => `${paddingClasses.value} ${liquid ? 'w-full' : defaultWidth.value}`);

	const handleClick = (e) => emits('onClick', e);
</script>
