export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
}

export interface Invitation {
  id: string;
  title: string;
  eventDate: string;
  location: string;
  status: 'draft' | 'sent' | 'opened' | 'rsvp';
  recipientCount: number;
}

export interface Template {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  popularity: number;
  isPremium: boolean;
}

export interface DashboardStats {
  totalInvitations: number;
  totalRecipients: number;
  openRate: number;
  rsvpRate: number;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}
