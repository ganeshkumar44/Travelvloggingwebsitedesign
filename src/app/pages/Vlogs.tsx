import { useState } from 'react';
import { Hero } from '../components/Hero';
import { VlogCard } from '../components/VlogCard';
import { Pagination } from '../components/Pagination';

export default function Vlogs() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 12;

  // YouTube Vlogs Data (in production, this would come from API)
  const vlogs = [
    {
      id: 1,
      thumbnail: 'https://images.unsplash.com/photo-1673505413397-0cd0dc4f5854?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZSUyMGFkdmVudHVyZSUyMGhpa2luZ3xlbnwxfHx8fDE3NzU3MTU2NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Exploring the Hidden Valleys of the Himalayas',
      description: 'Join me on an incredible journey through the remote valleys of the Himalayas, where we discover ancient monasteries and breathtaking landscapes.',
      publishDate: 'April 5, 2026',
      duration: '18:45',
      views: '245K',
    },
    {
      id: 2,
      thumbnail: 'https://images.unsplash.com/photo-1631535152690-ba1a85229136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwc3Vuc2V0JTIwb2NlYW58ZW58MXx8fHwxNzc1ODA0NTg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Paradise Found: Island Hopping in the Maldives',
      description: 'Discover pristine beaches, vibrant coral reefs, and luxurious overwater bungalows in this tropical paradise.',
      publishDate: 'March 28, 2026',
      duration: '15:30',
      views: '189K',
    },
    {
      id: 3,
      thumbnail: 'https://images.unsplash.com/photo-1620246496862-0363c08f548e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldXJvcGVhbiUyMGNpdHklMjBhcmNoaXRlY3R1cmUlMjB0b3VyaXNtfGVufDF8fHx8MTc3NTcyMzY2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'A Week in Prague: Hidden Gems & Local Experiences',
      description: 'Explore the enchanting streets of Prague beyond the tourist hotspots and discover authentic Czech culture.',
      publishDate: 'March 15, 2026',
      duration: '22:10',
      views: '312K',
    },
    {
      id: 4,
      thumbnail: 'https://images.unsplash.com/photo-1766215572118-2bc2210729af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHN0cmVldCUyMG1hcmtldCUyMGN1bHR1cmV8ZW58MXx8fHwxNzc1ODA0NTg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Bangkok Street Food Tour: A Culinary Adventure',
      description: 'Taste your way through Bangkok\'s vibrant street food scene and learn about Thai cuisine from local vendors.',
      publishDate: 'February 28, 2026',
      duration: '19:45',
      views: '267K',
    },
    {
      id: 5,
      thumbnail: 'https://images.unsplash.com/photo-1669024513552-56127b2d0d85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBzYW5kJTIwZHVuZXMlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzc1NzI2NjgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Into the Sahara: Desert Adventure in Morocco',
      description: 'Experience the magic of the Sahara Desert with camel treks, starlit camping, and Berber hospitality.',
      publishDate: 'February 12, 2026',
      duration: '25:00',
      views: '198K',
    },
    {
      id: 6,
      thumbnail: 'https://images.unsplash.com/photo-1673505413397-0cd0dc4f5854?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZSUyMGFkdmVudHVyZSUyMGhpa2luZ3xlbnwxfHx8fDE3NzU3MTU2NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Swiss Alps Winter Wonderland: Skiing & Scenery',
      description: 'Join me for an exhilarating winter adventure in the Swiss Alps with world-class skiing and cozy mountain villages.',
      publishDate: 'January 25, 2026',
      duration: '17:20',
      views: '221K',
    },
    {
      id: 7,
      thumbnail: 'https://images.unsplash.com/photo-1631535152690-ba1a85229136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwc3Vuc2V0JTIwb2NlYW58ZW58MXx8fHwxNzc1ODA0NTg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Bali Bliss: Temples, Rice Terraces & Beach Life',
      description: 'Discover the spiritual beauty of Bali through its ancient temples, stunning rice terraces, and pristine beaches.',
      publishDate: 'January 10, 2026',
      duration: '20:15',
      views: '345K',
    },
    {
      id: 8,
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHBlYWslMjBzdW5yaXNlfGVufDF8fHx8MTc3NTgwNDU4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'New Zealand Road Trip: From Mountains to Coast',
      description: 'Epic road trip across New Zealand\'s South Island featuring stunning fjords, alpine peaks, and adventure activities.',
      publishDate: 'December 28, 2025',
      duration: '24:30',
      views: '412K',
    },
    {
      id: 9,
      thumbnail: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW50b3JpbmklMjBncmVlY2UlMjBpc2xhbmR8ZW58MXx8fHwxNzc1ODA0NTg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Santorini Sunsets: A Greek Island Dream',
      description: 'Experience the magic of Santorini with its iconic white-washed buildings, stunning sunsets, and Mediterranean charm.',
      publishDate: 'December 15, 2025',
      duration: '16:40',
      views: '298K',
    },
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // In production, this would trigger an API call to fetch new vlogs
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-20 bg-[var(--background)]">
      {/* Hero Section */}
      <Hero
        image="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3V0dWJlJTIwdmlkZW8lMjBjYW1lcmElMjB2bG9nfGVufDF8fHx8MTc3NTgwNDU4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        title="YouTube Vlogs"
        subtitle="Watch my travel adventures and explore the world through cinematic storytelling"
      />

      {/* Vlogs Grid Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl mb-4 text-[var(--foreground)]" style={{ fontWeight: 'var(--font-weight-bold)' }}>
              Latest Travel Vlogs
            </h2>
            <p className="text-lg text-[var(--gray-dark)] max-w-3xl mx-auto">
              Discover my latest YouTube travel vlogs and get inspired for your next adventure
            </p>
          </div>

          {/* Vlog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vlogs.map((vlog) => (
              <VlogCard
                key={vlog.id}
                id={vlog.id}
                thumbnail={vlog.thumbnail}
                title={vlog.title}
                description={vlog.description}
                publishDate={vlog.publishDate}
                duration={vlog.duration}
                views={vlog.views}
                onClick={() => {
                  // In production, this would navigate to the individual vlog page or YouTube video
                  console.log('Navigate to vlog:', vlog.id);
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pagination */}
      <section className="py-8 bg-[var(--gray-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
    </div>
  );
}
