import { Link, Outlet, useLocation } from 'react-router-dom';
import { Crown, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Templates', href: '/templates' },
  { label: 'Preview', href: '/invitation/demo' },
  { label: 'Dashboard', href: '/admin' },
];

export function MainLayout() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className="min-h-screen bg-black text-ivory font-body">
      {/* Navigation */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-luxury',
          scrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-gold/10'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <Crown className="h-6 w-6 text-gold transition-transform duration-500 group-hover:scale-110" />
              <span className="font-display text-xl font-medium tracking-wide">
                Velvet <span className="text-gold">&</span> Gold
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'relative font-body text-label uppercase tracking-[0.15em] transition-colors duration-300',
                    pathname === link.href
                      ? 'text-gold'
                      : 'text-ivory/60 hover:text-ivory'
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-gold" />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:block">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 font-body text-label uppercase tracking-[0.15em] text-gold border border-gold/30 px-6 py-2.5 rounded-elegant hover:bg-gold/10 hover:border-gold/50 transition-all duration-500"
              >
                Sign In
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden text-ivory"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-500 ease-luxury',
            mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="px-6 pb-8 pt-2 space-y-1 bg-black/95 backdrop-blur-xl border-b border-gold/10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'block py-3 font-body text-label uppercase tracking-[0.15em] transition-colors',
                  pathname === link.href ? 'text-gold' : 'text-ivory/60'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 font-body text-label uppercase tracking-[0.15em] text-gold border border-gold/30 px-6 py-2.5 rounded-elegant"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-gold/10 bg-black">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center gap-3 mb-6">
                <Crown className="h-5 w-5 text-gold" />
                <span className="font-display text-lg font-medium">
                  Velvet <span className="text-gold">&</span> Gold
                </span>
              </Link>
              <p className="font-body text-body-sm text-ivory/50 max-w-sm leading-relaxed">
                Crafting extraordinary digital invitations for life's most precious
                moments. Where elegance meets innovation.
              </p>
            </div>
            <div>
              <h4 className="font-body text-label uppercase tracking-[0.15em] text-gold mb-6">
                Explore
              </h4>
              <ul className="space-y-3">
                {['Templates', 'Pricing', 'About', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link
                      to="/"
                      className="font-body text-body-sm text-ivory/50 hover:text-gold transition-colors duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-body text-label uppercase tracking-[0.15em] text-gold mb-6">
                Legal
              </h4>
              <ul className="space-y-3">
                {['Privacy Policy', 'Terms of Service', 'Cookies'].map((item) => (
                  <li key={item}>
                    <Link
                      to="/"
                      className="font-body text-body-sm text-ivory/50 hover:text-gold transition-colors duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="gold-line mt-12 mb-6" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-body-sm text-ivory/30">
              &copy; 2026 Velvet & Gold. All rights reserved.
            </p>
            <p className="font-body text-body-sm text-ivory/30">
              Designed with <span className="text-gold">elegance</span> in mind.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
