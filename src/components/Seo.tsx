import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const defaults = {
  title: 'Velvet & Gold — Luxury Invitations',
  description: 'Crafted luxury digital invitations for life’s most precious moments.',
};

const routeMeta: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Velvet & Gold — Luxury Invitations',
    description: 'Discover elegant invitation templates and design tools for unforgettable celebrations.',
  },
  '/templates': {
    title: 'Invitation Templates — Velvet & Gold',
    description: 'Browse luxury invitation templates tailored for weddings, galas, and milestone celebrations.',
  },
  '/login': {
    title: 'Sign in — Velvet & Gold',
    description: 'Access your invitation dashboard securely with Supabase authentication.',
  },
  '/admin': {
    title: 'Dashboard — Velvet & Gold',
    description: 'Manage invitations, gallery content, and guest engagement from one dashboard.',
  },
};

export function Seo() {
  const location = useLocation();

  useEffect(() => {
    const meta = routeMeta[location.pathname] ?? defaults;
    document.title = meta.title;

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute('content', meta.description);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `${window.location.origin}${location.pathname}`);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');

    if (ogTitle) {
      ogTitle.setAttribute('content', meta.title);
    }

    if (ogDescription) {
      ogDescription.setAttribute('content', meta.description);
    }
  }, [location.pathname]);

  return null;
}
