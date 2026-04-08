# Wanderlust Travel Vlog - Design System Documentation

## Overview
This is a modern, fully responsive travel vlogging website built with React, TypeScript, Tailwind CSS v4, and React Router. The design system is future-ready for backend integration.

---

## 🎨 Color Palette

### Primary Colors (defined in `/src/styles/theme.css`)
- **Ocean Blue**: `#0077BE` - Primary brand color
- **Ocean Blue Dark**: `#005A8F` - Hover states
- **Sunset Orange**: `#FF6B35` - Secondary/CTA color
- **Sunset Orange Dark**: `#E55A2B` - Hover states
- **Sand Beige**: `#F4E9D7` - Warm accents
- **Forest Green**: `#2D5016` - Nature/adventure accents
- **Sky Blue**: `#87CEEB` - Light accents

### Neutral Colors
- **Charcoal**: `#1A1A1A` - Dark text
- **White**: `#FFFFFF` - Background
- **Gray Light**: `#F5F5F5` - Subtle backgrounds
- **Gray Medium**: `#9CA3AF` - Secondary text
- **Gray Dark**: `#374151` - Body text

---

## 📐 Typography Scale

All typography variables are defined in CSS variables:

- `--text-xs`: 0.75rem (12px)
- `--text-sm`: 0.875rem (14px)
- `--text-base`: 1rem (16px)
- `--text-lg`: 1.125rem (18px)
- `--text-xl`: 1.25rem (20px)
- `--text-2xl`: 1.5rem (24px)
- `--text-3xl`: 1.875rem (30px)
- `--text-4xl`: 2.25rem (36px)
- `--text-5xl`: 3rem (48px)
- `--text-6xl`: 3.75rem (60px)
- `--text-7xl`: 4.5rem (72px)

### Font Weights
- Normal: 400
- Medium: 500
- Semibold: 600
- Bold: 700

---

## 🔲 Spacing System

- `--spacing-xs`: 0.5rem (8px)
- `--spacing-sm`: 1rem (16px)
- `--spacing-md`: 1.5rem (24px)
- `--spacing-lg`: 2rem (32px)
- `--spacing-xl`: 3rem (48px)
- `--spacing-2xl`: 4rem (64px)
- `--spacing-3xl`: 6rem (96px)

---

## 🔘 Border Radius

- `--radius-sm`: 0.25rem (4px)
- `--radius-md`: 0.5rem (8px)
- `--radius-lg`: 0.75rem (12px)
- `--radius-xl`: 1rem (16px)
- `--radius-2xl`: 1.5rem (24px)
- `--radius-full`: 9999px (fully rounded)

---

## 🌑 Shadows

- `--shadow-sm`: Subtle shadow for cards
- `--shadow-md`: Medium shadow
- `--shadow-lg`: Large shadow for elevated elements
- `--shadow-xl`: Extra large shadow
- `--shadow-2xl`: Maximum depth shadow

---

## 🧩 Reusable Components

### Button Component (`/src/app/components/Button.tsx`)

**Variants:**
- `primary` - Ocean blue background, white text
- `secondary` - Sunset orange background, white text
- `outline` - Border only, transparent background
- `text` - Text only, no background

**Sizes:**
- `sm` - Small (px-4 py-2)
- `md` - Medium (px-6 py-3)
- `lg` - Large (px-8 py-4)

**Usage:**
```tsx
<Button variant="primary" size="lg">Click Me</Button>
```

---

### TravelCard Component (`/src/app/components/TravelCard.tsx`)

A card component with image, title, description, and hover effects.

**Props:**
- `image` - Image URL
- `title` - Card title
- `description` - Optional description
- `children` - Optional additional content
- `onClick` - Optional click handler

**Usage:**
```tsx
<TravelCard
  image="/path/to/image.jpg"
  title="Bali, Indonesia"
  description="Discover paradise..."
>
  <Button>Learn More</Button>
</TravelCard>
```

---

### Hero Component (`/src/app/components/Hero.tsx`)

Full-width hero section with background image and overlay.

**Props:**
- `image` - Background image URL
- `title` - Main heading
- `subtitle` - Optional subtitle
- `children` - CTA buttons or other content
- `height` - 'small' | 'medium' | 'large'
- `overlay` - 'light' | 'medium' | 'dark'

**Usage:**
```tsx
<Hero
  image="/hero.jpg"
  title="Explore the World"
  subtitle="Join the adventure"
  height="large"
  overlay="medium"
>
  <Button>Get Started</Button>
</Hero>
```

---

### Section Component (`/src/app/components/Section.tsx`)

Wrapper component for page sections with consistent padding and optional title.

**Props:**
- `title` - Optional section title
- `subtitle` - Optional section subtitle
- `children` - Section content
- `background` - 'white' | 'gray' | 'dark'

