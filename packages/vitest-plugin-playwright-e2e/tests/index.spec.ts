import { describe, it, expect } from 'vitest';
import { playwrightE2E } from '../src';

describe('vitest-plugin-playwright-e2e', () => {
	it('should be named', function () {
		expect(playwrightE2E().name).toBe('vitest-plugin-playwright-e2e');
	});
});
