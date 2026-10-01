import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ImgHTMLAttributes } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Navbar } from './Navbar';

vi.mock('next/image', () => ({
  default: ({ alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) => <img alt={alt} {...props} />,
}));

describe('Navbar', () => {
  it('closes the mobile menu on Escape and returns focus to the toggle', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    await user.click(screen.getByRole('button', { name: 'Abrir menu' }));
    const toggle = screen.getByRole('button', { name: 'Fechar menu' });
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    await user.keyboard('{Escape}');

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveFocus();
  });

  it('closes the mobile menu when clicking outside of it', async () => {
    const user = userEvent.setup();
    render(
      <>
        <Navbar />
        <p>Conteúdo da página</p>
      </>,
    );

    await user.click(screen.getByRole('button', { name: 'Abrir menu' }));
    await user.click(screen.getByText('Conteúdo da página'));

    expect(screen.getByRole('button', { name: 'Abrir menu' }))
      .toHaveAttribute('aria-expanded', 'false');
  });
});
