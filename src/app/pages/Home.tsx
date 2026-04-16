import { Play, MapPin, Star } from "lucide-react";
import { Hero } from "../components/Hero";
import { Button } from "../components/Button";
import { Link } from "react-router";

export default function Home() {
  const destinations = [
    {
      id: 1,
      title: "Tawang",
      location: "Arunachal Pradesh, India",
      image:
        "https://images.unsplash.com/photo-1581665334521-ac9a6f6b4be1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwdGVtcGxlJTIwdHJhdmVsfGVufDF8fHx8MTc3NTYyMzk5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description:
        "Discover ancient temples, lush rice terraces, and pristine beaches in this tropical paradise.",
    },
    {
      id: 2,
      title: "Dehradun",
      location: "Uttarakhand, India",
      image:
        "https://images.unsplash.com/photo-1676730056228-7e38cbb88edc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW50b3JpbmklMjBncmVlY2UlMjBzdW5zZXR8ZW58MXx8fHwxNzc1NjA5NzQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description:
        "Experience stunning sunsets, white-washed buildings, and crystal-clear Aegean waters.",
    },
    {
      id: 3,
      title: "Manali",
      location: "Himachal Pradesh, India",
      image:
        "https://images.unsplash.com/photo-1585424483885-79f95609920f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXRhZ29uaWElMjBsYW5kc2NhcGUlMjBnbGFjaWVyfGVufDF8fHx8MTc3NTYyMzk5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description:
        "Explore glaciers, towering peaks, and the untamed wilderness of South America.",
    },
    {
      id: 4,
      title: "Nainital",
      location: "Himachal Pradesh, India",
      image:
        "https://images.unsplash.com/photo-1585085007341-a5aadf6e48e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMG5pZ2h0JTIwY2l0eXNjYXBlfGVufDF8fHx8MTc3NTU5MTE1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description:
        "Immerse yourself in the perfect blend of ancient traditions and modern technology.",
    },
  ];

  const videos = [
    {
      id: 1,
      title: "Island Hopping in the Maldives",
      thumbnail:
        "https://images.unsplash.com/photo-1611395813517-41f9be5e292d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXJpYWwlMjB0cm9waWNhbCUyMGJlYWNoJTIwdHVycXVvaXNlfGVufDF8fHx8MTc3NTYyMzk5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      duration: "12:45",
      views: "245K",
    },
    {
      id: 2,
      title: "Hiking the Swiss Alps",
      thumbnail:
        "https://images.unsplash.com/photo-1575675416024-1db87a987c71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHBlYWslMjBhZHZlbnR1cmUlMjBzdW5zZXR8ZW58MXx8fHwxNzc1NjIzOTk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      duration: "18:20",
      views: "189K",
    },
    {
      id: 3,
      title: "Street Food Tour in Bangkok",
      thumbnail:
        "https://images.unsplash.com/photo-1544717821-443b7051bf5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBmb29kJTIwbWFya2V0JTIwYXNpYXxlbnwxfHx8fDE3NzU2MjM5OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      duration: "15:30",
      views: "312K",
    },
  ];

  const stories = [
    {
      id: 1,
      title: "My First Solo Backpacking Adventure",
      image:
        "https://images.unsplash.com/photo-1601572490560-03d6a4f99377?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrcGFja2VyJTIwaGlraW5nJTIwYWR2ZW50dXJlfGVufDF8fHx8MTc3NTYyMzk5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      excerpt:
        "How I overcame my fears and discovered myself while traveling through Southeast Asia alone.",
      date: "March 15, 2026",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Chasing the Northern Lights",
      image:
        "https://images.unsplash.com/photo-1648607560570-4ee80c5914c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J0aGVybiUyMGxpZ2h0cyUyMGF1cm9yYXxlbnwxfHx8fDE3NzU1MjM2ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      excerpt:
        "A magical journey to witness nature's most spectacular light show in Iceland.",
      date: "February 28, 2026",
      readTime: "7 min read",
    },
    {
      id: 3,
      title: "Hidden Gems of Morocco",
      image:
        "https://images.unsplash.com/photo-1743449203926-4f05108c60ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBkdW5lcyUyMHNhaGFyYXxlbnwxfHx8fDE3NzU2MjQwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      excerpt:
        "Exploring the Sahara Desert and discovering ancient kasbahs off the beaten path.",
      date: "January 20, 2026",
      readTime: "6 min read",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, USA",
      comment:
        "Your vlogs inspired me to finally book my dream trip to Bali! The tips and recommendations were incredibly helpful.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Vancouver, Canada",
      comment:
        "The cinematography and storytelling are absolutely stunning. Keep creating amazing content!",
      rating: 5,
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      location: "Barcelona, Spain",
      comment:
        "I love how you show the authentic side of travel. Your budget travel tips have been a game-changer!",
      rating: 5,
    },
  ];

  return (
    <div className="pt-20 bg-gradient-to-b from-[#0A0A0F] via-[#12121A] to-[#0A0A0F]">
      {/* Hero Section */}
      <Hero
        image="https://images.unsplash.com/photo-1775824977721-886e4f018413?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Explore the World Through My Journey"
        subtitle="Testing - Join me as I discover breathtaking destinations, immerse myself in diverse cultures, and share unforgettable adventures from around the globe."
        overlay="dark"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white shadow-lg hover:shadow-[0_0_30px_rgba(255,107,53,0.5)] transition-all duration-300 transform hover:scale-105">
            <Play className="w-5 h-5" />
            Watch Videos
          </button>
          <Link to="/gallery">
            <button className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg rounded-xl border-2 border-white/30 text-white backdrop-blur-md bg-white/10 hover:bg-white/20 hover:border-white/50 transition-all duration-300 transform hover:scale-105">
              Explore Gallery
            </button>
          </Link>
        </div>
      </Hero>

      {/* Featured Destinations */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl mb-4 text-white"
              style={{ fontWeight: "var(--font-weight-bold)" }}
            >
              Featured Destinations
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
              Explore the most breathtaking places I've visited
              and get inspired for your next adventure
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {destinations.map((dest) => (
              <div
                key={dest.id}
                className="group cursor-pointer"
              >
                <div className="rounded-xl overflow-hidden backdrop-blur-lg bg-white/5 border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_8px_30px_rgba(0,119,190,0.3)] hover:-translate-y-2">
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={dest.image}
                      alt={dest.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl mb-2 text-white">
                      {dest.title}
                    </h3>
                    <p className="text-gray-400 mb-4 line-clamp-3">
                      {dest.description}
                    </p>
                    <div className="flex items-center gap-2 text-[#38BDF8]">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">
                        {dest.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Videos */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#12121A] to-[#1A1A24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl mb-4 text-white"
              style={{ fontWeight: "var(--font-weight-bold)" }}
            >
              Latest Travel Vlogs
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
              Watch my recent adventures and travel experiences
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <div
                key={video.id}
                className="group cursor-pointer"
              >
                <div className="rounded-xl overflow-hidden backdrop-blur-lg bg-white/5 border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_8px_30px_rgba(255,107,53,0.3)] hover:-translate-y-2">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#F7931E] flex items-center justify-center shadow-[0_0_30px_rgba(255,107,53,0.6)]">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm border border-white/20">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg mb-2 text-white">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {video.views} views
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white shadow-lg hover:shadow-[0_0_30px_rgba(255,107,53,0.5)] transition-all duration-300 transform hover:scale-105">
              <Play className="w-5 h-5" />
              View All Videos
            </button>
          </div>
        </div>
      </section>

      {/* Travel Stories */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl mb-4 text-white"
              style={{ fontWeight: "var(--font-weight-bold)" }}
            >
              Latest Travel Stories
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
              Read about my adventures, tips, and travel guides
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story) => (
              <div
                key={story.id}
                className="group cursor-pointer"
              >
                <div className="rounded-xl overflow-hidden backdrop-blur-lg bg-white/5 border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_8px_30px_rgba(56,189,248,0.3)] hover:-translate-y-2">
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl mb-2 text-white">
                      {story.title}
                    </h3>
                    <p className="text-gray-400 mb-4 line-clamp-3">
                      {story.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{story.date}</span>
                      <span>{story.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg rounded-xl border-2 border-white/30 text-white backdrop-blur-md bg-white/10 hover:bg-white/20 hover:border-white/50 transition-all duration-300 transform hover:scale-105">
              Read All Stories
            </button>
          </div>
        </div>
      </section>

      {/* Upcoming Events Preview */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#1A1A24] to-[#12121A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl mb-4 text-white"
              style={{ fontWeight: "var(--font-weight-bold)" }}
            >
              Upcoming Events
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
              Join me for live sessions, meetups, and group
              travel experiences
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(255,107,53,0.2)]">
              <div className="text-[#38BDF8] text-sm mb-2 font-semibold">
                April 25, 2026
              </div>
              <h3 className="text-2xl mb-4 text-white">
                Live Q&A: Travel Tips & Tricks
              </h3>
              <p className="text-gray-400 mb-6">
                Join me for an interactive session where I'll
                answer all your travel questions and share
                insider tips.
              </p>
              <button className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#0077BE] to-[#38BDF8] text-white shadow-lg hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all duration-300">
                View Details
              </button>
            </div>
            <div className="rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(255,107,53,0.2)]">
              <div className="text-[#FF6B35] text-sm mb-2 font-semibold">
                May 15, 2026
              </div>
              <h3 className="text-2xl mb-4 text-white">
                Group Tour: Iceland Adventure
              </h3>
              <p className="text-gray-400 mb-6">
                Join our exclusive group tour to explore
                Iceland's stunning landscapes and chase the
                Northern Lights.
              </p>
              <button className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white shadow-lg hover:shadow-[0_0_20px_rgba(255,107,53,0.4)] transition-all duration-300">
                Book Now
              </button>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link to="/events">
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg rounded-xl border-2 border-white/30 text-white backdrop-blur-md bg-white/10 hover:bg-white/20 hover:border-white/50 transition-all duration-300 transform hover:scale-105">
                View All Events
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl mb-4 text-white"
              style={{ fontWeight: "var(--font-weight-bold)" }}
            >
              What People Are Saying
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
              Hear from the amazing community that follows my
              journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="rounded-xl backdrop-blur-lg bg-white/5 border border-white/10 p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-[#F7931E] text-[#F7931E]"
                      />
                    ),
                  )}
                </div>
                <p className="text-gray-300 mb-6 italic">
                  "{testimonial.comment}"
                </p>
                <div>
                  <div className="font-semibold text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0A0A0F] via-[#1A1A24] to-[#0A0A0F] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="text-3xl md:text-4xl mb-4 text-white"
              style={{ fontWeight: "var(--font-weight-bold)" }}
            >
              Never Miss an Adventure
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              Subscribe to get the latest travel stories, tips,
              and exclusive content delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-lg backdrop-blur-md bg-white/10 border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#38BDF8] focus:bg-white/15 transition-all"
              />
              <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white shadow-lg hover:shadow-[0_0_30px_rgba(255,107,53,0.5)] transition-all duration-300 transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}