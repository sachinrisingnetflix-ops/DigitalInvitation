import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Gem, Heart, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Title } from '@/components/ui/Title';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

/* ─── Animated Particles Background ─── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    const context = ctx;
    let animId: number;
    function draw() {
      context.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        context.beginPath();
        context.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        context.fillStyle = `rgba(201, 168, 76, ${p.alpha})`;
        context.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            context.beginPath();
            context.moveTo(particles[i].x, particles[i].y);
            context.lineTo(particles[j].x, particles[j].y);
            context.strokeStyle = `rgba(201, 168, 76, ${0.08 * (1 - dist / 150)})`;
            context.lineWidth = 0.5;
            context.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    }
    draw();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}

/* ─── Scroll Reveal Hook ─── */
function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ─── Hero Section ─── */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=1080&fit=crop')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
      <ParticleField />

      {/* Decorative corner ornaments */}
      <div className="absolute top-8 left-8 w-24 h-24 border-l border-t border-gold/20 hidden lg:block" />
      <div className="absolute top-8 right-8 w-24 h-24 border-r border-t border-gold/20 hidden lg:block" />
      <div className="absolute bottom-8 left-8 w-24 h-24 border-l border-b border-gold/20 hidden lg:block" />
      <div className="absolute bottom-8 right-8 w-24 h-24 border-r border-b border-gold/20 hidden lg:block" />

      {/* Content */}
      <Container className="relative z-10 text-center px-6">
        <div className="animate-fade-in">
          <Title
            as="span"
            variant="label"
            color="gold"
            align="center"
            className="mb-6 inline-block"
          >
            <Sparkles className="inline-block h-3 w-3 mr-2 mb-0.5" />
            Premium Digital Invitations
          </Title>
        </div>

        <div className="animate-fade-in animate-delay-200">
          <Title
            as="h1"
            variant="display"
            color="ivory"
            align="center"
            className="mb-8 max-w-4xl mx-auto"
          >
            Craft invitations worthy of{' '}
            <span className="text-gold-gradient italic">your moment</span>
          </Title>
        </div>

        <div className="animate-fade-in animate-delay-400">
          <p className="font-body text-body-lg text-ivory/60 max-w-xl mx-auto mb-12 leading-relaxed">
            Exquisite designs, seamless delivery, and real-time RSVP tracking —
            everything you need to announce life's most precious celebrations.
          </p>
        </div>

        <div className="animate-fade-in animate-delay-600 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/templates">
            <Button variant="gold" size="lg">
              Explore Templates
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/invitation/demo">
            <Button variant="outline" size="lg">
              Live Preview
            </Button>
          </Link>
        </div>
      </Container>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="h-6 w-6 text-gold/60" />
      </div>
    </section>
  );
}

