import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

it('renders the Next.js logo', () => {
  render(<Home />);
  const nextLogo = screen.getByAltText('Next.js Logo');
  expect(nextLogo).toBeInTheDocument();
});

it('renders the Vercel logo', () => {
  render(<Home />);
  const vercelLogo = screen.getByAltText('Vercel Logo');
  expect(vercelLogo).toBeInTheDocument();
});

