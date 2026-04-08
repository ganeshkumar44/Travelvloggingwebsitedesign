import { ReactNode } from 'react';
import { cn } from './ui/utils';

interface SectionProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  background?: 'white' | 'gray' | 'dark';
}

export function Section({
  title,
  subtitle,
  children,
  className,
  background = 'white',
}: SectionProps) {
  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-[var(--gray-light)]',
    dark: 'bg-[var(--charcoal)] text-white',
  };

  return (
    <section className={cn('py-16 md:py-24', backgrounds[background], className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="text-center mb-12 md:mb-16">
            {title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4" style={{ fontWeight: 'var(--font-weight-bold)' }}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg md:text-xl text-[var(--gray-dark)] max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
