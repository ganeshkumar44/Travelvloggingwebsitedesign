import { Facebook, Twitter, Linkedin, Link2, Share2 } from 'lucide-react';
import { cn } from './ui/utils';

export interface SocialShareProps {
  url?: string;
  title?: string;
  className?: string;
}

export function SocialShare({ url, title, className }: SocialShareProps) {
  const shareUrl = url || window.location.href;
  const shareTitle = title || document.title;

  const handleShare = (platform: string) => {
    let shareLink = '';
    
    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
        return;
    }
    
    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="flex items-center gap-2 text-[var(--gray-dark)]">
        <Share2 className="w-5 h-5" />
        <span className="text-sm font-medium">Share:</span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => handleShare('facebook')}
          className="w-10 h-10 rounded-full bg-[var(--muted)] text-[var(--gray-dark)] hover:bg-[#1877F2] hover:text-white flex items-center justify-center transition-all duration-200 border border-[var(--border)] hover:border-[#1877F2]"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleShare('twitter')}
          className="w-10 h-10 rounded-full bg-[var(--muted)] text-[var(--gray-dark)] hover:bg-[#1DA1F2] hover:text-white flex items-center justify-center transition-all duration-200 border border-[var(--border)] hover:border-[#1DA1F2]"
          aria-label="Share on Twitter"
        >
          <Twitter className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleShare('linkedin')}
          className="w-10 h-10 rounded-full bg-[var(--muted)] text-[var(--gray-dark)] hover:bg-[#0A66C2] hover:text-white flex items-center justify-center transition-all duration-200 border border-[var(--border)] hover:border-[#0A66C2]"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleShare('copy')}
          className="w-10 h-10 rounded-full bg-[var(--muted)] text-[var(--gray-dark)] hover:bg-[var(--primary)] hover:text-white flex items-center justify-center transition-all duration-200 border border-[var(--border)] hover:border-[var(--primary)]"
          aria-label="Copy link"
        >
          <Link2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
