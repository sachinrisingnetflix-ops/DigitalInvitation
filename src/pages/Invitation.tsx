import { useParams } from 'react-router-dom';
import { Calendar, MapPin, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Title } from '@/components/ui/Title';
import { GlassPanel } from '@/components/ui/GlassPanel';

export function Invitation() {
  const { id } = useParams();
  const [rsvp, setRsvp] = useState<'yes' | 'no' | null>(null);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=1080&fit=crop')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-2xl">
          {/* Top ornament */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="gold-line flex-1 max-w-[80px]" />
            <span className="font-body text-label uppercase tracking-[0.2em] text-gold">
              You are cordially invited
            </span>
            <div className="gold-line flex-1 max-w-[80px]" />
          </div>

          <GlassPanel variant="dark" padding="xl" glow className="text-center space-y-10">
            {/* Names */}
            <div className="space-y-3">
              <Title
                as="h1"
                variant="display"
                color="gold"
                align="center"
                className="font-display italic"
              >
                Isabella & James
              </Title>
              <p className="font-body text-body-lg text-ivory/60">
                request the pleasure of your company at their wedding celebration
              </p>
            </div>

            <div className="gold-line w-32 mx-auto" />

            {/* Details */}
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="flex flex-col items-center gap-3 p-4">
                <div className="h-12 w-12 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <p className="font-display text-lg text-ivory">June 15, 2025</p>
                  <p className="font-body text-body-sm text-ivory/40">Saturday</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3 p-4">
                <div className="h-12 w-12 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <p className="font-display text-lg text-ivory">Six o&apos;clock</p>
                  <p className="font-body text-body-sm text-ivory/40">in the evening</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3 p-4">
                <div className="h-12 w-12 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <p className="font-display text-lg text-ivory">Chateau de Versailles</p>
                  <p className="font-body text-body-sm text-ivory/40">Versailles, France</p>
                </div>
              </div>
            </div>

            {/* RSVP */}
            <div className="space-y-6 pt-4">
              <p className="font-body text-label uppercase tracking-[0.15em] text-gold">
                Please respond by May 1st
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  variant={rsvp === 'yes' ? 'gold' : 'outline'}
                  size="md"
                  onClick={() => setRsvp('yes')}
                  className="min-w-[160px]"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Joyfully Accept
                </Button>
                <Button
                  variant={rsvp === 'no' ? 'ivory' : 'outline'}
                  size="md"
                  onClick={() => setRsvp('no')}
                  className="min-w-[160px]"
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Regretfully Decline
                </Button>
              </div>
              {rsvp && (
                <p className="font-body text-body-md text-ivory/60 animate-fade-in">
                  {rsvp === 'yes'
                    ? 'We are delighted you will be joining us for this special celebration.'
                    : 'We are sorry you cannot attend. Thank you for letting us know.'}
                </p>
              )}
            </div>

            <p className="font-body text-body-sm text-ivory/20 pt-4">
              Invitation ID: {id || 'demo'}
            </p>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
