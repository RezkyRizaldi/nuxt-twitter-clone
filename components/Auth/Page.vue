<template>
	<div class="flex h-screen">
		<Head>
			<Title>Login - Twitter Clone</Title>
		</Head>
		<div class="relative hidden w-0 flex-1 lg:block">
			<img class="absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80" alt="Auth background" />
		</div>
		<div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
			<div class="mx-auto flex h-full w-full max-w-sm items-center lg:w-96">
				<AuthForm />
			</div>
		</div>
	</div>
</template>
