import { useState } from 'react';
import { Hero } from '../components/Hero';
import { Section } from '../components/Section';
import { Search, X } from 'lucide-react';
import Masonry from 'react-responsive-masonry';
import { cn } from '../components/ui/utils';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState<'all' | 'images' | 'videos'>('all');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'beaches', label: 'Beaches' },
    { id: 'mountains', label: 'Mountains' },
    { id: 'cities', label: 'Cities' },
    { id: 'adventure', label: 'Adventure' },
    { id: 'food', label: 'Food' },
    { id: 'culture', label: 'Culture' },
  ];

  const galleryItems = [
    {
      id: 1,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1611395813517-41f9be5e292d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXJpYWwlMjB0cm9waWNhbCUyMGJlYWNoJTIwdHVycXVvaXNlfGVufDF8fHx8MTc3NTYyMzk5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'beaches',
      title: 'Maldives Paradise',
      location: 'Maldives',
    },
    {
      id: 2,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1575675416024-1db87a987c71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHBlYWslMjBhZHZlbnR1cmUlMjBzdW5zZXR8ZW58MXx8fHwxNzc1NjIzOTk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'mountains',
      title: 'Alpine Sunset',
      location: 'Swiss Alps',
    },
    {
      id: 3,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1525081154077-09c42762162e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwY2l0eXNjYXBlJTIwdHJhdmVsfGVufDF8fHx8MTc3NTYyMzk5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'cities',
      title: 'Ancient Rome',
      location: 'Rome, Italy',
    },
    {
      id: 4,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1601572490560-03d6a4f99377?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrcGFja2VyJTIwaGlraW5nJTIwYWR2ZW50dXJlfGVufDF8fHx8MTc3NTYyMzk5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'adventure',
      title: 'Mountain Trekking',
      location: 'Nepal',
    },
    {
      id: 5,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1544717821-443b7051bf5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBmb29kJTIwbWFya2V0JTIwYXNpYXxlbnwxfHx8fDE3NzU2MjM5OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'food',
      title: 'Street Food Market',
      location: 'Bangkok, Thailand',
    },
    {
      id: 6,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1765845399332-af5e3cb9b0e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGZlc3RpdmFsJTIwY29sb3JmdWx8ZW58MXx8fHwxNzc1NjIzOTk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'culture',
      title: 'Cultural Festival',
      location: 'India',
    },
    {
      id: 7,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1581665334521-ac9a6f6b4be1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwdGVtcGxlJTIwdHJhdmVsfGVufDF8fHx8MTc3NTYyMzk5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'culture',
      title: 'Temple Architecture',
      location: 'Bali, Indonesia',
    },
    {
      id: 8,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1585424483885-79f95609920f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXRhZ29uaWElMjBsYW5kc2NhcGUlMjBnbGFjaWVyfGVufDF8fHx8MTc3NTYyMzk5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'mountains',
      title: 'Patagonia Glacier',
      location: 'Chile',
    },
    {
      id: 9,
      type: 'video',
      url: 'https://images.unsplash.com/photo-1585085007341-a5aadf6e48e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMG5pZ2h0JTIwY2l0eXNjYXBlfGVufDF8fHx8MTc3NTU5MTE1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'cities',
      title: 'Tokyo Nights',
      location: 'Tokyo, Japan',
      duration: '4:32',
    },
    {
      id: 10,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1676730056228-7e38cbb88edc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW50b3JpbmklMjBncmVlY2UlMjBzdW5zZXR8ZW58MXx8fHwxNzc1NjA5NzQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'beaches',
      title: 'Santorini Sunset',
      location: 'Santorini, Greece',
    },
    {
      id: 11,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1729359035276-189519a4b072?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZhcmklMjB3aWxkbGlmZSUyMGFmcmljYXxlbnwxfHx8fDE3NzU1ODM1Njd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'adventure',
      title: 'African Safari',
      location: 'Kenya',
    },
    {
      id: 12,
      type: 'video',
      url: 'https://images.unsplash.com/photo-1648607560570-4ee80c5914c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J0aGVybiUyMGxpZ2h0cyUyMGF1cm9yYXxlbnwxfHx8fDE3NzU1MjM2ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'adventure',
      title: 'Northern Lights',
      location: 'Iceland',
      duration: '6:15',
    },
    {
      id: 13,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1743449203926-4f05108c60ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBkdW5lcyUyMHNhaGFyYXxlbnwxfHx8fDE3NzU2MjQwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'adventure',
      title: 'Sahara Desert',
      location: 'Morocco',
    },
    {
      id: 14,
      type: 'video',
      url: 'https://images.unsplash.com/photo-1659856233753-7ddf7d3fa8d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjB2bG9nZ2VyJTIwY2FtZXJhfGVufDF8fHx8MTc3NTYyMzk5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'culture',
      title: 'Behind The Scenes',
      location: 'Various',
      duration: '8:42',
    },
    {
      id: 15,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1746309641900-642b45ebecc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBsYW5kc2NhcGUlMjB3YW5kZXJsdXN0fGVufDF8fHx8MTc3NTYyNDAwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'mountains',
      title: 'Mountain Vista',
      location: 'New Zealand',
    },
  ];

  const filteredItems = galleryItems.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesMedia = selectedMedia === 'all' || item.type === selectedMedia;
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesMedia && matchesSearch;
  });

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <Hero
        image="https://images.unsplash.com/photo-1659856233753-7ddf7d3fa8d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjB2bG9nZ2VyJTIwY2FtZXJhfGVufDF8fHx8MTc3NTYyMzk5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        title="Travel Gallery"
        subtitle="A visual journey through my adventures around the world"
        height="medium"
      />

      {/* Filters and Search */}
      <Section>
        <div className="mb-8">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--gray-medium)]" />
            <input
              type="text"
              placeholder="Search by location or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-[var(--border)] bg-white focus:outline-none focus:border-[var(--primary)] transition-colors"
            />
          </div>

          {/* Media Type Tabs */}
          <div className="flex justify-center gap-2 mb-6">
            {['all', 'images', 'videos'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedMedia(type as typeof selectedMedia)}
                className={cn(
                  'px-6 py-2 rounded-lg transition-all capitalize',
                  selectedMedia === type
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-white border border-[var(--border)] text-[var(--gray-dark)] hover:border-[var(--primary)]'
                )}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  'px-6 py-2 rounded-full transition-all',
                  selectedCategory === category.id
                    ? 'bg-[var(--primary)] text-white shadow-md'
                    : 'bg-white border border-[var(--border)] text-[var(--gray-dark)] hover:border-[var(--primary)] hover:text-[var(--primary)]'
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredItems.length > 0 ? (
          <Masonry columnsCount={3} gutter="24px" className="masonry-grid">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="relative group cursor-pointer overflow-hidden rounded-xl"
                style={{ boxShadow: 'var(--shadow-lg)' }}
                onClick={() => item.type === 'image' && setLightboxImage(item.url)}
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-lg mb-1">{item.title}</h3>
                    <p className="text-sm text-white/80">{item.location}</p>
                  </div>
                  {item.type === 'video' && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                        <div className="w-0 h-0 border-l-[16px] border-l-[var(--primary)] border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1" />
                      </div>
                    </div>
                  )}
                </div>
                {item.type === 'video' && item.duration && (
                  <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm">
                    {item.duration}
                  </div>
                )}
              </div>
            ))}
          </Masonry>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-[var(--gray-dark)]">No items found matching your filters.</p>
          </div>
        )}
      </Section>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={() => setLightboxImage(null)}
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={lightboxImage}
            alt="Lightbox"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
