import { chromium } from 'playwright';
import { preview } from 'vite';
export default async function () {
	const previewServer = await preview({ preview: { port: 3000 } });
	// @ts-expect-error foo
	// eslint-disable-next-line node/no-missing-import
	const options = (await import('virtual:playwright-e2e-launch-options')).default;
	const server = await chromium.launchServer(options);
	return async () => {
		await Promise.allSettled([previewServer.httpServer.close(), server.close()]);
	};
}
