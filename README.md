# Skitty
Template for building SvelteKit + Tauri (Skitty)

# Warning
This project is supposed to be used temporary only (until `svelte-add` tauri is released).
<B>Consider checking `svlete-add` before continue.</B>

# Table of contents
- [Skitty](#skitty)
- [Warning](#warning)
- [Table of contents](#table-of-contents)
  - [Developing](#developing)
  - [Configure / Step-by-step guide](#configure--step-by-step-guide)
  - [Notes](#notes)
  - [Special Thanks](#special-thanks)

## Developing

```bash
$ git clone https://github.com/Mattchine/skitty <your path>
$ cd <your path>
$ yarn install
$ yarn tauri dev

```

## Configure / Step-by-step guide
1. Create project with [svelte-add](https://github.com/svelte-add/svelte-add)
```bash
$ npm init @svelte-add/kit@latest
# Follow the prompts to select the integrations you want
```
2. Add Tauri to your project
```bash
$ cd <your path>
$ yarn add -D @tauri-apps/cli
$ yarn add @tauri-apps/api
```
3. Disable SvelteKit SSR (I have problem with this for days, thanks to [jsmenzies](https://github.com/cloudflare/workerskv.gui/pull/13))

- 3.1 Create `src/hooks.ts`
```ts
  /** @type {import('@sveltejs/kit').Handle} */
  export async function handle({ event, resolve }) {
    return await resolve(event, {
      ssr: false
    });
  }
```
- 3.2 Add `hooks.ts` to `svelte.config.js`
```js
  kit: {
    files: {
	    hooks: 'src/hooks.ts'
	  }
  }
```
4. Change tauri config `src-tauri/tauri.conf.json`
- 4.1 Change `devPath` from PORT `8080` PORT `3000`
- 4.2 Set `beforeDevCommand` and `beforeBuildCommand`
```json
  "build": {
    "distDir": "../public",
    "devPath": "http://localhost:3000",
    "beforeDevCommand": "yarn dev",
    "beforeBuildCommand": "yarn build"
  },
```

5. Now you can run
```bash
  $ yarn tauri dev
```

6. But if you try `yarn tauri build` , it won't work right now. We need to fix `distDir`. Again, change `src-tauri/tauri.conf.json`
```json
  "build": {
    "distDir": "../build",
  }
```
7. But where is `build`? Well, you have to tell svelte that you need static-site with adapter static. 
- 7.1 Install `adapter-static` first
```bash
  $ yarn add -D @sveltejs/adapter-static@next
```
- 7.2 Change `svelte.config.js` as follows.
```js
  import staticAdapter from '@sveltejs/adapter-static';
  // ...

	kit: {
		adapter: staticAdapter(),
		prerender: {
			default: true,
		},
		files: {
			hooks: 'src/hooks.ts'
		}
	}
```
8. Now both `yarn tauri dev` and `yarn tauri build` will works just fine.

## Notes
- This repository is for my future self and hope it would help someone out there too.

## Special Thanks
- [jsmenzies](https://github.com/jsmenzies)
- [svelte-add](https://github.com/svelte-add/svelte-add)
- And, of course, all underlying project: `Svelte`, `SvelteKit`, `Taiilwind`, `Tauri`, and many mores!.
