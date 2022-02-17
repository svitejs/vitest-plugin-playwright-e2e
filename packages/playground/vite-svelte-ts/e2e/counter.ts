import { describe, it, beforeAll, expect } from 'vitest';

describe('Counter', () => {
	beforeAll(async () => {
		await page.goto('http://localhost:3000');
	});
	it('starts at 0', async () => {
		const button = (await page.$('button'))!;
		expect(button).toBeDefined();

		let text = await page.evaluate((btn) => btn.textContent, button);
		expect(text).toBe('Clicks: 0');

		await button.click();
		text = await page.evaluate((btn) => btn.textContent, button);
		expect(text).toBe('Clicks: 1');
	});
});
