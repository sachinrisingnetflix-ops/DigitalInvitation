import { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  MapPin,
  Calendar,
  Music,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Send,
  CheckCircle,
  Utensils,
  Wine,
  Car,
  Hotel,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Title } from '@/components/ui/Title';
import { Container } from '@/components/ui/Container';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { useCountdown } from '@/hooks/useCountdown';
import { FadeIn } from '@/components/animations/FadeIn';
import { ScaleIn } from '@/components/animations/ScaleIn';
import { SlideIn } from '@/components/animations/SlideIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { FloatingParticles } from '@/components/animations/FloatingParticles';
import { ImageZoom } from '@/components/animations/ImageZoom';
import { ParallaxImage } from '@/components/animations/ParallaxImage';
import { SmoothScroll } from '@/components/animations/SmoothScroll';
import { cn } from '@/lib/utils';
import { getStoredInvitations, type InvitationWithMedia } from '@/hooks/useInvitations';

/* ──────────────────────────────────────────────────────────────── */
/*  PLACEHOLDER DATA                                               */
/* ──────────────────────────────────────────────────────────────── */

const COUPLE = {
  bride: { first: 'Isabella', last: 'Rosemont', full: 'Isabella Rosemont' },
  groom: { first: 'James', last: 'Harrington', full: 'James Harrington' },
};

const STORY = [
  {
    date: 'June 2018',
    title: 'The First Glance',
    text: 'We met at a summer gala in the gardens of Chateau de Versailles. Isabella was wearing a champagne silk gown; James spilled his wine trying to introduce himself.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
  },
  {
    date: 'December 2019',
    title: 'The First Journey',
    text: 'Three weeks in the Amalfi Coast. We stayed in a cliffside villa in Positano, ate pasta every night, and decided we never wanted to travel alone again.',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop',
  },
  {
    date: 'March 2022',
    title: 'The Proposal',
    text: 'James proposed at midnight under the Eiffel Tower, with a string quartet hidden in the shadows. Isabella said yes before he finished kneeling.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
  },
];

const GALLERY = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=1000&fit=crop',
];

const TIMELINE = [
  { time: '4:00 PM', title: 'Guest Arrival', desc: 'Champagne reception in the rose garden.', icon: Wine },
  { time: '5:00 PM', title: 'Ceremony', desc: 'Exchange of vows in the Grand Chapel.', icon: Heart },
  { time: '6:30 PM', title: 'Cocktail Hour', desc: 'Signature cocktails and canapes on the terrace.', icon: Wine },
  { time: '8:00 PM', title: 'Dinner Reception', desc: 'Five-course feast in the Crystal Ballroom.', icon: Utensils },
  { time: '10:30 PM', title: 'First Dance', desc: 'Under a canopy of a thousand fairy lights.', icon: Music },
  { time: '12:00 AM', title: 'Farewell', desc: 'Sparkler send-off through the lavender fields.', icon: Heart },
];

const VENUE = {
  name: 'Chateau de Versailles',
  address: 'Place d\'Armes, 78000 Versailles, France',
  description:
    'A masterpiece of 17th-century French architecture, the Chateau de Versailles offers an unparalleled setting for an unforgettable celebration. The Grand Chapel, with its gilded baroque interior, will host our ceremony.',
  lat: 48.8049,
  lng: 2.1204,
};

interface WeddingDetails {
  title: string;
  dateTime: string;
  displayDate: string;
  displayLocation: string;
  message: string;
  heroImage: string;
  couple: typeof COUPLE;
  gallery: string[];
  venue: {
    name: string;
    address: string;
    description: string;
    lat: number;
    lng: number;
  };
  music?: { title: string; artist: string; url: string };
}