**Usage:**
```tsx
<Section title="Featured Destinations" subtitle="..." background="gray">
  <div>Content here</div>
</Section>
```

---

### Navbar Component (`/src/app/components/Navbar.tsx`)

Responsive navigation with mobile menu.

**Features:**
- Fixed position
- Active page highlighting
- Mobile hamburger menu
- Smooth transitions

---

### Footer Component (`/src/app/components/Footer.tsx`)

Global footer with links, contact info, and social media.

**Features:**
- 4-column grid layout
- Social media icons
- Newsletter signup
- Responsive design

---

## 📱 Pages

### 1. Home Page (`/src/app/pages/Home.tsx`)
**Sections:**
- Hero with CTA buttons
- Featured Destinations (4 cards)
- Latest Travel Vlogs (3 video cards)
- Latest Travel Stories (3 blog cards)
- Upcoming Events Preview (2 cards)
- Testimonials (3 cards)
- Newsletter CTA

### 2. Gallery Page (`/src/app/pages/Gallery.tsx`)
**Features:**
- Search functionality
- Media type tabs (All, Images, Videos)
- Category filters (Beaches, Mountains, Cities, etc.)
- Masonry grid layout
- Lightbox for images
- Hover effects with metadata overlay

### 3. Events Page (`/src/app/pages/Events.tsx`)
**Features:**
- Hero section
- Featured events (large cards)
- Timeline/list of all events
- Event details (date, time, location, attendees)
- CTA buttons (Register, Book Now, View Details)
- Newsletter signup

### 4. Contact Page (`/src/app/pages/Contact.tsx`)
**Features:**
- Contact form with validation
- Contact information cards
- Social media links
- Google Maps placeholder
- FAQ section (6 questions)
- Newsletter subscription

---

## 🎭 Animations & Transitions

All defined in `/src/styles/index.css`:

- **Fade-in animation**: Used in hero sections
- **Hover effects**: Scale, shadow, and translate transforms
- **Smooth transitions**: 300ms duration on interactive elements

---

## 📊 Data Structure for Backend Integration

### Destination Object
```typescript
{
  id: number;
  title: string;
  location: string;
  image: string;
  description: string;
  category?: string;
}
```

### Video Object
```typescript
{
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  url?: string;
}
```

### Blog/Story Object
```typescript
{
  id: number;
  title: string;
  image: string;
  excerpt: string;
  date: string;
  readTime: string;
  category?: string;
}
```

### Event Object
```typescript
{
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'Live Session' | 'Group Tour' | 'Workshop' | 'Meetup';
  image: string;
  description: string;
  attendees: number;
  maxAttendees?: number;
  featured: boolean;
}
```

### Gallery Item Object
```typescript
{
  id: number;
  type: 'image' | 'video';
  url: string;
  category: string;
  title: string;
  location: string;
  duration?: string; // for videos
}
```

### Testimonial Object
```typescript
{
  id: number;
  name: string;
  location: string;
  comment: string;
  rating: number;
}
```

---

## 🔌 API Integration Points

The design is structured to easily connect with REST APIs or GraphQL:

1. **Destinations**: `GET /api/destinations`
2. **Videos**: `GET /api/videos`
3. **Blog Posts**: `GET /api/posts`
4. **Events**: `GET /api/events`
5. **Gallery Items**: `GET /api/gallery?category=beaches&type=image`
6. **Testimonials**: `GET /api/testimonials`
7. **Contact Form**: `POST /api/contact`
8. **Newsletter**: `POST /api/newsletter/subscribe`

---

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All components are fully responsive with:
- Flexible grid layouts
- Mobile-first approach
- Touch-friendly interactive elements
- Responsive typography
- Optimized images

---

## 🚀 Future Enhancements

Ready for:
- Backend API integration
- User authentication
- Content Management System (CMS)
- Video player integration
- Payment processing for tours
- Real-time booking system
- Email marketing integration
- Analytics tracking
- SEO optimization
- Performance monitoring

---

## 🛠️ Tech Stack

- **React 18.3.1**
- **TypeScript**
- **Tailwind CSS v4**
- **React Router 7**
- **Lucide React** (icons)
- **React Responsive Masonry** (gallery)
- **Motion** (animations - ready to use)
- **React Slick** (carousels - ready to use)

---

## 📝 Notes

- All colors, spacing, and design tokens are centralized in `/src/styles/theme.css`
- Components are modular and reusable
- Dark mode support is built-in (toggle can be added)
- All images use Unsplash API
- Design follows modern UI/UX best practices
- Accessibility features included (ARIA labels, semantic HTML)
- SEO-friendly structure

---

**Created**: April 2026  
**Version**: 1.0.0  
**License**: MIT
