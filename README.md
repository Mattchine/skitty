# SvelteKit Tauri template
Template for building SvelteKit + Tauri (SKT)

# Table of contents
- [SvelteKit Tauri template](#sveltekit-tauri-template)
- [Table of contents](#table-of-contents)
  - [Developing](#developing)
  - [Configure / Step-by-step guide](#configure--step-by-step-guide)
  - [Notes](#notes)
  - [Special Thanks](#special-thanks)

## Developing

```bash
$ git clone https://github.com/Mattchine/sveltekit-tauri-template/tree/master <your path>
$ cd <your path>
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
$ cd <you path>
$ yarn add -D @tauri-apps/cli
$ yarn add @tauri-apps/api
```
3. Disable SvelteKit SSR (I have problem with this for days, thanks to [jsmenzies](https://github.com/cloudflare/workerskv.gui/pull/13))

- 3.1 Create `src/hook.ts`
```ts
  /** @type {import('@sveltejs/kit').Handle} */
  export async function handle({ event, resolve }) {
    return await resolve(event, {
      ssr: false
    });
  }
```
- 3.2 Add `hook.ts` to `svelte.config.js`
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

5. Done! now you can run
```bash
  $ yarn tauri dev
```

## Notes
- This repository is for my future self and hope it would help someone out there too.

## Special Thanks
- [jsmenzies](https://github.com/jsmenzies)
- [svelte-add](https://github.com/svelte-add/svelte-add)
- And, of course, all underlying project: `Svelte`, `SvelteKit`, `Taiilwind`, `Tauri`, etc.
