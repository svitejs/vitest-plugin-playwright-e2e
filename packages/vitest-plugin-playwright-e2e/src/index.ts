import { randomBytes } from 'crypto';
import type { Plugin } from 'vite';
const PREFIX = 'virtual:playwright-e2e-';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const _dirname =
	typeof __dirname !== 'undefined' ? __dirname : dirname(fileURLToPath(import.meta.url));
const VIRTUAL_PATH = resolve(_dirname, '..', 'virtual');
export function playwrightE2E(options?: any): Plugin {
	let optionsPromise: Promise<string>;
	const getOptions = () => {
		if (!optionsPromise) {
			optionsPromise = new Promise<string>((resolve) => {
				const result = { ...options };
				if (!result.port) result.port = 25123; // TODO find free
				if (!result.wsPath) result.wsPath = randomBytes(16).toString('hex'); // must be unguessable, ws could be used to control os
				if (!result.wsEndpoint)
					result.wsEndpoint = `ws://localhost:${result.port}/${result.wsPath}`;
				resolve(`export default ${JSON.stringify(result)}`);
			});
		}
		return optionsPromise;
	};
	return {
		name: 'vitest-plugin-playwright-e2e',
		//@ts-expect-error unknown test type
		config() {
			return {
				test: {
					setupFiles: [`${VIRTUAL_PATH}/setupFile.ts`],
					globalSetup: [`${VIRTUAL_PATH}/globalSetup.ts`]
				}
			};
		},

		resolveId(id: string) {
			if (id.startsWith(PREFIX)) return id;
		},

		async load(id: string) {
			if (id.startsWith(PREFIX)) {
				const vid = id.substring(PREFIX.length);
				if (vid === 'launch-options') return getOptions();
			}
		}
	};
}
