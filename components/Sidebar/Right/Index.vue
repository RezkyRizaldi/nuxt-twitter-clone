<template>
	<div class="flex flex-col">
		<div class="relative m-2">
			<div class="absolute flex h-full cursor-pointer items-center pl-4 text-gray-600">
				<div class="h-6 w-6">
					<MagnifyingGlassIcon @click="handleSearch" />
				</div>
			</div>
			<input
				class="flex h-9 w-full items-center rounded-full border border-gray-200 bg-gray-200 pl-12 text-sm font-normal text-black shadow focus:border-blue-200 focus:bg-gray-100 focus:outline-none dark:border-dim-400 dark:bg-dim-400 dark:text-gray-100 dark:focus:bg-dim-900"
				type="text"
				placeholder="Search Twitter"
				v-model="search"
			/>
		</div>
		<SidebarRightPreviewCard title="What's happening">
			<SidebarRightPreviewCardItem v-for="({ count, title }, index) in whatsHappening" :key="index">
				<div>
					<h2 class="text-base font-bold text-gray-800 dark:text-white">{{ title }}</h2>
					<p class="text-xs text-gray-400">{{ count }}</p>
				</div>
			</SidebarRightPreviewCardItem>
		</SidebarRightPreviewCard>
		<SidebarRightPreviewCard title="Who to follow">
			<SidebarRightPreviewCardItem v-for="({ handle, image, name }, index) in whoToFollow" :key="index">
				<div class="flex flex-row items-center justify-between p-2">
					<div class="flex flex-row">
						<img class="h-10 w-10 rounded-full" :src="image" :alt="name" />
						<div class="ml-2 flex flex-col">
							<h1 class="text-sm font-bold text-gray-900 dark:text-white">{{ name }}</h1>
							<p class="text-xs text-gray-400">{{ handle }}</p>
						</div>
					</div>
					<div class="flex h-full">
						<button class="rounded-full bg-black px-4 py-2 text-xs font-bold text-white dark:bg-white dark:text-black" type="button">Follow</button>
					</div>
				</div>
			</SidebarRightPreviewCardItem>
		</SidebarRightPreviewCard>
		<footer>
			<ul class="mx-2 my-4 text-xs text-gray-500">
				<li class="mx-2 inline-block">
					<a class="hover:underline" href="#" @click.prevent="handleToggleDarkMode">Dark mode</a>
				</li>
				<li class="mx-2 inline-block">
					<a class="hover:underline" href="#">Terms of Service</a>
				</li>
				<li class="mx-2 inline-block">
					<a class="hover:underline" href="#">Privacy Policy</a>
				</li>
				<li class="mx-2 inline-block">
					<a class="hover:underline" href="#">Cookie Policy</a>
				</li>
				<li class="mx-2 inline-block">
					<a class="hover:underline" href="#">Accessbility</a>
				</li>
				<li class="mx-2 inline-block">
					<a class="hover:underline" href="#">Ads Info</a>
				</li>
				<li class="mx-2 inline-block">
					<a class="hover:underline" href="#">More</a>
				</li>
				<li class="mx-2 inline-block">
					<a class="hover:underline" href="#">
						<span>More</span>
						<EllipsisHorizontalIcon class="inline h-4 w-4" />
					</a>
				</li>
				<li class="mx-2 inline-block">&copy; 2022 Twitter Clone, Inc.</li>
			</ul>
		</footer>
	</div>
</template>

<script setup>
	import { EllipsisHorizontalIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

	const emitter = useEmitter();
	const search = ref('');
	const whatsHappening = ref([
		{ title: 'SpaceX', count: '18.8k Tweets' },
		{ title: '#CodingIsFun', count: '9.8k Tweets' },
		{ title: '#artforall', count: '5k Tweets' },
	]);
	const whoToFollow = ref([
		{ name: 'Joe Biden', handle: '@joebiden', image: 'https://picsum.photos/200/200' },
		{ name: 'Joe Biden', handle: '@joebiden', image: 'https://picsum.photos/200/200' },
		{ name: 'Joe Biden', handle: '@joebiden', image: 'https://picsum.photos/200/200' },
	]);

	const handleSearch = async () => await useRouter().push({ path: '/search', query: { q: search.value } });

	const handleToggleDarkMode = () => emitter.$emit('toggleDarkMode');
</script>
