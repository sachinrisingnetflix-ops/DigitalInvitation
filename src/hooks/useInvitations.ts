import { useState, useCallback } from 'react';
import { invitations as initialInvitations } from '@/data/dummy';
import type { Invitation } from '@/types';
import type { InvitationFormData } from '@/schemas/invitation';

export interface InvitationWithMedia extends Invitation {
  brideFirstName?: string;
  brideLastName?: string;
  groomFirstName?: string;
  groomLastName?: string;
  eventTime?: string;
  venueName?: string;
  venueAddress?: string;
  message?: string;
  rsvpDeadline?: string;
  photos?: { id: string; url: string; caption?: string }[];
  music?: { title: string; artist: string; url: string };
}

let idCounter = 100;

export function useInvitations() {
  const [items, setItems] = useState<InvitationWithMedia[]>(
    initialInvitations.map((inv) => ({
      ...inv,
      brideFirstName: 'Isabella',
      brideLastName: 'Rosemont',
      groomFirstName: 'James',
      groomLastName: 'Harrington',
      eventTime: '16:00',
      venueName: 'Chateau de Versailles',
      venueAddress: "Place d'Armes, 78000 Versailles, France",
      message:
        'Together with our families, we invite you to join us as we begin our forever.',
      rsvpDeadline: '2025-08-20',
      photos: [],
    }))
  );

  const create = useCallback((data: InvitationFormData) => {
    const newItem: InvitationWithMedia = {
      id: `inv-${++idCounter}`,
      title: data.title,
      eventDate: data.eventDate,
      location: data.venueName,
      status: data.status === 'published' ? 'sent' : 'draft',
      recipientCount: 0,
      brideFirstName: data.brideFirstName,
      brideLastName: data.brideLastName,
      groomFirstName: data.groomFirstName,
      groomLastName: data.groomLastName,
      eventTime: data.eventTime,
      venueName: data.venueName,
      venueAddress: data.venueAddress,
      message: data.message || '',
      rsvpDeadline: data.rsvpDeadline,
      photos: [],
    };
    setItems((prev) => [newItem, ...prev]);
    return newItem;
  }, []);

  const update = useCallback((id: string, data: InvitationFormData) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              title: data.title,
              eventDate: data.eventDate,
              location: data.venueName,
              status: data.status === 'published' ? 'sent' : 'draft',
              brideFirstName: data.brideFirstName,
              brideLastName: data.brideLastName,
              groomFirstName: data.groomFirstName,
              groomLastName: data.groomLastName,
              eventTime: data.eventTime,
              venueName: data.venueName,
              venueAddress: data.venueAddress,
              message: data.message || '',
              rsvpDeadline: data.rsvpDeadline,
            }
          : item
      )
    );
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const publish = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'sent' as const } : item
      )
    );
  }, []);

  const unpublish = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'draft' as const } : item
      )
    );
  }, []);

  const addPhotos = useCallback(
    (id: string, photos: { id: string; url: string; caption?: string }[]) => {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, photos: [...(item.photos || []), ...photos] }
            : item
        )
      );
    },
    []
  );

  const removePhoto = useCallback((id: string, photoId: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, photos: item.photos?.filter((p) => p.id !== photoId) }
          : item
      )
    );
  }, []);

  const setMusic = useCallback(
    (id: string, music: { title: string; artist: string; url: string }) => {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, music } : item))
      );
    },
    []
  );

  const removeMusic = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, music: undefined } : item
      )
    );
  }, []);

  return {
    items,
    create,
    update,
    remove,
    publish,
    unpublish,
    addPhotos,
    removePhoto,
    setMusic,
    removeMusic,
  };
}
