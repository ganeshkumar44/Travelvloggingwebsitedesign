import { Tag } from 'lucide-react';
import { cn } from './ui/utils';

export interface TagListProps {
  tags: string[];
  className?: string;
}

export function TagList({ tags, className }: TagListProps) {
  return (
    <div className={cn('flex items-start gap-3', className)}>
      <Tag className="w-5 h-5 text-[var(--primary)] mt-1 flex-shrink-0" />
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-[var(--muted)] text-[var(--gray-dark)] rounded-full text-sm border border-[var(--border)] hover:bg-[var(--primary)] hover:text-white transition-colors duration-200 cursor-pointer"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
