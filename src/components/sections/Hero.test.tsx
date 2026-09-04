import { render, screen } from '@testing-library/react';
import type { ImgHTMLAttributes } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Hero } from './Hero';
import { heroContent } from '@/content/home';

vi.mock('next/image', () => ({
  default: ({ alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) => <img alt={alt} {...props} />,
}));

describe('Hero', () => {
  it('renders the hero badge, headline and call to action buttons', () => {
    render(<Hero />);

    expect(screen.getByText(heroContent.badgeLabel)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: /resultado não vem do acaso/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: heroContent.primaryCtaLabel })).toHaveAttribute(
      'href',
      heroContent.primaryCtaHref,
    );
    expect(screen.getByRole('link', { name: heroContent.secondaryCtaLabel })).toHaveAttribute(
      'href',
      '#planos',
    );
  });
});
