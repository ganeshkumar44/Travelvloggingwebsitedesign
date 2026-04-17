import React from "react";

import { cn } from './ui/utils';

export interface AuthorCardProps {
  name: string;
  avatar: string;
  bio: string;
  className?: string;
}

export function AuthorCard({ name, avatar, bio, className }: AuthorCardProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-4 p-6 bg-[var(--muted)] rounded-lg border border-[var(--border)]',
        className
      )}
    >
      <img
        src={avatar}
        alt={name}
        className="w-16 h-16 rounded-full object-cover border-2 border-[var(--primary)]"
      />
      <div>
        <h4 className="text-lg mb-1 text-[var(--foreground)]">{name}</h4>
        <p className="text-sm text-[var(--gray-dark)]">{bio}</p>
      </div>
    </div>
  );
}
