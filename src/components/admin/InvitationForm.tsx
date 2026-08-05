import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { invitationSchema, type InvitationFormData } from '@/schemas/invitation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Title } from '@/components/ui/Title';
import type { InvitationWithMedia } from '@/hooks/useInvitations';

interface InvitationFormProps {
  invitation?: InvitationWithMedia | null;
  onSubmit: (data: InvitationFormData) => void;
  onCancel: () => void;
}

export function InvitationForm({ invitation, onSubmit, onCancel }: InvitationFormProps) {
  const isEditing = !!invitation;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InvitationFormData>({
    resolver: zodResolver(invitationSchema),
    defaultValues: {
      title: '',
      brideFirstName: '',
      brideLastName: '',
      groomFirstName: '',
      groomLastName: '',
      eventDate: '',
      eventTime: '16:00',
      venueName: '',
      venueAddress: '',
      message: '',
      rsvpDeadline: '',
      status: 'draft',
    },
  });

  useEffect(() => {
    if (invitation) {
      reset({
        title: invitation.title,
        brideFirstName: invitation.brideFirstName || '',
        brideLastName: invitation.brideLastName || '',
        groomFirstName: invitation.groomFirstName || '',
        groomLastName: invitation.groomLastName || '',
        eventDate: invitation.eventDate?.split('T')[0] || '',
        eventTime: invitation.eventTime || '16:00',
        venueName: invitation.venueName || '',
        venueAddress: invitation.venueAddress || '',
        message: invitation.message || '',
        rsvpDeadline: invitation.rsvpDeadline || '',
        status: invitation.status === 'sent' ? 'published' : 'draft',
      });
    } else {
      reset();
    }
  }, [invitation, reset]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4"
        onClick={onCancel}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <GlassPanel variant="dark" padding="xl" glow>
            <div className="flex items-center justify-between mb-8">
              <Title as="h2" variant="card" color="ivory">
                {isEditing ? 'Edit Invitation' : 'Create Invitation'}
              </Title>
              <button
                onClick={onCancel}
                className="h-8 w-8 rounded-full border border-gold/20 flex items-center justify-center text-ivory/40 hover:text-gold hover:border-gold/40 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Title */}
              <div>
                <Input
                  label="Invitation Title"
                  placeholder="e.g., The Royal Wedding of Isabella & James"
                  error={errors.title?.message}
                  {...register('title')}
                />
              </div>

              {/* Couple Names */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <p className="font-body text-label uppercase tracking-[0.15em] text-gold">
                    Bride
                  </p>
                  <Input
                    label="First Name"
                    placeholder="Isabella"
                    error={errors.brideFirstName?.message}
                    {...register('brideFirstName')}
                  />
                  <Input
                    label="Last Name"
                    placeholder="Rosemont"
                    error={errors.brideLastName?.message}
                    {...register('brideLastName')}
                  />
                </div>
                <div className="space-y-4">
                  <p className="font-body text-label uppercase tracking-[0.15em] text-gold">
                    Groom
                  </p>
                  <Input
                    label="First Name"
                    placeholder="James"
                    error={errors.groomFirstName?.message}
                    {...register('groomFirstName')}
                  />
                  <Input
                    label="Last Name"
                    placeholder="Harrington"
                    error={errors.groomLastName?.message}
                    {...register('groomLastName')}
                  />
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-body text-label uppercase tracking-[0.15em] text-ivory/70 mb-2">
                    Event Date
                  </label>
                  <input
                    type="date"
                    className="w-full bg-black-50 border border-gold/15 text-ivory font-body text-sm rounded-elegant px-4 py-3 transition-all duration-300 focus:outline-none focus:border-gold/50 hover:border-gold/30"
                    {...register('eventDate')}
                  />
                  {errors.eventDate && (
                    <p className="font-body text-sm text-red-400 mt-1">
                      {errors.eventDate.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block font-body text-label uppercase tracking-[0.15em] text-ivory/70 mb-2">
                    Event Time
                  </label>
                  <input
                    type="time"
                    className="w-full bg-black-50 border border-gold/15 text-ivory font-body text-sm rounded-elegant px-4 py-3 transition-all duration-300 focus:outline-none focus:border-gold/50 hover:border-gold/30"
                    {...register('eventTime')}
                  />
                  {errors.eventTime && (
                    <p className="font-body text-sm text-red-400 mt-1">
                      {errors.eventTime.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Venue */}
              <div className="space-y-4">
                <p className="font-body text-label uppercase tracking-[0.15em] text-gold">
                  Venue
                </p>
                <Input
                  label="Venue Name"
                  placeholder="Chateau de Versailles"
                  error={errors.venueName?.message}
                  {...register('venueName')}
                />
                <div>
                  <label className="block font-body text-label uppercase tracking-[0.15em] text-ivory/70 mb-2">
                    Venue Address
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Place d'Armes, 78000 Versailles, France"
                    className="w-full bg-black-50 border border-gold/15 text-ivory placeholder:text-ivory/30 font-body text-sm rounded-elegant px-4 py-3 transition-all duration-300 focus:outline-none focus:border-gold/50 hover:border-gold/30 resize-none"
                    {...register('venueAddress')}
                  />
                  {errors.venueAddress && (
                    <p className="font-body text-sm text-red-400 mt-1">
                      {errors.venueAddress.message}
                    </p>
                  )}
                </div>
              </div>

              {/* RSVP Deadline */}
              <div>
                <label className="block font-body text-label uppercase tracking-[0.15em] text-ivory/70 mb-2">
                  RSVP Deadline
                </label>
                <input
                  type="date"
                  className="w-full bg-black-50 border border-gold/15 text-ivory font-body text-sm rounded-elegant px-4 py-3 transition-all duration-300 focus:outline-none focus:border-gold/50 hover:border-gold/30"
                  {...register('rsvpDeadline')}
                />
                {errors.rsvpDeadline && (
                  <p className="font-body text-sm text-red-400 mt-1">
                    {errors.rsvpDeadline.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block font-body text-label uppercase tracking-[0.15em] text-ivory/70 mb-2">
                  Invitation Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Together with our families, we invite you to join us..."
                  className="w-full bg-black-50 border border-gold/15 text-ivory placeholder:text-ivory/30 font-body text-sm rounded-elegant px-4 py-3 transition-all duration-300 focus:outline-none focus:border-gold/50 hover:border-gold/30 resize-none"
                  {...register('message')}
                />
                {errors.message && (
                  <p className="font-body text-sm text-red-400 mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Status */}
              <div>
                <label className="block font-body text-label uppercase tracking-[0.15em] text-ivory/70 mb-3">
                  Status
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="draft"
                      {...register('status')}
                      className="accent-gold"
                    />
                    <span className="font-body text-sm text-ivory/70">Draft</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="published"
                      {...register('status')}
                      className="accent-gold"
                    />
                    <span className="font-body text-sm text-ivory/70">Published</span>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  variant="gold"
                  size="md"
                  isLoading={isSubmitting}
                  className="flex-1"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isEditing ? 'Update Invitation' : 'Create Invitation'}
                </Button>
                {isEditing && (
                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                    onClick={onCancel}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </GlassPanel>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