function formatInvitationDate(dateTime: string) {
  const date = new Date(dateTime);

  if (Number.isNaN(date.getTime())) {
    return dateTime;
  }

  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function buildWeddingDetails(invitation: InvitationWithMedia): WeddingDetails {
  const brideFirst = invitation.brideFirstName || COUPLE.bride.first;
  const brideLast = invitation.brideLastName || COUPLE.bride.last;
  const groomFirst = invitation.groomFirstName || COUPLE.groom.first;
  const groomLast = invitation.groomLastName || COUPLE.groom.last;
  const gallery = invitation.photos?.map((photo) => photo.url).filter(Boolean) ?? [];
  const displayLocation = invitation.venueName || invitation.location || VENUE.name;

  return {
    title: invitation.title,
    dateTime: invitation.eventTime && !invitation.eventDate.includes('T')
      ? `${invitation.eventDate}T${invitation.eventTime}`
      : invitation.eventDate,
    displayDate: formatInvitationDate(invitation.eventDate),
    displayLocation,
    message: invitation.message || 'Together with our families, we invite you to join us as we begin our forever.',
    heroImage: gallery[0] || GALLERY[0],
    couple: {
      bride: {
        first: brideFirst,
        last: brideLast,
        full: `${brideFirst} ${brideLast}`.trim(),
      },
      groom: {
        first: groomFirst,
        last: groomLast,
        full: `${groomFirst} ${groomLast}`.trim(),
      },
    },
    gallery: gallery.length > 0 ? gallery : GALLERY,
    venue: {
      ...VENUE,
      name: displayLocation,
      address: invitation.venueAddress || invitation.location || VENUE.address,
      description: invitation.message || VENUE.description,
    },
    music: invitation.music,
  };
}

/* ──────────────────────────────────────────────────────────────── */
/*  HERO SECTION                                                   */
/* ──────────────────────────────────────────────────────────────── */

function HeroSection({ details }: { details: WeddingDetails }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with parallax */}
      <div className="absolute inset-0">
        <ParallaxImage
          src={details.heroImage}
          alt={details.title}
          speed={0.2}
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
        />
      </div>
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
      <FloatingParticles count={40} />

      {/* Corner ornaments */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 1.5, ease: [0.23, 1, 0.32, 1] }}
        className="absolute top-10 left-10 w-20 h-20 border-l border-t border-gold/20 hidden lg:block"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 1.7, ease: [0.23, 1, 0.32, 1] }}
        className="absolute top-10 right-10 w-20 h-20 border-r border-t border-gold/20 hidden lg:block"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 1.9, ease: [0.23, 1, 0.32, 1] }}
        className="absolute bottom-10 left-10 w-20 h-20 border-l border-b border-gold/20 hidden lg:block"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 2.1, ease: [0.23, 1, 0.32, 1] }}
        className="absolute bottom-10 right-10 w-20 h-20 border-r border-b border-gold/20 hidden lg:block"
      />

      <Container className="relative z-10 text-center px-6">
        <FadeIn delay={0.3} duration={1}>
          <span className="font-body text-label uppercase tracking-[0.25em] text-gold block mb-8">
            Together with their families
          </span>
        </FadeIn>

        <div className="space-y-2">
          <FadeIn delay={0.6} duration={1.2} direction="up" distance={60}>
            <Title
              as="h1"
              variant="display"
              color="ivory"
              align="center"
              className="font-display italic"
            >
              {details.couple.bride.first}
            </Title>
          </FadeIn>

          <FadeIn delay={0.9} duration={1}>
            <Title
              as="span"
              variant="display"
              color="gold"
              align="center"
              className="font-display italic block my-2 text-display-sm md:text-display-md"
            >
              &
            </Title>
          </FadeIn>

          <FadeIn delay={1.2} duration={1.2} direction="up" distance={60}>
            <Title
              as="h1"
              variant="display"
              color="ivory"
              align="center"
              className="font-display italic"
            >
              {details.couple.groom.first}
            </Title>
          </FadeIn>
        </div>

        <FadeIn delay={1.5} duration={1}>
          <div className="mt-12">
            <div className="flex items-center justify-center gap-6 mb-8">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1.8, ease: [0.23, 1, 0.32, 1] }}
                className="gold-line w-16 origin-right"
              />
              <Calendar className="h-5 w-5 text-gold" />
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1.8, ease: [0.23, 1, 0.32, 1] }}
                className="gold-line w-16 origin-left"
              />
            </div>
            <p className="font-body text-body-lg text-ivory/70 tracking-wide">
              {details.displayDate}
            </p>
            <p className="font-body text-body-md text-gold mt-4 tracking-widest uppercase">
              {details.displayLocation}
            </p>
          </div>
        </FadeIn>
      </Container>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.5, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown className="h-6 w-6 text-gold/60" />
      </motion.div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────── */
