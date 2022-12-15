// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			title: 'Twitter Clone',
			meta: [
				{ name: 'description', content: 'A simple Twitter Clone build with Nuxt3 and Tailwind CSS' },
				{ name: 'msapplication-TileColor', content: '#2b5797' },
				{ name: 'theme-color', content: '#ffffff' },
			],
			link: [
				{ rel: 'stylesheet', href: 'https://fonts.cdnfonts.com/css/chirp-2' },
				{ rel: 'manifest', href: '/site.webmanifest' },
				{ rel: 'icon', href: '/favicon-16x16.png', type: 'image/png', sizes: '16x16x' },
				{ rel: 'icon', href: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
				{ rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
				{ rel: 'apple-touch-startup-image', href: '/safari-pinned-tab.svg', color: '#5bbad5' },
				{ rel: 'shortcut icon', href: '/favicon.ico' },
			],
		},
	},
	build: {
		transpile: ['@heroicons/vue'],
	},
	modules: ['@nuxtjs/tailwindcss'],
	runtimeConfig: {
		jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
		jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
		cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
		cloudinaryAPIKey: process.env.CLOUDINARY_API_KEY,
		cloudinaryAPISecret: process.env.CLOUDINARY_API_SECRET,
	},
	typescript: {
		shim: false,
	},
});
