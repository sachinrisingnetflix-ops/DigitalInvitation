import type { User, Invitation, Template, DashboardStats } from '@/types';

export const currentUser: User = {
  id: '1',
  name: 'Alexandra Morgan',
  email: 'alexandra@velvetgold.com',
  role: 'admin',
};

export const invitations: Invitation[] = [
  {
    id: 'inv-1',
    title: 'The Royal Wedding of Isabella & James',
    eventDate: '2025-06-15T18:00:00Z',
    location: 'Chateau de Versailles, France',
    status: 'rsvp',
    recipientCount: 240,
  },
  {
    id: 'inv-2',
    title: 'Annual Black Tie Gala',
    eventDate: '2025-09-20T19:00:00Z',
    location: 'The Plaza Hotel, New York',
    status: 'sent',
    recipientCount: 450,
  },
  {
    id: 'inv-3',
    title: 'Venetian Masquerade Ball',
    eventDate: '2025-04-10T20:00:00Z',
    location: 'Palazzo Ducale, Venice',
    status: 'draft',
    recipientCount: 120,
  },
  {
    id: 'inv-4',
    title: 'Champagne & Caviar Soiree',
    eventDate: '2025-05-01T10:00:00Z',
    location: 'The Ritz, Paris',
    status: 'opened',
    recipientCount: 180,
  },
];

export const templates: Template[] = [
  { id: 't1', name: 'Imperial Elegance', category: 'Wedding', thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop', popularity: 98, isPremium: false },
  { id: 't2', name: 'Midnight Noir', category: 'Gala', thumbnail: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=800&fit=crop', popularity: 94, isPremium: true },
  { id: 't3', name: 'Gilded Rose', category: 'Wedding', thumbnail: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=800&fit=crop', popularity: 91, isPremium: false },
  { id: 't4', name: 'Crystal Palace', category: 'Ball', thumbnail: 'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=600&h=800&fit=crop', popularity: 87, isPremium: true },
  { id: 't5', name: 'Velvet Dusk', category: 'Party', thumbnail: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600&h=800&fit=crop', popularity: 82, isPremium: false },
  { id: 't6', name: 'Baroque Grandeur', category: 'Wedding', thumbnail: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=800&fit=crop', popularity: 89, isPremium: true },
];

export const dashboardStats: DashboardStats = {
  totalInvitations: 142,
  totalRecipients: 12450,
  openRate: 78.4,
  rsvpRate: 62.1,
};
