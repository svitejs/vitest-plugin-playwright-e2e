import { increment } from './math';
import { describe, it, expect } from 'vitest';

describe('increment', function () {
	it('adds one', () => {
		expect(increment(1)).toBe(2);
	});
});
