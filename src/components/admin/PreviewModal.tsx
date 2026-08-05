import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Clock, Heart, Music } from 'lucide-react';
import { Title } from '@/components/ui/Title';
import { Button } from '@/components/ui/Button';
import { ExternalLink } from 'lucide-react';
import type { InvitationWithMedia } from '@/hooks/useInvitations';

interface PreviewModalProps {
  invitation: InvitationWithMedia;
  onClose: () => void;
}

export function PreviewModal({ invitation, onClose }: PreviewModalProps) {
  const eventDate = new Date(invitation.eventDate);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Preview Header */}
          <div className="flex items-center justify-between mb-6">
            <p className="font-body text-label uppercase tracking-[0.2em] text-gold">
              Preview Mode
            </p>
            <button
              onClick={onClose}
              className="h-8 w-8 rounded-full border border-gold/20 flex items-center justify-center text-ivory/40 hover:text-gold hover:border-gold/40 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Invitation Preview */}
          <div className="relative rounded-elegant overflow-hidden border border-gold/10">
            {/* Hero bg */}
            <div className="relative h-64 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=600&fit=crop')] bg-cover bg-center">
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-body text-label uppercase tracking-[0.25em] text-gold mb-4"
                >
                  Together with their families
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Title
                    as="h1"
                    variant="hero"
                    color="ivory"
                    align="center"
                    className="font-display italic"
                  >
                    {invitation.brideFirstName} & {invitation.groomFirstName}
                  </Title>
                </motion.div>
              </div>
            </div>

            {/* Details */}
            <div className="bg-black-50 p-8 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                <p className="font-display text-2xl text-gold italic mb-2">
                  {invitation.title}
                </p>
                <div className="gold-line w-24 mx-auto my-4" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-3 gap-4"
              >
                <div className="text-center p-3 rounded-elegant border border-gold/10">
                  <Calendar className="h-4 w-4 text-gold mx-auto mb-2" />
                  <p className="font-body text-xs text-ivory/60">
                    {eventDate.toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div className="text-center p-3 rounded-elegant border border-gold/10">
                  <Clock className="h-4 w-4 text-gold mx-auto mb-2" />
                  <p className="font-body text-xs text-ivory/60">
                    {invitation.eventTime}
                  </p>
                </div>
                <div className="text-center p-3 rounded-elegant border border-gold/10">
                  <MapPin className="h-4 w-4 text-gold mx-auto mb-2" />
                  <p className="font-body text-xs text-ivory/60 truncate">
                    {invitation.venueName}
                  </p>
                </div>
              </motion.div>

              {invitation.message && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-center"
                >
                  <p className="font-body text-sm text-ivory/60 leading-relaxed italic">
                    &ldquo;{invitation.message}&rdquo;
                  </p>
                </motion.div>
              )}

              {/* Photos Preview */}
              {invitation.photos && invitation.photos.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <p className="font-body text-label uppercase tracking-[0.15em] text-gold mb-3 text-center">
                    Gallery ({invitation.photos.length} photos)
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {invitation.photos.slice(0, 4).map((photo) => (
                      <div
                        key={photo.id}
                        className="aspect-square rounded-elegant overflow-hidden border border-gold/10"
                      >
                        <img
                          src={photo.url}
                          alt={photo.caption || ''}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Music Preview */}
              {invitation.music && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="flex items-center gap-3 p-3 rounded-elegant border border-gold/10 bg-gold/5"
                >
                  <Music className="h-4 w-4 text-gold" />
                  <div>
                    <p className="font-body text-sm text-ivory">
                      {invitation.music.title}
                    </p>
                    <p className="font-body text-xs text-ivory/40">
                      {invitation.music.artist}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* RSVP Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="text-center pt-4"
              >
                <Button variant="gold" size="md">
                  <Heart className="mr-2 h-4 w-4" />
                  RSVP Now
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Live Link */}
          <div className="mt-6 text-center">
            <a
              href={`/wedding/${invitation.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-sm text-gold hover:text-gold-400 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Open live invitation
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
