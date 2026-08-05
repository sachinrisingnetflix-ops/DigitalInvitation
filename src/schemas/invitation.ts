import { z } from 'zod';

export const invitationSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(120, 'Title must be under 120 characters'),
  brideFirstName: z
    .string()
    .min(1, 'Bride first name is required')
    .max(50, 'Name too long'),
  brideLastName: z
    .string()
    .min(1, 'Bride last name is required')
    .max(50, 'Name too long'),
  groomFirstName: z
    .string()
    .min(1, 'Groom first name is required')
    .max(50, 'Name too long'),
  groomLastName: z
    .string()
    .min(1, 'Groom last name is required')
    .max(50, 'Name too long'),
  eventDate: z.string().min(1, 'Event date is required'),
  eventTime: z.string().min(1, 'Event time is required'),
  venueName: z
    .string()
    .min(2, 'Venue name is required')
    .max(100, 'Venue name too long'),
  venueAddress: z
    .string()
    .min(5, 'Address is required')
    .max(200, 'Address too long'),
  message: z
    .string()
    .max(1000, 'Message must be under 1000 characters')
    .optional(),
  rsvpDeadline: z.string().min(1, 'RSVP deadline is required'),
  status: z.enum(['draft', 'published', 'archived']),
});

export type InvitationFormData = z.infer<typeof invitationSchema>;

export const mediaSchema = z.object({
  photos: z
    .array(
      z.object({
        id: z.string(),
        url: z.string().url('Invalid image URL'),
        caption: z.string().max(100).optional(),
      })
    )
    .max(20, 'Maximum 20 photos allowed'),
  music: z
    .object({
      title: z.string().min(1, 'Song title is required').max(100),
      artist: z.string().min(1, 'Artist is required').max(100),
      url: z.string().url('Invalid audio URL'),
    })
    .optional(),
});

export type MediaFormData = z.infer<typeof mediaSchema>;
