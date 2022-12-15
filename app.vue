<template>
	<div :class="{ dark: darkMode }">
		<div class="bg-white dark:bg-dim-900">
			<LoadingPage v-if="isLoading" />
			<div class="min-h-full" v-else-if="user">
				<div class="mx-auto grid grid-cols-12 sm:px-6 lg:max-w-7xl lg:gap-9 lg:px-8">
					<div class="hidden xs:col-span-1 md:block xl:col-span-2">
						<div class="sticky top-0">
							<SidebarLeft :user="user" @onTweet="handleOpenTweetModal" @onLogout="handleUserLogout" />
						</div>
					</div>
					<main class="col-span-12 md:col-span-8 xl:col-span-6">
						<RouterView />
					</main>
					<div class="hidden md:col-span-3 md:block xl:col-span-4">
						<div class="sticky top-0">
							<SidebarRight />
						</div>
					</div>
				</div>
			</div>
			<AuthPage v-else />
			<UIModal :isOpen="postTweetModal" @onClose="handleModalClose">
				<TweetForm :user="user" :replyTo="replyTweet" placeholder="Tweet your reply" btnText="Reply" showReply @onSuccess="handleFormSuccess" />
			</UIModal>
		</div>
	</div>
</template>

<script setup>
	const { initAuth, logout, useAuthLoading, useAuthUser } = useAuth();
	const { closePostTweetModal, openPostTweetModal, usePostTweetModal, useReplyTweet } = useTweets();
	const isLoading = useAuthLoading();
	const user = useAuthUser();
	const darkMode = ref(true);
	const postTweetModal = usePostTweetModal();
	const emitter = useEmitter();
	const replyTweet = useReplyTweet();

	emitter.$on('replyTweet', (tweet) => openPostTweetModal(tweet));
	emitter.$on('toggleDarkMode', () => {
		darkMode.value = !darkMode.value;
	});

	onBeforeMount(async () => await initAuth());

	const handleFormSuccess = async (tweet) => {
		closePostTweetModal();
		await navigateTo({ path: `/status/${tweet.id}` });
	};

	const handleModalClose = () => closePostTweetModal();

	const handleOpenTweetModal = () => openPostTweetModal(null);

	const handleUserLogout = async () => await logout();
</script>
