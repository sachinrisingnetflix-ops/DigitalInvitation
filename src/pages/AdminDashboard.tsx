import { dashboardStats, invitations } from '@/data/dummy';
import { Mail, Users, Eye, PartyPopper, TrendingUp, TrendingDown } from 'lucide-react';
import { Title } from '@/components/ui/Title';
import { Card } from '@/components/ui/Card';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { cn } from '@/lib/utils';

const stats = [
  {
    label: 'Total Invitations',
    value: dashboardStats.totalInvitations,
    icon: Mail,
    change: '+12%',
    positive: true,
  },
  {
    label: 'Recipients',
    value: dashboardStats.totalRecipients.toLocaleString(),
    icon: Users,
    change: '+8%',
    positive: true,
  },
  {
    label: 'Open Rate',
    value: `${dashboardStats.openRate}%`,
    icon: Eye,
    change: '+5.2%',
    positive: true,
  },
  {
    label: 'RSVP Rate',
    value: `${dashboardStats.rsvpRate}%`,
    icon: PartyPopper,
    change: '-2.1%',
    positive: false,
  },
];

const statusColors: Record<string, string> = {
  rsvp: 'bg-green-500/10 text-green-400 border-green-500/20',
  sent: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  opened: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  draft: 'bg-ivory/5 text-ivory/40 border-ivory/10',
};

export function AdminDashboard() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <Title as="h1" variant="card" color="ivory">
          Overview
        </Title>
        <p className="font-body text-body-sm text-ivory/40 mt-1">
          Your invitations at a glance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s) => (
          <Card key={s.label} variant="default" padding="md" className="hover-lift">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <p className="font-body text-label uppercase tracking-[0.15em] text-ivory/40">
                  {s.label}
                </p>
                <p className="font-display text-3xl font-medium text-ivory">
                  {s.value}
                </p>
                <div
                  className={cn(
                    'inline-flex items-center gap-1 font-body text-body-sm',
                    s.positive ? 'text-green-400' : 'text-red-400'
                  )}
                >
                  {s.positive ? (
                    <TrendingUp className="h-3.5 w-3.5" />
                  ) : (
                    <TrendingDown className="h-3.5 w-3.5" />
                  )}
                  {s.change} from last month
                </div>
              </div>
              <div className="h-10 w-10 rounded-elegant bg-gold/10 border border-gold/15 flex items-center justify-center">
                <s.icon className="h-4 w-4 text-gold" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Invitations */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <Title as="h2" variant="card" color="ivory">
            Recent Invitations
          </Title>
          <button className="font-body text-body-sm text-gold hover:text-gold-400 transition-colors">
            View all
          </button>
        </div>

        <GlassPanel variant="dark" padding="none">
          <div className="divide-y divide-gold/5">
            {invitations.map((inv) => (
              <div
                key={inv.id}
                className="flex items-center justify-between p-5 hover:bg-gold/5 transition-colors duration-300 group"
              >
                <div className="space-y-1">
                  <p className="font-display text-base font-medium text-ivory group-hover:text-gold transition-colors">
                    {inv.title}
                  </p>
                  <p className="font-body text-body-sm text-ivory/40">
                    {inv.location} &middot; {new Date(inv.eventDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-body text-body-sm text-ivory/40 hidden sm:block">
                    {inv.recipientCount} guests
                  </span>
                  <span
                    className={cn(
                      'inline-flex items-center rounded-elegant px-3 py-1 font-body text-label uppercase tracking-[0.1em] border',
                      statusColors[inv.status]
                    )}
                  >
                    {inv.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>

      {/* Activity Chart Placeholder */}
      <div className="space-y-5">
        <Title as="h2" variant="card" color="ivory">
          Activity Overview
        </Title>
        <GlassPanel variant="dark" padding="lg">
          <div className="h-64 flex items-end justify-between gap-3 px-4">
            {Array.from({ length: 12 }).map((_, i) => {
              const height = 20 + Math.random() * 70;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-gold/20 rounded-t-sm hover:bg-gold/40 transition-colors duration-300"
                    style={{ height: `${height}%` }}
                  />
                  <span className="font-body text-body-sm text-ivory/30">
                    {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}
                  </span>
                </div>
              );
            })}
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
