<template>
	<aside class="flex h-screen flex-col">
		<div :class="`my-2 w-min rounded-full p-2 hover:bg-blue-50 dark:hover:bg-white/20 ${defaultTransition}`">
			<NuxtLink to="/">
				<div class="h-8 w-8">
					<LogoTwitter />
				</div>
			</NuxtLink>
		</div>
		<div class="mt-2">
			<SidebarLeftTab active>
				<template v-slot:icon>
					<HomeIcon />
				</template>
				<template v-slot:name> Home </template>
			</SidebarLeftTab>
			<SidebarLeftTab>
				<template v-slot:icon>
					<HashtagIcon />
				</template>
				<template v-slot:name> Explore </template>
			</SidebarLeftTab>
			<SidebarLeftTab>
				<template v-slot:icon>
					<BellIcon />
				</template>
				<template v-slot:name> Notifications </template>
			</SidebarLeftTab>
			<SidebarLeftTab>
				<template v-slot:icon>
					<InboxIcon />
				</template>
				<template v-slot:name> Messages </template>
			</SidebarLeftTab>
			<SidebarLeftTab>
				<template v-slot:icon>
					<BookmarkIcon />
				</template>
				<template v-slot:name> Bookmarks </template>
			</SidebarLeftTab>
			<SidebarLeftTab>
				<template v-slot:icon>
					<DocumentTextIcon />
				</template>
				<template v-slot:name> Lists </template>
			</SidebarLeftTab>
			<SidebarLeftTab>
				<template v-slot:icon>
					<UserIcon />
				</template>
				<template v-slot:name> Profile </template>
			</SidebarLeftTab>
			<SidebarLeftTab>
				<template v-slot:icon>
					<EllipsisHorizontalCircleIcon />
				</template>
				<template v-slot:name> More </template>
			</SidebarLeftTab>
			<div class="mt-2 hidden xl:block">
				<UIButton liquid size="lg" @onClick="emits('onTweet')">Tweet</UIButton>
			</div>
			<div class="mt-2 block xl:hidden">
				<UIButton liquid size="lg" @onClick="emits('onTweet')">
					<div class="h-6 w-6 font-bold">
						<PencilIcon />
					</div>
				</UIButton>
			</div>
		</div>
		<div :class="`mx-auto mt-auto mb-5 flex w-14 cursor-pointer flex-row items-center justify-center rounded-full p-2 hover:bg-gray-100 dark:hover:bg-dim-800 xl:w-full ${defaultTransition}`" @click="emits('onLogout')">
			<div class="flex flex-row">
				<img class="h-10 w-10 rounded-full" :src="user?.profileImage" :alt="user?.name" />
				<div class="ml-2 hidden flex-col xl:flex">
					<h1 class="text-sm font-bold text-gray-800 dark:text-white">{{ user.name }}</h1>
					<p class="text-sm text-gray-400">{{ user.handle }}</p>
				</div>
			</div>
			<div class="ml-auto hidden xl:block">
				<div class="h-6 w-6">
					<EllipsisHorizontalIcon class="text-gray-800 dark:text-white" />
				</div>
			</div>
		</div>
	</aside>
</template>

<script setup>
	import { BellIcon, BookmarkIcon, DocumentTextIcon, EllipsisHorizontalCircleIcon, EllipsisHorizontalIcon, HashtagIcon, InboxIcon, PencilIcon, UserIcon } from '@heroicons/vue/24/outline';
	import { HomeIcon } from '@heroicons/vue/24/solid';

	const { defaultTransition } = useTailwindConfig();
	const emits = defineEmits(['onTweet', 'onLogout']);
	const { user } = defineProps({ user: { type: Object, required: true } });
</script>
