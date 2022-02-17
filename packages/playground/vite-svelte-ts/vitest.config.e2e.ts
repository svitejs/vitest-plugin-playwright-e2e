/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { playwrightE2E } from '@svitejs/vitest-plugin-playwright-e2e';

export default defineConfig({
	plugins: [svelte({ hot: !process.env.VITEST }), playwrightE2E()],
	test: {
		globals: true,
		environment: 'node',
		watch: false,
		include: ['e2e/**/*.ts']
	}
});
