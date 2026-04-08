import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { Hero } from '../components/Hero';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { cn } from '../components/ui/utils';

export default function Events() {
  const upcomingEvents = [
    {
      id: 1,
      title: 'Live Q&A: Travel Tips & Budget Planning',
      date: 'April 25, 2026',
      time: '7:00 PM EST',
      location: 'Virtual Event (Zoom)',
      type: 'Live Session',
      image: 'https://images.unsplash.com/photo-1659856233753-7ddf7d3fa8d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjB2bG9nZ2VyJTIwY2FtZXJhfGVufDF8fHx8MTc3NTYyMzk5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Join me for an interactive session where I\'ll answer all your burning travel questions, share budget travel hacks, and reveal my best-kept secrets for affordable adventures.',
      attendees: 245,
      featured: true,
    },
    {
      id: 2,
      title: 'Group Tour: Iceland Adventure',
      date: 'May 15-22, 2026',
      time: '8 Days / 7 Nights',
      location: 'Reykjavik, Iceland',
      type: 'Group Tour',
      image: 'https://images.unsplash.com/photo-1648607560570-4ee80c5914c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J0aGVybiUyMGxpZ2h0cyUyMGF1cm9yYXxlbnwxfHx8fDE3NzU1MjM2ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Experience the magic of Iceland with an exclusive group tour. Chase the Northern Lights, explore glaciers, relax in hot springs, and discover breathtaking landscapes.',
      attendees: 12,
      maxAttendees: 15,
      featured: true,
    },
    {
      id: 3,
      title: 'Travel Photography Workshop',
      date: 'June 10, 2026',
      time: '2:00 PM - 5:00 PM',
      location: 'San Francisco, CA',
      type: 'Workshop',
      image: 'https://images.unsplash.com/photo-1746309641900-642b45ebecc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBsYW5kc2NhcGUlMjB3YW5kZXJsdXN0fGVufDF8fHx8MTc3NTYyNDAwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Learn how to capture stunning travel photos with your smartphone or camera. I\'ll share my techniques, editing workflow, and composition tips.',
      attendees: 28,
      maxAttendees: 30,
      featured: false,
    },
    {
      id: 4,
      title: 'Meetup: Coffee & Travel Stories',
      date: 'June 20, 2026',
      time: '10:00 AM - 12:00 PM',
      location: 'New York, NY',
      type: 'Meetup',
      image: 'https://images.unsplash.com/photo-1585085007341-a5aadf6e48e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMG5pZ2h0JTIwY2l0eXNjYXBlfGVufDF8fHx8MTc3NTU5MTE1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Casual meetup for fellow travelers and subscribers. Share your stories, make new friends, and get travel recommendations over coffee.',
      attendees: 42,
      featured: false,
    },
    {
      id: 5,
      title: 'Group Tour: Southeast Asia Adventure',
      date: 'July 5-20, 2026',
      time: '16 Days / 15 Nights',
      location: 'Thailand, Vietnam, Cambodia',
      type: 'Group Tour',
      image: 'https://images.unsplash.com/photo-1581665334521-ac9a6f6b4be1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwdGVtcGxlJTIwdHJhdmVsfGVufDF8fHx8MTc3NTYyMzk5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Join me on an epic journey through Southeast Asia. Explore ancient temples, bustling markets, pristine beaches, and experience authentic local culture.',
      attendees: 8,
      maxAttendees: 12,
      featured: false,
    },
    {
      id: 6,
      title: 'Live Stream: Packing Like a Pro',
      date: 'August 5, 2026',
      time: '6:00 PM EST',
      location: 'Virtual Event (YouTube)',
      type: 'Live Session',
      image: 'https://images.unsplash.com/photo-1601572490560-03d6a4f99377?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrcGFja2VyJTIwaGlraW5nJTIwYWR2ZW50dXJlfGVufDF8fHx8MTc3NTYyMzk5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Watch as I demonstrate my packing system for carry-on only travel. Learn what to bring, what to leave behind, and how to maximize space.',
      attendees: 156,
      featured: false,
    },
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'Live Session':
        return 'bg-[var(--primary)] text-white';
      case 'Group Tour':
        return 'bg-[var(--secondary)] text-white';
      case 'Workshop':
        return 'bg-[var(--accent)] text-white';
      case 'Meetup':
        return 'bg-[var(--sunset-orange)] text-white';
      default:
        return 'bg-[var(--gray-dark)] text-white';
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <Hero
        image="https://images.unsplash.com/photo-1729359035276-189519a4b072?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZhcmklMjB3aWxkbGlmZSUyMGFmcmljYXxlbnwxfHx8fDE3NzU1ODM1Njd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        title="Upcoming Events"
        subtitle="Join me for exclusive tours, live sessions, workshops, and meetups around the world"
        height="medium"
      />

      {/* Featured Events */}
      <Section
        title="Featured Events"
        subtitle="Don't miss these amazing upcoming experiences"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {upcomingEvents
            .filter((event) => event.featured)
            .map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                style={{ boxShadow: 'var(--shadow-lg)' }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={cn('px-4 py-2 rounded-full text-sm', getEventTypeColor(event.type))}>
                      {event.type}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl mb-4">{event.title}</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-[var(--gray-dark)]">
                      <Calendar className="w-5 h-5 text-[var(--primary)]" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[var(--gray-dark)]">
                      <Clock className="w-5 h-5 text-[var(--primary)]" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[var(--gray-dark)]">
                      <MapPin className="w-5 h-5 text-[var(--primary)]" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[var(--gray-dark)]">
                      <Users className="w-5 h-5 text-[var(--primary)]" />
                      <span>
                        {event.attendees} attendees
                        {event.maxAttendees && ` • ${event.maxAttendees - event.attendees} spots left`}
                      </span>
                    </div>
                  </div>
                  <p className="text-[var(--gray-dark)] mb-6 leading-relaxed">
                    {event.description}
                  </p>
                  <Button variant="primary" className="w-full">
                    {event.type === 'Group Tour' ? 'Book Now' : event.type === 'Live Session' ? 'Register Free' : 'View Details'}
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </Section>

      {/* All Events Timeline */}
      <Section
        title="All Upcoming Events"
        subtitle="Mark your calendars and join the adventure"
        background="gray"
      >
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {upcomingEvents.map((event, index) => (
              <div
                key={event.id}
                className="bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl"
                style={{ boxShadow: 'var(--shadow-md)' }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                  {/* Image */}
                  <div className="relative h-48 md:h-auto rounded-lg overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <span className={cn('px-3 py-1 rounded-full text-xs', getEventTypeColor(event.type))}>
                        {event.type}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-2 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl mb-3">{event.title}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                        <div className="flex items-center gap-2 text-sm text-[var(--gray-dark)]">
                          <Calendar className="w-4 h-4 text-[var(--primary)]" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[var(--gray-dark)]">
                          <Clock className="w-4 h-4 text-[var(--primary)]" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[var(--gray-dark)]">
                          <MapPin className="w-4 h-4 text-[var(--primary)]" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[var(--gray-dark)]">
                          <Users className="w-4 h-4 text-[var(--primary)]" />
                          <span>{event.attendees} attending</span>
                        </div>
                      </div>
                      <p className="text-sm text-[var(--gray-dark)] line-clamp-2">
                        {event.description}
                      </p>
                    </div>
                    <div className="mt-4 flex gap-3">
                      <Button variant="primary" size="sm">
                        {event.type === 'Live Session' ? 'Register' : event.type === 'Group Tour' ? 'Book Tour' : 'Learn More'}
                      </Button>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="dark">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl mb-4" style={{ fontWeight: 'var(--font-weight-bold)' }}>
            Want to Stay Updated?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Subscribe to receive notifications about new events, exclusive group tours, and early-bird discounts.
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
