import { render, screen } from '@testing-library/react';
import type { ImgHTMLAttributes } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Hero } from './Hero';

vi.mock('next/image', () => ({
  default: ({ alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) => <img alt={alt} {...props} />,
}));

describe('Hero', () => {
  it('renders the hero badge, headline and call to action buttons', () => {
    render(<Hero />);

    expect(screen.getByText('Consultoria & Personal Premium')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: /resultado não vem do acaso/i }),
    ).toBeInTheDocument();

    const primaryCta = screen.getByRole('link', { name: 'Iniciar Transformação' });
    const primaryCtaText = new URL(primaryCta.getAttribute('href') ?? '').searchParams.get('text');
    expect(primaryCtaText).toBe(
      'Olá, Renato! Vim pelo site e gostaria de iniciar minha transformação.',
    );
    expect(primaryCta).toHaveAttribute('target', '_blank');
    expect(primaryCta).toHaveAttribute('data-whatsapp-origin', 'hero');

    expect(screen.getByRole('link', { name: 'Conhecer os planos' })).toHaveAttribute(
      'href',
      '#planos',
    );
  });
});
