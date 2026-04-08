import { Play, MapPin, Star } from 'lucide-react';
import { Hero } from '../components/Hero';
import { Section } from '../components/Section';
import { TravelCard } from '../components/TravelCard';
import { Button } from '../components/Button';
import { Link } from 'react-router';

export default function Home() {
  const destinations = [
    {
      id: 1,
      title: 'Bali, Indonesia',
      location: 'Southeast Asia',
      image: 'https://images.unsplash.com/photo-1581665334521-ac9a6f6b4be1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwdGVtcGxlJTIwdHJhdmVsfGVufDF8fHx8MTc3NTYyMzk5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Discover ancient temples, lush rice terraces, and pristine beaches in this tropical paradise.',
    },
    {
      id: 2,
      title: 'Santorini, Greece',
      location: 'Europe',
      image: 'https://images.unsplash.com/photo-1676730056228-7e38cbb88edc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW50b3JpbmklMjBncmVlY2UlMjBzdW5zZXR8ZW58MXx8fHwxNzc1NjA5NzQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Experience stunning sunsets, white-washed buildings, and crystal-clear Aegean waters.',
    },
    {
      id: 3,
      title: 'Patagonia, Chile',
      location: 'South America',
      image: 'https://images.unsplash.com/photo-1585424483885-79f95609920f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXRhZ29uaWElMjBsYW5kc2NhcGUlMjBnbGFjaWVyfGVufDF8fHx8MTc3NTYyMzk5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Explore glaciers, towering peaks, and the untamed wilderness of South America.',
    },
    {
      id: 4,
      title: 'Tokyo, Japan',
      location: 'East Asia',
      image: 'https://images.unsplash.com/photo-1585085007341-a5aadf6e48e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMG5pZ2h0JTIwY2l0eXNjYXBlfGVufDF8fHx8MTc3NTU5MTE1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Immerse yourself in the perfect blend of ancient traditions and modern technology.',
    },
  ];

  const videos = [
    {
      id: 1,
      title: 'Island Hopping in the Maldives',
      thumbnail: 'https://images.unsplash.com/photo-1611395813517-41f9be5e292d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXJpYWwlMjB0cm9waWNhbCUyMGJlYWNoJTIwdHVycXVvaXNlfGVufDF8fHx8MTc3NTYyMzk5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      duration: '12:45',
      views: '245K',
    },
    {
      id: 2,
      title: 'Hiking the Swiss Alps',
      thumbnail: 'https://images.unsplash.com/photo-1575675416024-1db87a987c71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHBlYWslMjBhZHZlbnR1cmUlMjBzdW5zZXR8ZW58MXx8fHwxNzc1NjIzOTk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      duration: '18:20',
      views: '189K',
    },
    {
      id: 3,
      title: 'Street Food Tour in Bangkok',
      thumbnail: 'https://images.unsplash.com/photo-1544717821-443b7051bf5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBmb29kJTIwbWFya2V0JTIwYXNpYXxlbnwxfHx8fDE3NzU2MjM5OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      duration: '15:30',
      views: '312K',
    },
  ];

  const stories = [
    {
      id: 1,
      title: 'My First Solo Backpacking Adventure',
      image: 'https://images.unsplash.com/photo-1601572490560-03d6a4f99377?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrcGFja2VyJTIwaGlraW5nJTIwYWR2ZW50dXJlfGVufDF8fHx8MTc3NTYyMzk5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      excerpt: 'How I overcame my fears and discovered myself while traveling through Southeast Asia alone.',
      date: 'March 15, 2026',
      readTime: '5 min read',
    },
    {
      id: 2,
      title: 'Chasing the Northern Lights',
      image: 'https://images.unsplash.com/photo-1648607560570-4ee80c5914c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J0aGVybiUyMGxpZ2h0cyUyMGF1cm9yYXxlbnwxfHx8fDE3NzU1MjM2ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      excerpt: 'A magical journey to witness nature\'s most spectacular light show in Iceland.',
      date: 'February 28, 2026',
      readTime: '7 min read',
    },
    {
      id: 3,
      title: 'Hidden Gems of Morocco',
      image: 'https://images.unsplash.com/photo-1743449203926-4f05108c60ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBkdW5lcyUyMHNhaGFyYXxlbnwxfHx8fDE3NzU2MjQwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      excerpt: 'Exploring the Sahara Desert and discovering ancient kasbahs off the beaten path.',
      date: 'January 20, 2026',
      readTime: '6 min read',
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'New York, USA',
      comment: 'Your vlogs inspired me to finally book my dream trip to Bali! The tips and recommendations were incredibly helpful.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'Vancouver, Canada',
      comment: 'The cinematography and storytelling are absolutely stunning. Keep creating amazing content!',
      rating: 5,
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      location: 'Barcelona, Spain',
      comment: 'I love how you show the authentic side of travel. Your budget travel tips have been a game-changer!',
      rating: 5,
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <Hero
        image="https://images.unsplash.com/photo-1746309641900-642b45ebecc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBsYW5kc2NhcGUlMjB3YW5kZXJsdXN0fGVufDF8fHx8MTc3NTYyNDAwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        title="Explore the World Through My Journey"
        subtitle="Join me as I discover breathtaking destinations, immerse myself in diverse cultures, and share unforgettable adventures from around the globe."
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" size="lg">
            <Play className="w-5 h-5" />
            Watch Videos
          </Button>
          <Link to="/gallery">
            <Button variant="outline" size="lg">
              Explore Gallery
            </Button>
          </Link>
        </div>
      </Hero>

      {/* Featured Destinations */}
      <Section
        title="Featured Destinations"
        subtitle="Explore the most breathtaking places I've visited and get inspired for your next adventure"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((dest) => (
            <TravelCard
              key={dest.id}
              image={dest.image}
              title={dest.title}
              description={dest.description}
            >
              <div className="flex items-center gap-2 text-[var(--primary)]">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{dest.location}</span>
              </div>
            </TravelCard>
          ))}
        </div>
      </Section>

      {/* Featured Videos */}
      <Section
        title="Latest Travel Vlogs"
        subtitle="Watch my recent adventures and travel experiences"
        background="gray"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-xl overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              style={{ boxShadow: 'var(--shadow-lg)' }}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                    <Play className="w-8 h-8 text-[var(--primary)] ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm">
                  {video.duration}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg mb-2">{video.title}</h3>
                <p className="text-sm text-[var(--gray-dark)]">{video.views} views</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button variant="primary" size="lg">
            <Play className="w-5 h-5" />
            View All Videos
          </Button>
        </div>
      </Section>

      {/* Travel Stories */}
      <Section
        title="Latest Travel Stories"
        subtitle="Read about my adventures, tips, and travel guides"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <TravelCard
              key={story.id}
              image={story.image}
              title={story.title}
              description={story.excerpt}
            >
              <div className="flex items-center justify-between text-sm text-[var(--gray-dark)]">
                <span>{story.date}</span>
                <span>{story.readTime}</span>
              </div>
            </TravelCard>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Read All Stories
          </Button>
        </div>
      </Section>

      {/* Upcoming Events Preview */}
      <Section
        title="Upcoming Events"
        subtitle="Join me for live sessions, meetups, and group travel experiences"
        background="gray"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-8" style={{ boxShadow: 'var(--shadow-lg)' }}>
            <div className="text-[var(--primary)] text-sm mb-2">April 25, 2026</div>
            <h3 className="text-2xl mb-4">Live Q&A: Travel Tips & Tricks</h3>
            <p className="text-[var(--gray-dark)] mb-6">
              Join me for an interactive session where I'll answer all your travel questions and share insider tips.
            </p>
            <Button variant="primary">View Details</Button>
          </div>
          <div className="bg-white rounded-xl p-8" style={{ boxShadow: 'var(--shadow-lg)' }}>
            <div className="text-[var(--primary)] text-sm mb-2">May 15, 2026</div>
            <h3 className="text-2xl mb-4">Group Tour: Iceland Adventure</h3>
            <p className="text-[var(--gray-dark)] mb-6">
              Join our exclusive group tour to explore Iceland's stunning landscapes and chase the Northern Lights.
            </p>
            <Button variant="primary">Book Now</Button>
          </div>
        </div>
        <div className="text-center mt-12">
          <Link to="/events">
            <Button variant="outline" size="lg">
              View All Events
            </Button>
          </Link>
        </div>
      </Section>

      {/* Testimonials */}
      <Section
        title="What People Are Saying"
        subtitle="Hear from the amazing community that follows my journey"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl p-8 border border-[var(--border)]"
              style={{ boxShadow: 'var(--shadow-md)' }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[var(--sunset-orange)] text-[var(--sunset-orange)]" />
                ))}
              </div>
              <p className="text-[var(--gray-dark)] mb-6 italic">"{testimonial.comment}"</p>
              <div>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-[var(--gray-dark)]">{testimonial.location}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Newsletter CTA */}
      <Section background="dark">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl mb-4" style={{ fontWeight: 'var(--font-weight-bold)' }}>
            Never Miss an Adventure
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Subscribe to get the latest travel stories, tips, and exclusive content delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-[var(--primary)]"
            />
            <Button variant="secondary" size="md">
              Subscribe
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
