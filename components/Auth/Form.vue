<template>
	<div class="w-full">
		<div class="flex justify-center">
			<div class="h-10 w-10">
				<LogoTwitter />
			</div>
		</div>
		<div class="space-y-6 pt-5">
			<UIInput id="username" label="Username" placeholder="@username" v-model:model-value="data.username" />
			<UIInput type="password" id="password" label="Password" placeholder="********" v-model:model-value="data.password" />
			<UIButton liquid :disabled="isButtonDisabled" @onClick="handleLogin">Login</UIButton>
		</div>
	</div>
</template>

<script setup>
	const data = reactive({ username: '', password: '', loading: false });

	const handleLogin = async () => {
		const { login } = useAuth();

		data.loading = true;

		try {
			await login({ username: data.username, password: data.password });
		} catch (error) {
			console.error(error);
		} finally {
			data.loading = false;
		}
	};

	const isButtonDisabled = computed(() => !data.username || !data.password || data.loading);
</script>
