import type { Browser } from 'playwright';
import { afterAll, beforeAll } from 'vitest';

async function getBrowser(): Promise<Browser> {
	const chromium = (await import('playwright')).chromium;
	// @ts-ignore
	// eslint-disable-next-line node/no-missing-import
	const options = (await import('virtual:playwright-e2e-launch-options')).default;
	return chromium.connect(options);
}

let browser;
let page;

beforeAll(async () => {
	browser = globalThis.browser = await getBrowser();
	page = globalThis.page = await browser.newPage();
});

afterAll(async () => {
	delete globalThis.browser;
	delete globalThis.page;
	await Promise.allSettled([page.close(), browser.close()]);
});
