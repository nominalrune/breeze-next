import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '@/App';
describe('Task Index', () => {
	it('renders a Index', ({ expect }) => {
		render(<App />, { wrapper: BrowserRouter });
		const user = userEvent.setup();
		const loginButton = screen.getAllByText(/Login/)[0];
		loginButton.click();
		expect(screen.findByLabelText(/Email/i));
	});
});
