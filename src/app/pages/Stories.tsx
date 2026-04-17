import React from "react";
import { useState } from 'react';
import { MapPin, Calendar, BookOpen } from 'lucide-react';
import { Hero } from '../components/Hero';
import { StoryCard } from '../components/StoryCard';
import { AuthorCard } from '../components/AuthorCard';
import { Pagination } from '../components/Pagination';
import { TagList } from '../components/TagList';
import { SocialShare } from '../components/SocialShare';

export default function Stories() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 15;

  // Featured Story Data (in production, this would come from API)
  const featuredStory = {
    id: 1,
    title: 'The Midnight Sun: A Journey Through Norway\'s Arctic Circle',
    description: 'Experience the magic of the land where the sun never sets, exploring the stunning fjords, vibrant Nordic culture, and the incredible natural phenomenon of the midnight sun.',
    thumbnail: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J3YXklMjBmaW9yZCUyMG1pZG5pZ2h0JTIwc3VufGVufDF8fHx8MTc3NTgwNDU4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    location: 'Tromsø, Norway',
    publishDate: 'April 8, 2026',
    readTime: '12 min read',
    content: `
      <p>There's something surreal about standing under the golden glow of the sun at midnight. As I watched it hover just above the horizon, painting the Norwegian fjords in warm hues of amber and gold, I realized I was experiencing one of nature's most extraordinary phenomena – the midnight sun.</p>

      <h3>Arrival in Tromsø</h3>
      <p>My journey began in Tromsø, often called the "Gateway to the Arctic." This vibrant city, located 350 kilometers north of the Arctic Circle, transforms during the summer months when the sun refuses to set. The energy here is palpable – locals and visitors alike embrace the endless daylight, making the most of every luminous moment.</p>

      <p>Walking through the city's colorful wooden houses, I was struck by how the architecture seemed designed to capture and reflect the perpetual sunlight. Each building told a story of resilience and adaptation to life in the far north.</p>

      <h3>Into the Fjords</h3>
      <p>The real magic began when I ventured into the surrounding fjords. Steep mountains rise dramatically from crystal-clear waters, creating a landscape so pristine it feels untouched by time. I joined a small boat tour that wound through narrow waterways, past cascading waterfalls and colonies of seabirds nesting on rocky cliffs.</p>

      <p>Our guide, a third-generation fisherman named Lars, shared stories of his family's connection to these waters. "The midnight sun is in our blood," he said, gesturing to the glowing horizon. "It's a time when we feel most alive, most connected to this land."</p>

      <h3>Sami Culture and Traditions</h3>
      <p>No visit to Arctic Norway would be complete without learning about the indigenous Sami people, who have called this region home for thousands of years. I had the privilege of visiting a Sami camp, where I learned about their rich traditions of reindeer herding, handicrafts, and deep spiritual connection to the land.</p>

      <p>Around a campfire that seemed unnecessary in the bright midnight hours, elders shared stories passed down through generations. They spoke of how the midnight sun was seen as a blessing, a time when the spirits of nature were most active and benevolent.</p>

      <h3>Hiking Under the Midnight Sun</h3>
      <p>One of my most memorable experiences was a midnight hike to the summit of Tromsdalstinden. Starting the ascent at 10 PM felt strange at first – my body expected darkness, but the landscape was bathed in soft, golden light. As we climbed higher, the view became increasingly spectacular.</p>

      <p>Reaching the summit just after midnight, I stood 1,238 meters above sea level, surrounded by an endless panorama of mountains, fjords, and islands, all illuminated by the sun that hung stubbornly in the northern sky. Time felt suspended, irrelevant. In that moment, I understood why so many travelers make the pilgrimage to witness this phenomenon.</p>

      <h3>The Wildlife Experience</h3>
      <p>The midnight sun transforms the behavior of Arctic wildlife. Seabirds remain active around the clock, their cries echoing across the water. I was fortunate enough to spot orcas during a whale-watching expedition – these magnificent creatures seemed to revel in the extended daylight, breaching and playing in the golden waters.</p>

      <p>Even the Arctic foxes and reindeer I encountered seemed energized by the endless day, foraging and moving about at hours when, elsewhere in the world, they would be sleeping.</p>

      <h3>Reflections on Endless Day</h3>
      <p>Living under the midnight sun for several days had a profound effect on my perception of time. Without the natural rhythm of day and night, I found myself becoming more attuned to my body's needs rather than the clock. I slept when tired, ate when hungry, and explored when inspired – a freedom that felt both liberating and slightly disorienting.</p>

      <p>The locals have adapted remarkably to this phenomenon. They install blackout curtains in their homes, maintain regular schedules despite the sun's position, and take full advantage of the extended outdoor hours. Yet they also acknowledge the challenges – some struggle with sleep, while others experience a surge of creativity and energy.</p>

      <h3>A Journey Worth Taking</h3>
      <p>As I prepared to leave Tromsø, I realized that the midnight sun is more than just a natural phenomenon – it's a portal to a different way of experiencing the world. It challenges our assumptions about time, nature, and the rhythms we've built our lives around.</p>

      <p>To anyone considering this journey: go. Stand under that eternal sun. Let it reshape your understanding of what's possible. Watch it paint the fjords in colors you've never seen before. And in those golden midnight hours, you might just discover something profound about yourself and your place in this vast, mysterious world.</p>

      <p>The land of the midnight sun doesn't just show you a phenomenon – it invites you to experience wonder in its purest form. And that, more than anything, is worth the journey north.</p>
    `,
    tags: ['Norway', 'Arctic Circle', 'Midnight Sun', 'Fjords', 'Nordic Culture', 'Adventure'],
    author: {
      name: 'Sarah Mitchell',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NTgwNDU4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      bio: 'Adventure Writer & Photographer capturing stories from the world\'s most remote corners',
    },
  };

  // Recent Stories Data (in production, this would come from API)
  const recentStories = [
    {
      id: 2,
      thumbnail: 'https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbiUyMHRlbXBsZSUyMGN1bHR1cmV8ZW58MXx8fHwxNzc1ODA0NTg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Finding Zen: A Month in Japan\'s Ancient Temples',
      description: 'Immerse yourself in the spiritual heart of Japan as we explore centuries-old temples, practice meditation with Buddhist monks, and discover the art of mindfulness.',
      publishDate: 'April 1, 2026',
      readTime: '10 min read',
    },
    {
      id: 3,
      thumbnail: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWhhcmElMjBkZXNlcnQlMjBkdW5lcyUyMHNhbmR8ZW58MXx8fHwxNzc1ODA0NTg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Sahara Stories: Nights Under a Billion Stars',
      description: 'Journey deep into the world\'s largest hot desert, where nomadic traditions meet endless horizons and every sunset is a masterpiece.',
      publishDate: 'March 25, 2026',
      readTime: '15 min read',
    },
    {
      id: 4,
      thumbnail: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwcmljZSUyMHRlcnJhY2VzJTIwdHJvcGljYWx8ZW58MXx8fHwxNzc1ODA0NTg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Bali Beyond the Beaches: Rice Terraces and Sacred Sites',
      description: 'Venture beyond Bali\'s famous shores to discover ancient rice terraces, hidden waterfalls, and spiritual ceremonies that have endured for centuries.',
      publishDate: 'March 18, 2026',
      readTime: '8 min read',
    },
    {
      id: 5,
      thumbnail: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXRhZ29uaWElMjBtb3VudGFpbnMlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzc1ODA0NTg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Patagonia\'s Wild Heart: Trekking the End of the World',
      description: 'Trek through one of Earth\'s last great wildernesses, where glaciers meet mountains and every step reveals untamed beauty.',
      publishDate: 'March 5, 2026',
      readTime: '14 min read',
    },
    {
      id: 6,
      thumbnail: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2VsYW5kJTIwd2F0ZXJmYWxsJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc3NTgwNDU4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Iceland\'s Ring Road: Fire, Ice, and Everything Nice',
      description: 'Complete the iconic Ring Road circuit, encountering volcanic landscapes, powerful waterfalls, and the otherworldly beauty of Iceland.',
      publishDate: 'February 20, 2026',
      readTime: '11 min read',
    },
    {
      id: 7,
      thumbnail: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMHRlbXBsZSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzU4MDQ1ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'India Unveiled: Chaos, Color, and Spiritual Awakening',
      description: 'Navigate the sensory overload of India\'s ancient cities, finding profound moments of peace amid the beautiful chaos.',
      publishDate: 'February 8, 2026',
      readTime: '13 min read',
    },
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // In production, this would trigger an API call to fetch new stories
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-20 bg-[var(--background)]">
      {/* Hero Section */}
      <Hero
        image="https://images.unsplash.com/photo-1455849318743-b2233052fcff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3cml0aW5nJTIwam91cm5hbCUyMHRyYXZlbCUyMHN0b3J5fGVufDF8fHx8MTc3NTgwNDU4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        title="Travel Stories"
        subtitle="Immerse yourself in captivating narratives from around the globe"
      />

      {/* Featured Story Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Image/Video Area */}
          <div className="mb-8">
            <div className="aspect-video bg-[var(--gray-light)] rounded-xl overflow-hidden" style={{ boxShadow: 'var(--shadow-lg)' }}>
              <img
                src={featuredStory.thumbnail}
                alt={featuredStory.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Story Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl mb-4 text-[var(--foreground)]" style={{ fontWeight: 'var(--font-weight-bold)' }}>
              {featuredStory.title}
            </h1>
            <p className="text-lg text-[var(--gray-dark)] mb-6">
              {featuredStory.description}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-[var(--gray-medium)] mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{featuredStory.publishDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                <span>{featuredStory.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[var(--primary)]" />
                <span className="text-[var(--foreground)]">{featuredStory.location}</span>
              </div>
            </div>

            {/* Social Share */}
            <div className="mb-8">
              <SocialShare title={featuredStory.title} />
            </div>

            {/* Tags */}
            <TagList tags={featuredStory.tags} />
          </div>

          {/* Author Section */}
          <div className="mb-8">
            <AuthorCard
              name={featuredStory.author.name}
              avatar={featuredStory.author.avatar}
              bio={featuredStory.author.bio}
            />
          </div>

          {/* Story Content */}
          <div className="bg-[var(--muted)] rounded-xl p-8 border border-[var(--border)]">
            <h2 className="text-2xl mb-6 text-[var(--foreground)]" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
              The Story
            </h2>
            <div
              className="prose prose-lg max-w-none text-[var(--gray-dark)]"
              dangerouslySetInnerHTML={{ __html: featuredStory.content }}
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

      {/* Recent Stories Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl mb-4 text-[var(--foreground)]" style={{ fontWeight: 'var(--font-weight-bold)' }}>
              Recent Stories
            </h2>
            <p className="text-lg text-[var(--gray-dark)] max-w-3xl mx-auto">
              Explore more captivating travel narratives and adventures from around the world
            </p>
          </div>

          {/* Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentStories.map((story) => (
              <StoryCard
                key={story.id}
                id={story.id}
                thumbnail={story.thumbnail}
                title={story.title}
                description={story.description}
                publishDate={story.publishDate}
                readTime={story.readTime}
                onClick={() => {
                  // In production, this would navigate to the individual story page
                  console.log('Navigate to story:', story.id);
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
