import { ReactNode } from 'react';
import { cn } from './ui/utils';

interface HeroProps {
  image: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  height?: 'small' | 'medium' | 'large';
  overlay?: 'light' | 'medium' | 'dark';
}

export function Hero({
  image,
  title,
  subtitle,
  children,
  height = 'large',
  overlay = 'medium',
}: HeroProps) {
  const heights = {
    small: 'h-[50vh] min-h-[400px]',
    medium: 'h-[60vh] min-h-[500px]',
    large: 'h-[90vh] min-h-[600px]',
  };

  const overlays = {
    light: 'bg-black/30',
    medium: 'bg-black/50',
    dark: 'bg-black/70',
  };

  return (
    <div className={cn('relative w-full', heights[height])}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className={cn('absolute inset-0', overlays[overlay])} />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-7xl text-white mb-6 animate-fade-in" style={{ fontWeight: 'var(--font-weight-bold)' }}>
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
