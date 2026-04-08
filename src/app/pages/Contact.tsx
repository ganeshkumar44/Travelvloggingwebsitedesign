import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import { Hero } from '../components/Hero';
import { Section } from '../components/Section';
import { Button } from '../components/Button';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - would integrate with backend
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const faqs = [
    {
      question: 'How can I join your group tours?',
      answer: 'You can view all upcoming group tours on the Events page. Simply click on the tour you\'re interested in and follow the booking process. Spaces are limited, so book early!',
    },
    {
      question: 'Do you offer travel consulting services?',
      answer: 'Yes! I offer personalized travel consulting where I can help you plan your itinerary, provide destination recommendations, and share insider tips. Contact me for rates and availability.',
    },
    {
      question: 'Can I use your photos/videos for my project?',
      answer: 'Please reach out via the contact form with details about your project. I\'m happy to discuss licensing and permissions on a case-by-case basis.',
    },
    {
      question: 'How do I collaborate with you?',
      answer: 'I\'m always open to collaboration opportunities! Send me an email with details about your proposal, brand, or project. I typically respond within 3-5 business days.',
    },
    {
      question: 'Do you accept sponsorships?',
      answer: 'Yes, I work with select brands that align with my values and audience. Please send partnership inquiries to hello@wanderlust.com with your proposal.',
    },
    {
      question: 'Where are you traveling next?',
      answer: 'Check the Events page for upcoming destinations! I also share travel updates on my social media channels, so make sure to follow me there.',
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <Hero
        image="https://images.unsplash.com/photo-1525081154077-09c42762162e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwY2l0eXNjYXBlJTIwdHJhdmVsfGVufDF8fHx8MTc3NTYyMzk5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        title="Get In Touch"
        subtitle="Have questions, collaboration ideas, or just want to say hello? I'd love to hear from you!"
        height="medium"
      />

      {/* Contact Form & Info */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl mb-6">Contact Information</h3>
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <div>
                  <h4 className="mb-1">Email</h4>
                  <p className="text-[var(--gray-dark)]">hello@wanderlust.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <div>
                  <h4 className="mb-1">Phone</h4>
                  <p className="text-[var(--gray-dark)]">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <div>
                  <h4 className="mb-1">Location</h4>
                  <p className="text-[var(--gray-dark)]">San Francisco, CA<br />United States</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="mb-4">Follow My Journey</h4>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-12 h-12 rounded-full bg-[var(--primary)] text-white flex items-center justify-center hover:bg-[var(--ocean-blue-dark)] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-full bg-[var(--primary)] text-white flex items-center justify-center hover:bg-[var(--ocean-blue-dark)] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-full bg-[var(--primary)] text-white flex items-center justify-center hover:bg-[var(--ocean-blue-dark)] transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-full bg-[var(--primary)] text-white flex items-center justify-center hover:bg-[var(--ocean-blue-dark)] transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8" style={{ boxShadow: 'var(--shadow-lg)' }}>
              <h3 className="text-2xl mb-6">Send Me a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-[var(--gray-dark)]">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--input-background)] focus:outline-none focus:border-[var(--primary)] transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-[var(--gray-dark)]">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--input-background)] focus:outline-none focus:border-[var(--primary)] transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block mb-2 text-[var(--gray-dark)]">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--input-background)] focus:outline-none focus:border-[var(--primary)] transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="group-tour">Group Tour Question</option>
                    <option value="consulting">Travel Consulting</option>
                    <option value="sponsorship">Sponsorship/Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block mb-2 text-[var(--gray-dark)]">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--input-background)] focus:outline-none focus:border-[var(--primary)] transition-colors resize-none"
                    placeholder="Tell me about your inquiry..."
                  />
                </div>
                <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
                  <Send className="w-5 h-5" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Section>

      {/* Map Section */}
      <Section background="gray">
        <div className="rounded-2xl overflow-hidden" style={{ boxShadow: 'var(--shadow-lg)' }}>
          <div className="bg-[var(--muted)] h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-[var(--primary)] mx-auto mb-4" />
              <p className="text-xl text-[var(--gray-dark)]">Interactive Map Placeholder</p>
              <p className="text-sm text-[var(--gray-medium)] mt-2">Google Maps integration would go here</p>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section
        title="Frequently Asked Questions"
        subtitle="Find quick answers to common questions"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-[var(--border)]"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <h4 className="text-lg mb-3 text-[var(--primary)]">{faq.question}</h4>
                <p className="text-[var(--gray-dark)] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Newsletter Section */}
      <Section background="dark">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl mb-4" style={{ fontWeight: 'var(--font-weight-bold)' }}>
            Subscribe to My Newsletter
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Get exclusive travel tips, destination guides, and behind-the-scenes content delivered straight to your inbox.
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
          <p className="text-sm text-gray-400 mt-4">
            No spam, unsubscribe anytime. I respect your privacy.
          </p>
        </div>
      </Section>
    </div>
  );
}
