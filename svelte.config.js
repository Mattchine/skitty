// import adapter from '@sveltejs/adapter-auto';
import staticAdapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	kit: {
		adapter: staticAdapter(),
		prerender: {
			default: true,
		},
		files: {
			hooks: 'src/hooks/index.ts'
		}
	}
};

export default config;
