<template>
	<div>
		<label class="ml-px block pl-3 text-sm font-medium text-gray-700 dark:text-white" :for="id" v-if="label">{{ label }}</label>
		<div class="mt-1">
			<input
				class="block w-full rounded-full border border-gray-300 px-4 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 sm:text-sm"
				:id="id"
				:type="type"
				:value="modelValue"
				:placeholder="placeholder"
				@input="(e) => emits('update:modelValue', e.target.value)"
			/>
		</div>
	</div>
</template>

<script setup>
	const emits = defineEmits(['update:modelValue']);

	const { id, label, placeholder, type, modelValue } = defineProps({
		modelValue: { type: String, required: true, default: '' },
		id: { type: String, default: '' },
		label: { type: String, default: null },
		placeholder: { type: String, default: '' },
		type: { type: String, default: 'text' },
	});
</script>
