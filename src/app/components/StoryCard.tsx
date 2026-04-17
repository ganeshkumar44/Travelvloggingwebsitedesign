import React from "react";
import { Calendar, BookOpen } from 'lucide-react';
import { Button } from './Button';
import { cn } from './ui/utils';

export interface StoryCardProps {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
  publishDate: string;
  readTime?: string;
  className?: string;
  onClick?: () => void;
}

export function StoryCard({
  thumbnail,
  title,
  description,
  publishDate,
  readTime,
  className,
  onClick,
}: StoryCardProps) {
  return (
    <div
      className={cn(
        'group cursor-pointer bg-white rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2',
        className
      )}
      style={{ boxShadow: 'var(--shadow-md)' }}
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--gray-light)]">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {readTime && (
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-[var(--foreground)] px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            {readTime}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl mb-2 text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-[var(--gray-dark)] mb-4 line-clamp-3">{description}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm text-[var(--gray-medium)]">
            <Calendar className="w-4 h-4" />
            <span>{publishDate}</span>
          </div>
        </div>

        <Button variant="primary" size="sm" className="w-full">
          <BookOpen className="w-4 h-4" />
          Read Story
        </Button>
      </div>
    </div>
  );
}
