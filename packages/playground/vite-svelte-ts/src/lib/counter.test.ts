import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/svelte';
import Counter from './Counter.svelte';

describe('Counter.svelte', () => {
	afterEach(() => cleanup());

	it('mounts', () => {
		const { container } = render(Counter);
		expect(container).toBeTruthy();
		expect(container.innerHTML).toContain('Clicks: 0');
	});

	it('updates on button click', async () => {
		render(Counter);
		const btn = screen.getByRole('button');
		const div = screen.getByText('Clicks: 0');
		await fireEvent.click(btn);
		expect(div.innerHTML).toBe('Clicks: 1');
	});
});
