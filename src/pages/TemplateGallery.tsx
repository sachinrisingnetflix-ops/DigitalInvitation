import { templates } from '@/data/dummy';
import { Search, Crown, ArrowRight, Filter } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Title } from '@/components/ui/Title';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

const categories = ['All', 'Wedding', 'Gala', 'Ball', 'Party'];

export function TemplateGallery() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = templates.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === 'All' || t.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Header */}
      <div className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black-50 to-black" />
        <Container className="relative z-10">
          <SectionHeader
            label="The Collection"
            title="Templates that define elegance"
            subtitle="Each template is a masterpiece of design, crafted to make your invitation unforgettable."
          />
        </Container>
      </div>

      {/* Filters */}
      <Container className="pb-12">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
          {/* Search */}
          <div className="relative max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gold/60" />
            <input
              type="text"
              placeholder="Search templates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black-50 border border-gold/15 text-ivory placeholder:text-ivory/30 font-body text-body-md rounded-elegant pl-11 pr-4 py-3 transition-all duration-300 ease-luxury focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 hover:border-gold/30"
            />
          </div>

          {/* Categories */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="h-4 w-4 text-gold/60 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'font-body text-label uppercase tracking-[0.1em] px-4 py-2 rounded-elegant border transition-all duration-300',
                  activeCategory === cat
                    ? 'bg-gold/10 border-gold/40 text-gold'
                    : 'bg-transparent border-gold/10 text-ivory/40 hover:text-ivory hover:border-gold/25'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </Container>

      {/* Grid */}
      <Container className="pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((t, i) => (
            <Card
              key={t.id}
              variant="elevated"
              padding="none"
              className={cn('group animate-fade-in', `animate-delay-${(i % 4) * 100}`)}
            >
              <div className="aspect-[3/4] overflow-hidden relative">
                <img
                  src={t.thumbnail}
                  alt={t.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-luxury"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                {t.isPremium && (
                  <div className="absolute top-4 right-4 bg-gold/90 text-black font-body text-label uppercase tracking-[0.1em] px-3 py-1.5 rounded-elegant flex items-center gap-1.5">
                    <Crown className="h-3 w-3" />
                    Premium
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                  <div>
                    <p className="font-body text-label uppercase tracking-[0.15em] text-gold mb-1">
                      {t.category}
                    </p>
                    <Title as="h3" variant="card" color="ivory">
                      {t.name}
                    </Title>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-body text-body-sm text-ivory/40">
                      {t.popularity}% popularity
                    </span>
                    <Button variant="gold" size="sm">
                      Use
                      <ArrowRight className="ml-1.5 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <Search className="h-12 w-12 text-gold/20 mx-auto mb-4" />
            <Title as="h3" variant="card" color="muted" align="center">
              No templates found
            </Title>
            <p className="font-body text-body-sm text-ivory/40 mt-2">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}
