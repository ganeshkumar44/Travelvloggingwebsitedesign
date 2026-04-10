import { Calendar, Play } from 'lucide-react';
import { Button } from './Button';
import { cn } from './ui/utils';

export interface VlogCardProps {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
  publishDate: string;
  duration?: string;
  views?: string;
  className?: string;
  onClick?: () => void;
}

export function VlogCard({
  thumbnail,
  title,
  description,
  publishDate,
  duration,
  views,
  className,
  onClick,
}: VlogCardProps) {
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
      <div className="relative aspect-video overflow-hidden bg-[var(--gray-light)]">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-[var(--primary)] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100">
            <Play className="w-8 h-8 text-white ml-1" />
          </div>
        </div>
        {duration && (
          <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm">
            {duration}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl mb-2 text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-[var(--gray-dark)] mb-4 line-clamp-3">{description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-[var(--gray-medium)]">
            <Calendar className="w-4 h-4" />
            <span>{publishDate}</span>
          </div>
          {views && (
            <span className="text-sm text-[var(--gray-medium)]">{views} views</span>
          )}
        </div>

        <div className="mt-4">
          <Button variant="primary" size="sm" className="w-full">
            <Play className="w-4 h-4" />
            Watch Now
          </Button>
        </div>
      </div>
    </div>
  );
}
