import { describe, it, expect } from 'vitest';
import { vitestPluginPlaywrightEe } from '../src';

describe('vitest-plugin-playwright-e2e', () => {
	it('should be named', function () {
		expect(vitestPluginPlaywrightEe().name).toBe('vitest-plugin-playwright-e2e');
	});
});
