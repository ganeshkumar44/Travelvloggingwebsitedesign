import { useState } from 'react';
import { MapPin, Calendar, Clock } from 'lucide-react';
import { Hero } from '../components/Hero';
import { VlogCard } from '../components/VlogCard';
import { AuthorCard } from '../components/AuthorCard';
import { Pagination } from '../components/Pagination';
import { TagList } from '../components/TagList';
import { SocialShare } from '../components/SocialShare';

export default function Vlogs() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 12;

  // Featured Vlog Data (in production, this would come from API)
  const featuredVlog = {
    id: 1,
    title: 'Exploring the Hidden Valleys of the Himalayas',
    description: 'Join me on an incredible journey through the remote valleys of the Himalayas, where we discover ancient monasteries, meet local communities, and witness some of the most breathtaking landscapes on Earth.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video
    thumbnail: 'https://images.unsplash.com/photo-1673505413397-0cd0dc4f5854?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZSUyMGFkdmVudHVyZSUyMGhpa2luZ3xlbnwxfHx8fDE3NzU3MTU2NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'Himalayas, Nepal',
    publishDate: 'April 5, 2026',
    duration: '18:45',
    views: '245K',
    script: `
      <p>The Himalayas have always held a special place in my heart. There's something truly magical about these towering peaks and the rich culture that thrives in their shadow.</p>
      
      <h3>Day 1: Arrival in Kathmandu</h3>
      <p>Our adventure begins in the bustling city of Kathmandu, where ancient temples stand alongside modern buildings. The energy here is palpable – prayer flags flutter in the wind, bells chime from nearby monasteries, and the aroma of traditional Nepali cuisine fills the air.</p>
      
      <h3>Day 2-3: Trek to the Hidden Valley</h3>
      <p>The real journey started when we left the city behind and ventured into the mountains. The trail took us through dense rhododendron forests, across suspension bridges, and past small villages where time seems to stand still. Each step brought us closer to our destination – a remote valley known only to a handful of trekkers.</p>
      
      <h3>Discovering Local Culture</h3>
      <p>What made this trip truly special was the opportunity to connect with the local communities. We were welcomed into their homes, shared meals together, and learned about their way of life. The resilience and warmth of the mountain people left a lasting impression on all of us.</p>
      
      <h3>The Monastery at 4000m</h3>
      <p>At 4000 meters above sea level, we discovered an ancient Buddhist monastery. The monks here have been preserving their traditions for centuries, living in harmony with the harsh mountain environment. Witnessing their morning prayers as the sun rose over the peaks was a moment I'll never forget.</p>
      
      <h3>Final Thoughts</h3>
      <p>This journey reminded me why I started vlogging in the first place. It's not just about the stunning landscapes or the adventure – it's about the connections we make, the stories we share, and the understanding we build between different cultures and ways of life.</p>
    `,
    tags: ['Himalayas', 'Nepal', 'Trekking', 'Adventure', 'Culture', 'Mountains'],
    author: {
      name: 'Alex Thompson',
      avatar: 'https://images.unsplash.com/photo-1760637627993-46adfde446ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjB2bG9nZ2VyJTIwY2FtZXJhJTIwZXF1aXBtZW50fGVufDF8fHx8MTc3NTgwNDU4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      bio: 'Travel Filmmaker & Adventurer exploring the world one destination at a time',
    },
  };

  // Recent Vlogs Data (in production, this would come from API)
  const recentVlogs = [
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
      description: 'Taste your way through Bangkok's vibrant street food scene and learn about Thai cuisine from local vendors.',
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
        image="https://images.unsplash.com/photo-1760637627993-46adfde446ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjB2bG9nZ2VyJTIwY2FtZXJhJTIwZXF1aXBtZW50fGVufDF8fHx8MTc3NTgwNDU4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        title="Travel Vlogs"
        subtitle="Watch my adventures from around the world and get inspired for your next journey"
      />

      {/* Featured Vlog Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Video Player */}
          <div className="mb-8">
            <div className="aspect-video bg-[var(--gray-light)] rounded-xl overflow-hidden" style={{ boxShadow: 'var(--shadow-lg)' }}>
              <iframe
                width="100%"
                height="100%"
                src={featuredVlog.videoUrl}
                title={featuredVlog.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>

          {/* Vlog Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl mb-4 text-[var(--foreground)]" style={{ fontWeight: 'var(--font-weight-bold)' }}>
              {featuredVlog.title}
            </h1>
            <p className="text-lg text-[var(--gray-dark)] mb-6">
              {featuredVlog.description}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-[var(--gray-medium)] mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{featuredVlog.publishDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{featuredVlog.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[var(--primary)]" />
                <span className="text-[var(--foreground)]">{featuredVlog.location}</span>
              </div>
              <div>
                <span>{featuredVlog.views} views</span>
              </div>
            </div>

            {/* Social Share */}
            <div className="mb-8">
              <SocialShare title={featuredVlog.title} />
            </div>

            {/* Tags */}
            <TagList tags={featuredVlog.tags} />
          </div>

          {/* Author Section */}
          <div className="mb-8">
            <AuthorCard
              name={featuredVlog.author.name}
              avatar={featuredVlog.author.avatar}
              bio={featuredVlog.author.bio}
            />
          </div>

          {/* Vlog Script/Content */}
          <div className="bg-[var(--muted)] rounded-xl p-8 border border-[var(--border)]">
            <h2 className="text-2xl mb-6 text-[var(--foreground)]" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
              About This Vlog
            </h2>
            <div
              className="prose prose-lg max-w-none text-[var(--gray-dark)]"
              dangerouslySetInnerHTML={{ __html: featuredVlog.script }}
              style={{ lineHeight: '1.8' }}
            />
          </div>
        </div>
      </section>

      {/* Pagination */}
      <section className="py-8 bg-[var(--gray-light)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </section>

      {/* Recent Vlogs Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl mb-4 text-[var(--foreground)]" style={{ fontWeight: 'var(--font-weight-bold)' }}>
              Recent Vlogs
            </h2>
            <p className="text-lg text-[var(--gray-dark)] max-w-3xl mx-auto">
              Explore my latest adventures and travel experiences from around the world
            </p>
          </div>

          {/* Vlog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentVlogs.map((vlog) => (
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
                  // In production, this would navigate to the individual vlog page
                  console.log('Navigate to vlog:', vlog.id);
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