/*  INVITATION MESSAGE                                             */
/* ──────────────────────────────────────────────────────────────── */

function InvitationMessage({ details }: { details: WeddingDetails }) {
  return (
    <section className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black-50 to-black" />
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <div className="flex items-center justify-center gap-4 mb-10">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                className="gold-line w-12 origin-right"
              />
              <Heart className="h-5 w-5 text-gold fill-gold" />
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                className="gold-line w-12 origin-left"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Title as="h2" variant="section" color="ivory" align="center" className="mb-8">
              {details.title}
            </Title>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="font-body text-body-lg text-ivory/60 leading-[1.9] mb-6">
              {details.message}
            </p>
          </FadeIn>

          <FadeIn delay={0.6}>
            <p className="font-body text-body-lg text-ivory/60 leading-[1.9]">
              Please grace us with your company for an evening of joy, laughter, and
              dancing under the stars at one of the most magnificent places on earth.
            </p>
          </FadeIn>

          <FadeIn delay={0.8}>
            <div className="mt-12 space-y-2">
              <p className="font-display text-2xl text-gold italic">
                {details.couple.bride.full}
              </p>
              <p className="font-display text-xl text-ivory/40 italic">&</p>
              <p className="font-display text-2xl text-gold italic">
                {details.couple.groom.full}
              </p>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────── */
/*  COUNTDOWN                                                      */
/* ──────────────────────────────────────────────────────────────── */

function CountdownSection({ dateTime }: { dateTime: string }) {
  const { days, hours, minutes, seconds } = useCountdown(dateTime);

  const units = [
    { value: days, label: 'Days' },
    { value: hours, label: 'Hours' },
    { value: minutes, label: 'Minutes' },
    { value: seconds, label: 'Seconds' },
  ];

  return (
    <section className="relative py-24">
      <div className="absolute inset-0 bg-black-100" />
      <Container className="relative z-10">
        <FadeIn>
          <p className="font-body text-label uppercase tracking-[0.25em] text-gold text-center mb-12">
            Counting the moments
          </p>
        </FadeIn>

        <StaggerContainer staggerDelay={0.12} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
          {units.map((u) => (
            <StaggerItem key={u.label}>
              <GlassPanel variant="dark" padding="lg" glow className="text-center">
                <motion.p
                  key={u.value}
                  initial={{ scale: 1.2, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="font-display text-4xl md:text-5xl text-gold font-medium"
                >
                  {String(u.value).padStart(2, '0')}
                </motion.p>
                <p className="font-body text-label uppercase tracking-[0.15em] text-ivory/40 mt-3">
                  {u.label}
                </p>
              </GlassPanel>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────── */
/*  OUR STORY                                                      */
/* ──────────────────────────────────────────────────────────────── */

function StorySection() {
  return (
    <section className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black-50 to-black" />
      <Container className="relative z-10">
        <div className="text-center mb-20">
          <FadeIn>
            <p className="font-body text-label uppercase tracking-[0.25em] text-gold mb-6">
              Our Journey
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Title as="h2" variant="section" color="ivory" align="center" ornament>
              Our Story
            </Title>
          </FadeIn>
        </div>

        <div className="space-y-24">
          {STORY.map((chapter, i) => (
            <div
              key={chapter.date}
              className={cn(
                'grid md:grid-cols-2 gap-12 items-center',
                i % 2 === 1 && 'md:[direction:rtl]'
              )}
            >
              <SlideIn
                direction={i % 2 === 0 ? 'left' : 'right'}
                delay={0.1}
                className={cn('space-y-6', i % 2 === 1 && 'md:[direction:ltr]')}
              >
                <p className="font-body text-label uppercase tracking-[0.2em] text-gold">
                  {chapter.date}
                </p>
                <Title as="h3" variant="card" color="ivory">
                  {chapter.title}
                </Title>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  className="gold-line w-16 origin-left"
                />
                <p className="font-body text-body-md text-ivory/50 leading-relaxed">
                  {chapter.text}
                </p>
              </SlideIn>

              <ScaleIn
                delay={0.2}
                className={cn(
                  'aspect-[4/3] rounded-elegant overflow-hidden border border-gold/10',
                  i % 2 === 1 && 'md:[direction:ltr]'
                )}
              >
                <ImageZoom className="w-full h-full">
                  <img
                    src={chapter.image}
                    alt={chapter.title}
                    className="w-full h-full object-cover"
                  />
                </ImageZoom>
              </ScaleIn>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────── */
/*  GALLERY                                                        */
/* ──────────────────────────────────────────────────────────────── */

function GallerySection({ images }: { images: string[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const imageCount = images.length;

  const openLightbox = (index: number) => setLightbox(index);
  const closeLightbox = () => setLightbox(null);
  const prevImage = useCallback(
    () => setLightbox((i) => (i === null ? null : i === 0 ? imageCount - 1 : i - 1)),
    [imageCount]
  );
  const nextImage = useCallback(
    () => setLightbox((i) => (i === null ? null : i === imageCount - 1 ? 0 : i + 1)),
    [imageCount]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    },
    [lightbox, nextImage, prevImage]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <section className="relative py-32">
      <div className="absolute inset-0 bg-black" />
      <Container className="relative z-10">
        <div className="text-center mb-16">
          <FadeIn>
            <p className="font-body text-label uppercase tracking-[0.25em] text-gold mb-6">
              Memories
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Title as="h2" variant="section" color="ivory" align="center" ornament>
              Gallery
            </Title>
          </FadeIn>
        </div>

        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((src, i) => (
            <StaggerItem
              key={i}
              className={cn(
                'aspect-[3/4] rounded-elegant overflow-hidden border border-gold/10 cursor-pointer',
                i === 0 && 'md:col-span-2 md:row-span-2'
              )}
            >
              <motion.div
                className="w-full h-full"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                onClick={() => openLightbox(i)}
              >
                <img
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-6 right-6 text-ivory/60 hover:text-ivory transition-colors z-10"
              onClick={closeLightbox}
            >
              <span className="font-display text-3xl">&times;</span>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-ivory/60 hover:text-ivory transition-colors p-2 z-10"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <ChevronLeft className="h-8 w-8" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-ivory/60 hover:text-ivory transition-colors p-2 z-10"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <ChevronRight className="h-8 w-8" />
            </motion.button>

            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              src={images[lightbox]}
              alt="Lightbox"
              className="max-h-[85vh] max-w-full rounded-elegant border border-gold/10"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────── */
/*  TIMELINE                                                       */
/* ──────────────────────────────────────────────────────────────── */

function TimelineSection() {
  return (
    <section className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black-100 to-black" />
      <Container className="relative z-10">
        <div className="text-center mb-20">
          <FadeIn>
            <p className="font-body text-label uppercase tracking-[0.25em] text-gold mb-6">
              The Day
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Title as="h2" variant="section" color="ivory" align="center" ornament>
              Timeline
            </Title>
          </FadeIn>
        </div>

        <div className="max-w-3xl mx-auto relative">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
            className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gold/20 origin-top"
          />

          <div className="space-y-12">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.1,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="relative flex items-start gap-8 md:gap-0"
              >
                {/* Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 + 0.3, ease: [0.23, 1, 0.32, 1] }}
                  className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10"
                >
                  <div className="h-3 w-3 rounded-full bg-gold border-4 border-black" />
                </motion.div>

                {/* Content */}
                <div
                  className={cn(
                    'ml-16 md:ml-0 md:w-1/2 md:pr-12 md:text-right',
                    i % 2 === 1 && 'md:ml-auto md:pl-12 md:pr-0 md:text-left'
                  )}
                >
                  <Card variant="default" padding="md" className="hover-lift">
                    <div className="flex items-center gap-3 mb-3 md:justify-end" data-even={i % 2 === 1}>
                      <item.icon className="h-4 w-4 text-gold" />
                      <span className="font-body text-label uppercase tracking-[0.15em] text-gold">
                        {item.time}
                      </span>
                    </div>
                    <h3 className="font-display text-xl text-ivory mb-2">{item.title}</h3>
                    <p className="font-body text-body-sm text-ivory/50">{item.desc}</p>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────── */
/*  VENUE + MAP                                                    */
/* ──────────────────────────────────────────────────────────────── */

function VenueSection({ venue }: { venue: WeddingDetails['venue'] }) {
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2626.3667!2d${venue.lng}!3d${venue.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e67db1a9749b2b%3A0x50b82c368941b0!2sPalace%20of%20Versailles!5e0!3m2!1sen!2sfr!4v1699999999999!5m2!1sen!2sfr`;

  return (
    <section className="relative py-32">
      <div className="absolute inset-0 bg-black" />
      <Container className="relative z-10">
        <div className="text-center mb-16">
          <FadeIn>
            <p className="font-body text-label uppercase tracking-[0.25em] text-gold mb-6">
              The Location
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Title as="h2" variant="section" color="ivory" align="center" ornament>
              Venue
            </Title>
          </FadeIn>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn direction="left" delay={0.1}>
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-3xl text-gold mb-4">{venue.name}</h3>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                  <p className="font-body text-body-md text-ivory/60">{venue.address}</p>
                </div>
              </div>

              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="gold-line origin-left"
              />

              <p className="font-body text-body-md text-ivory/50 leading-relaxed">
                {venue.description}
              </p>

              <StaggerContainer staggerDelay={0.1} className="grid sm:grid-cols-3 gap-4">
                {[
                  { icon: Car, label: 'Valet Parking', desc: 'Available on-site' },
                  { icon: Hotel, label: 'Accommodation', desc: 'Rooms reserved' },
                  { icon: Utensils, label: 'Dietary', desc: 'Options available' },
                ].map((item) => (
                  <StaggerItem key={item.label}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                      className="p-4 rounded-elegant border border-gold/10 bg-black-50 text-center"
                    >
                      <item.icon className="h-5 w-5 text-gold mx-auto mb-2" />
                      <p className="font-body text-body-sm font-medium text-ivory">{item.label}</p>
                      <p className="font-body text-body-sm text-ivory/40 mt-0.5">{item.desc}</p>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </FadeIn>

          <SlideIn direction="right" delay={0.2}>
            <div className="aspect-[4/3] rounded-elegant overflow-hidden border border-gold/10">
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Venue Location"
              />
            </div>
          </SlideIn>
        </div>
      </Container>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────── */
/*  RSVP                                                           */
/* ──────────────────────────────────────────────────────────────── */

function RSVPSection() {
  const [submitted, setSubmitted] = useState(false);
  const [attending, setAttending] = useState<boolean | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="relative py-32">
      <div className="absolute inset-0">
        <ParallaxImage
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=1080&fit=crop"
          alt="RSVP background"
          speed={0.15}
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
        />
      </div>
      <div className="absolute inset-0 bg-black/80" />

      <Container className="relative z-10">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-12">
            <FadeIn>
              <p className="font-body text-label uppercase tracking-[0.25em] text-gold mb-6">
                Please Respond
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <Title as="h2" variant="section" color="ivory" align="center">
                RSVP
              </Title>
            </FadeIn>
          </div>

          <ScaleIn delay={0.3}>
            <GlassPanel variant="dark" padding="xl" glow>
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    className="text-center space-y-6 py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
                      className="h-16 w-16 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto"
                    >
                      <CheckCircle className="h-8 w-8 text-gold" />
                    </motion.div>
                    <Title as="h3" variant="card" color="ivory" align="center">
                      Thank you for your response
                    </Title>
                    <p className="font-body text-body-md text-ivory/50">
                      We have received your RSVP and look forward to celebrating with you.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input label="First Name" placeholder="Your first name" />
                      <Input label="Last Name" placeholder="Your last name" />
                    </div>
                    <Input label="Email Address" type="email" placeholder="name@example.com" />

                    <div className="space-y-3">
                      <label className="block font-body text-label uppercase tracking-[0.15em] text-ivory/70">
                        Will you be attending?
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <motion.button
                          type="button"
                          onClick={() => setAttending(true)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={cn(
                            'py-3 rounded-elegant border font-body text-body-sm transition-all duration-300',
                            attending === true
                              ? 'bg-gold/10 border-gold text-gold'
                              : 'bg-transparent border-gold/15 text-ivory/50 hover:border-gold/30'
                          )}
                        >
                          Joyfully Accept
                        </motion.button>
                        <motion.button
                          type="button"
                          onClick={() => setAttending(false)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={cn(
                            'py-3 rounded-elegant border font-body text-body-sm transition-all duration-300',
                            attending === false
                              ? 'bg-ivory/10 border-ivory text-ivory'
                              : 'bg-transparent border-gold/15 text-ivory/50 hover:border-gold/30'
                          )}
                        >
                          Regretfully Decline
                        </motion.button>
                      </div>
                    </div>

                    <AnimatePresence>
                      {attending === true && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                          className="space-y-4 overflow-hidden"
                        >
                          <Input
                            label="Number of Guests"
                            type="number"
                            min={1}
                            max={4}
                            placeholder="1"
                          />
                          <div className="space-y-2">
                            <label className="block font-body text-label uppercase tracking-[0.15em] text-ivory/70">
                              Dietary Requirements
                            </label>
                            <textarea
                              rows={3}
                              placeholder="Any allergies or dietary preferences..."
                              className="w-full bg-black-50 border border-gold/15 text-ivory placeholder:text-ivory/30 font-body text-body-md rounded-elegant px-4 py-3 transition-all duration-300 ease-luxury focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 hover:border-gold/30 resize-none"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <Button variant="gold" size="md" className="w-full" type="submit">
                      <Send className="mr-2 h-4 w-4" />
                      Send RSVP
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </GlassPanel>
          </ScaleIn>
        </div>
      </Container>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────── */
/*  MUSIC PLAYER                                                   */
/* ──────────────────────────────────────────────────────────────── */

function MusicSection({ music }: { music: NonNullable<WeddingDetails['music']> }) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative py-16 border-t border-gold/10"
    >
      <div className="absolute inset-0 bg-black-50" />
      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <FadeIn direction="left">
            <div className="flex items-center gap-4">
              <motion.div
                animate={playing ? { rotate: [0, 360] } : {}}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="h-12 w-12 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center"
              >
                <Music className="h-5 w-5 text-gold" />
              </motion.div>
              <div>
                <p className="font-body text-label uppercase tracking-[0.15em] text-gold">
                  Our Song
                </p>
                <p className="font-display text-lg text-ivory">
                  &ldquo;{music.title}&rdquo; - {music.artist}
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right">
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPlaying(!playing)}
                className={cn(
                  'h-12 w-12 rounded-full border flex items-center justify-center transition-all duration-300',
                  playing
                    ? 'bg-gold border-gold text-black'
                    : 'bg-transparent border-gold/30 text-gold hover:border-gold/50'
                )}
              >
                {playing ? (
                  <span className="font-body text-sm font-bold">II</span>
                ) : (
                  <span className="ml-0.5">
                    <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor">
                      <path d="M0 0L14 8L0 16V0Z" />
                    </svg>
                  </span>
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMuted(!muted)}
                className="h-10 w-10 rounded-full border border-gold/20 flex items-center justify-center text-ivory/40 hover:text-gold hover:border-gold/40 transition-all duration-300"
              >
                {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </motion.button>
            </div>
          </FadeIn>
        </div>
      </Container>
    </motion.section>
  );
}

/* ──────────────────────────────────────────────────────────────── */
/*  FOOTER                                                         */
/* ──────────────────────────────────────────────────────────────── */

function WeddingFooter({ details }: { details: WeddingDetails }) {
  return (
    <footer className="relative py-20 border-t border-gold/10">
      <div className="absolute inset-0 bg-black" />
      <Container className="relative z-10 text-center">
        <FadeIn>
          <div className="space-y-6">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Heart className="h-5 w-5 text-gold fill-gold mx-auto" />
            </motion.div>
            <Title as="h3" variant="card" color="gold" align="center" className="italic">
              {details.couple.bride.first} & {details.couple.groom.first}
            </Title>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
              className="gold-line w-24 mx-auto"
            />
            <p className="font-body text-body-sm text-ivory/30 max-w-md mx-auto">
              With love, gratitude, and excitement — we cannot wait to celebrate with you.
            </p>
            <p className="font-body text-label uppercase tracking-[0.2em] text-ivory/20 pt-4">
              {details.displayDate} &middot; {details.displayLocation}
            </p>
          </div>
        </FadeIn>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-gold/5"
        >
          <p className="font-body text-body-sm text-ivory/20">
            Crafted with <span className="text-gold">Velvet & Gold</span>
          </p>
          <Link
            to="/"
            className="inline-block mt-2 font-body text-body-sm text-ivory/15 hover:text-gold/60 transition-colors"
          >
            Back to Home
          </Link>
        </motion.div>
      </Container>
    </footer>
  );
}

/* ──────────────────────────────────────────────────────────────── */
/*  MAIN PAGE                                                      */
/* ──────────────────────────────────────────────────────────────── */

export function WeddingInvitation() {
  const { id } = useParams();
  const invitation = getStoredInvitations().find((item) => item.id === id);

  if (!invitation) {
    return (
      <div className="min-h-screen bg-black text-ivory font-body flex items-center justify-center px-6">
        <div className="max-w-md text-center space-y-6">
          <Title as="h1" variant="card" color="ivory" align="center">
            Invitation not found
          </Title>
          <p className="text-ivory/50">
            This invitation is not available in this browser. Open it from the admin dashboard after creating or saving it.
          </p>
          <Link
            to="/admin/invitations"
            className="inline-flex items-center justify-center rounded-elegant bg-gold px-5 py-3 font-body text-sm font-medium text-black hover:bg-gold-400 transition-colors"
          >
            Back to invitations
          </Link>
        </div>
      </div>
    );
  }

  const details = buildWeddingDetails(invitation);

  return (
    <SmoothScroll>
      <div className="bg-black text-ivory font-body">
        <HeroSection details={details} />
        <InvitationMessage details={details} />
        <CountdownSection dateTime={details.dateTime} />
        <StorySection />
        <GallerySection images={details.gallery} />
        <TimelineSection />
        <VenueSection venue={details.venue} />
        <RSVPSection />
        {details.music && <MusicSection music={details.music} />}
        <WeddingFooter details={details} />
      </div>
    </SmoothScroll>
  );
}