/* ─── Couple Preview Section ─── */
function CouplePreviewSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black-50 to-black" />

      <Container className="relative z-10">
        <div
          className={cn(
            'grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ease-luxury',
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          )}
        >
          {/* Image Side */}
          <div className="relative">
            <div className="aspect-[3/4] rounded-elegant overflow-hidden border border-gold/10">
              <img
                src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=1067&fit=crop"
                alt="Elegant couple"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-luxury"
              />
            </div>
            {/* Floating accent card */}
            <div className="absolute -bottom-6 -right-6 lg:-right-12 glass-panel rounded-soft p-6 max-w-xs border border-gold/10">
              <div className="flex items-center gap-3 mb-3">
                <Heart className="h-4 w-4 text-gold fill-gold" />
                <span className="font-body text-label uppercase tracking-[0.15em] text-gold">
                  Loved by 10,000+
                </span>
              </div>
              <p className="font-body text-body-sm text-ivory/60">
                Couples worldwide have chosen Velvet & Gold for their special day.
              </p>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-8">
            <SectionHeader
              label="The Experience"
              title="Designed for those who appreciate the finer things"
              subtitle="Every detail matters. From the weight of the typography to the subtle shimmer of gold accents, we craft invitations that feel as extraordinary as the events they announce."
              align="left"
              showLine={false}
            />

            <div className="space-y-6 pt-4">
              {[
                {
                  icon: Gem,
                  title: 'Bespoke Designs',
                  desc: 'Each template is hand-crafted by award-winning designers with meticulous attention to detail.',
                },
                {
                  icon: Sparkles,
                  title: 'Effortless Customization',
                  desc: 'Personalize every element — fonts, colors, layouts — with our intuitive editor.',
                },
                {
                  icon: Heart,
                  title: 'Real-time RSVP Tracking',
                  desc: 'Monitor guest responses, dietary preferences, and attendance in real-time.',
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-5 group">
                  <div className="h-12 w-12 rounded-elegant bg-gold/10 border border-gold/15 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/15 transition-colors duration-300">
                    <item.icon className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-medium text-ivory mb-1">
                      {item.title}
                    </h3>
                    <p className="font-body text-body-sm text-ivory/50 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─── Featured Templates Section ─── */
function FeaturedTemplatesSection() {
  const { ref, visible } = useScrollReveal();

  const templates = [
    {
      name: 'Imperial Elegance',
      category: 'Wedding',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop',
      tag: 'Most Popular',
    },
    {
      name: 'Midnight Noir',
      category: 'Gala',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=800&fit=crop',
      tag: 'Premium',
    },
    {
      name: 'Gilded Rose',
      category: 'Wedding',
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=800&fit=crop',
      tag: null,
    },
  ];

  return (
    <section ref={ref} className="relative py-32">
      <div className="absolute inset-0 bg-black" />

      <Container className="relative z-10">
        <div
          className={cn(
            'transition-all duration-1000 ease-luxury',
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          )}
        >
          <SectionHeader
            label="Curated Collection"
            title="Templates that define elegance"
            subtitle="Browse our handpicked selection of luxury invitation designs, each one a masterpiece of typography and composition."
          />
        </div>

        <div
          className={cn(
            'grid md:grid-cols-3 gap-8 mt-16 transition-all duration-1000 delay-200 ease-luxury',
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          )}
        >
          {templates.map((t) => (
            <Card key={t.name} variant="elevated" padding="none" className="group">
              <div className="aspect-[3/4] overflow-hidden relative">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-luxury"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                {t.tag && (
                  <div className="absolute top-4 right-4 bg-gold/90 text-black font-body text-label uppercase tracking-[0.1em] px-3 py-1.5 rounded-elegant">
                    {t.tag}
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-body text-label uppercase tracking-[0.15em] text-gold mb-2">
                    {t.category}
                  </p>
                  <h3 className="font-display text-xl font-medium text-ivory">
                    {t.name}
                  </h3>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/templates">
            <Button variant="outline" size="md">
              View All Templates
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}

/* ─── Testimonials Section ─── */
function TestimonialsSection() {
  const { ref, visible } = useScrollReveal();

  const testimonials = [
    {
      quote:
        "Velvet & Gold transformed our wedding invitations into works of art. Our guests were mesmerized.",
      name: 'Isabella & James',
      event: 'Royal Wedding, Versailles',
    },
    {
      quote:
        "The attention to detail is extraordinary. Every pixel, every curve speaks of luxury and refinement.",
      name: 'Victoria Ashford',
      event: 'Annual Gala, The Plaza',
    },
    {
      quote:
        "We received more compliments on our digital invitation than on the venue itself. Absolutely stunning.",
      name: 'The Harringtons',
      event: 'Anniversary Celebration',
    },
  ];

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black-100 to-black" />

      <Container className="relative z-10">
        <div
          className={cn(
            'transition-all duration-1000 ease-luxury',
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          )}
        >
          <SectionHeader
            label="Testimonials"
            title="Words from our cherished clients"
          />
        </div>

        <div
          className={cn(
            'grid md:grid-cols-3 gap-8 mt-16 transition-all duration-1000 delay-200 ease-luxury',
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          )}
        >
          {testimonials.map((t) => (
            <GlassPanel key={t.name} variant="dark" padding="lg" glow>
              <div className="space-y-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Heart
                      key={i}
                      className="h-4 w-4 text-gold fill-gold"
                    />
                  ))}
                </div>
                <p className="font-body text-body-md text-ivory/80 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="gold-line" />
                <div>
                  <p className="font-display text-base font-medium text-ivory">
                    {t.name}
                  </p>
                  <p className="font-body text-body-sm text-ivory/40 mt-0.5">
                    {t.event}
                  </p>
                </div>
              </div>
            </GlassPanel>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ─── CTA Section ─── */
function CTASection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section ref={ref} className="relative py-32">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=800&fit=crop')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/80" />

      <Container className="relative z-10">
        <div
          className={cn(
            'max-w-3xl mx-auto text-center transition-all duration-1000 ease-luxury',
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          )}
        >
          <Title as="span" variant="label" color="gold" align="center" className="mb-6">
            Begin Your Journey
          </Title>
          <Title
            as="h2"
            variant="hero"
            color="ivory"
            align="center"
            className="mb-8"
          >
            Ready to create something{' '}
            <span className="text-gold-gradient italic">unforgettable</span>?
          </Title>
          <p className="font-body text-body-lg text-ivory/60 mb-12 max-w-xl mx-auto leading-relaxed">
            Join the discerning few who refuse to compromise on elegance. Your
            perfect invitation awaits.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/templates">
              <Button variant="gold" size="lg">
                Start Creating
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─── Main Landing Page ─── */
export function Landing() {
  return (
    <div className="bg-black">
      <HeroSection />
      <CouplePreviewSection />
      <FeaturedTemplatesSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
