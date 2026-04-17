import React from "react";
import { ReactNode } from 'react';
import { cn } from './ui/utils';

interface TravelCardProps {
  image: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  imageClassName?: string;
  onClick?: () => void;
}

export function TravelCard({
  image,
  title,
  description,
  children,
  className,
  imageClassName,
  onClick,
}: TravelCardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer group',
        className
      )}
      onClick={onClick}
      style={{ boxShadow: 'var(--shadow-lg)' }}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={image}
          alt={title}
          className={cn(
            'w-full h-full object-cover transition-transform duration-500 group-hover:scale-110',
            imageClassName
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6">
        <h3 className="text-xl mb-2 text-[var(--charcoal)]">{title}</h3>
        {description && (
          <p className="text-[var(--gray-dark)] mb-4 line-clamp-3">{description}</p>
        )}
        {children}
      </div>
    </div>
  );
}
