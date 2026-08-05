import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Upload,
  Image,
  Music,
  Trash2,
  Plus,
  Link as LinkIcon,
  Check,
} from 'lucide-react';
import { mediaSchema, type MediaFormData } from '@/schemas/invitation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Title } from '@/components/ui/Title';
import { ImageZoom } from '@/components/animations/ImageZoom';
import type { InvitationWithMedia } from '@/hooks/useInvitations';

interface MediaUploaderProps {
  invitation: InvitationWithMedia;
  onAddPhotos: (photos: { id: string; url: string; caption?: string }[]) => void;
  onRemovePhoto: (photoId: string) => void;
  onSetMusic: (music: { title: string; artist: string; url: string }) => void;
  onRemoveMusic: () => void;
  onClose: () => void;
}

export function MediaUploader({
  invitation,
  onAddPhotos,
  onRemovePhoto,
  onSetMusic,
  onRemoveMusic,
  onClose,
}: MediaUploaderProps) {
  const [activeTab, setActiveTab] = useState<'photos' | 'music'>('photos');
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoCaption, setPhotoCaption] = useState('');
  const [photoError, setPhotoError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MediaFormData>({
    resolver: zodResolver(mediaSchema),
    defaultValues: {
      photos: invitation.photos || [],
      music: invitation.music,
    },
  });

  const handleAddPhotoUrl = () => {
    if (!photoUrl.trim()) {
      setPhotoError('Please enter an image URL');
      return;
    }
    try {
      new URL(photoUrl);
      onAddPhotos([
        {
          id: `photo-${Date.now()}`,
          url: photoUrl.trim(),
          caption: photoCaption.trim() || undefined,
        },
      ]);
      setPhotoUrl('');
      setPhotoCaption('');
      setPhotoError('');
    } catch {
      setPhotoError('Please enter a valid URL');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onAddPhotos([
            {
              id: `photo-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
              url: event.target.result as string,
              caption: file.name,
            },
          ]);
        }
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const onMusicSubmit = (data: MediaFormData) => {
    if (data.music) {
      onSetMusic(data.music);
      reset();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <GlassPanel variant="dark" padding="xl" glow>
            <div className="flex items-center justify-between mb-8">
              <Title as="h2" variant="card" color="ivory">
                Manage Media
              </Title>
              <button
                onClick={onClose}
                className="h-8 w-8 rounded-full border border-gold/20 flex items-center justify-center text-ivory/40 hover:text-gold hover:border-gold/40 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-8 p-1 rounded-elegant bg-black-50 border border-gold/10">
              <button
                onClick={() => setActiveTab('photos')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-elegant font-body text-sm transition-all ${
                  activeTab === 'photos'
                    ? 'bg-gold/10 text-gold'
                    : 'text-ivory/40 hover:text-ivory/60'
                }`}
              >
                <Image className="h-4 w-4" />
                Photos
                {invitation.photos && invitation.photos.length > 0 && (
                  <span className="ml-1 text-xs bg-gold/20 text-gold px-1.5 py-0.5 rounded-full">
                    {invitation.photos.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('music')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-elegant font-body text-sm transition-all ${
                  activeTab === 'music'
                    ? 'bg-gold/10 text-gold'
                    : 'text-ivory/40 hover:text-ivory/60'
                }`}
              >
                <Music className="h-4 w-4" />
                Music
                {invitation.music && (
                  <span className="ml-1 h-2 w-2 rounded-full bg-gold" />
                )}
              </button>
            </div>

            {/* Photos Tab */}
            {activeTab === 'photos' && (
              <div className="space-y-6">
                {/* Add Photo */}
                <div className="space-y-4">
                  <p className="font-body text-label uppercase tracking-[0.15em] text-gold">
                    Add Photos
                  </p>

                  {/* URL Input */}
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <div className="relative">
                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gold/40" />
                        <input
                          type="text"
                          placeholder="Paste image URL..."
                          value={photoUrl}
                          onChange={(e) => {
                            setPhotoUrl(e.target.value);
                            setPhotoError('');
                          }}
                          className="w-full bg-black-50 border border-gold/15 text-ivory placeholder:text-ivory/30 font-body text-sm rounded-elegant pl-10 pr-4 py-2.5 transition-all focus:outline-none focus:border-gold/50 hover:border-gold/30"
                        />
                      </div>
                      {photoError && (
                        <p className="font-body text-xs text-red-400 mt-1">{photoError}</p>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Caption (optional)"
                      value={photoCaption}
                      onChange={(e) => setPhotoCaption(e.target.value)}
                      className="w-40 bg-black-50 border border-gold/15 text-ivory placeholder:text-ivory/30 font-body text-sm rounded-elegant px-3 py-2.5 transition-all focus:outline-none focus:border-gold/50 hover:border-gold/30"
                    />
                    <Button variant="gold" size="sm" onClick={handleAddPhotoUrl}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* File Upload */}
                  <div
                    className="border-2 border-dashed border-gold/15 rounded-elegant p-6 text-center hover:border-gold/30 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-6 w-6 text-gold/40 mx-auto mb-2" />
                    <p className="font-body text-sm text-ivory/50">
                      Click to upload or drag and drop
                    </p>
                    <p className="font-body text-xs text-ivory/30 mt-1">
                      PNG, JPG, WEBP up to 5MB
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                  </div>
                </div>

                {/* Photo Grid */}
                {invitation.photos && invitation.photos.length > 0 && (
                  <div>
                    <p className="font-body text-label uppercase tracking-[0.15em] text-gold mb-4">
                      Uploaded Photos ({invitation.photos.length})
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {invitation.photos.map((photo) => (
                        <motion.div
                          key={photo.id}
                          layout
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="group relative aspect-square rounded-elegant overflow-hidden border border-gold/10"
                        >
                          <ImageZoom className="w-full h-full">
                            <img
                              src={photo.url}
                              alt={photo.caption || 'Gallery photo'}
                              className="w-full h-full object-cover"
                            />
                          </ImageZoom>
                          {photo.caption && (
                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm px-2 py-1.5">
                              <p className="font-body text-xs text-ivory/70 truncate">
                                {photo.caption}
                              </p>
                            </div>
                          )}
                          <button
                            onClick={() => onRemovePhoto(photo.id)}
                            className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/60 backdrop-blur-sm border border-gold/20 flex items-center justify-center text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Music Tab */}
            {activeTab === 'music' && (
              <div className="space-y-6">
                {/* Current Music */}
                {invitation.music && (
                  <div className="p-4 rounded-elegant border border-gold/10 bg-gold/5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
                          <Music className="h-5 w-5 text-gold" />
                        </div>
                        <div>
                          <p className="font-body text-sm font-medium text-ivory">
                            {invitation.music.title}
                          </p>
                          <p className="font-body text-xs text-ivory/40">
                            {invitation.music.artist}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={onRemoveMusic}
                        className="h-8 w-8 rounded-elegant border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Add/Update Music */}
                <form onSubmit={handleSubmit(onMusicSubmit)} className="space-y-4">
                  <p className="font-body text-label uppercase tracking-[0.15em] text-gold">
                    {invitation.music ? 'Change Music' : 'Add Music'}
                  </p>
                  <Input
                    label="Song Title"
                    placeholder="e.g., La Vie en Rose"
                    error={errors.music?.title?.message}
                    {...register('music.title')}
                  />
                  <Input
                    label="Artist"
                    placeholder="e.g., Edith Piaf"
                    error={errors.music?.artist?.message}
                    {...register('music.artist')}
                  />
                  <Input
                    label="Audio URL"
                    placeholder="https://example.com/song.mp3"
                    error={errors.music?.url?.message}
                    {...register('music.url')}
                  />
                  <Button variant="gold" size="md" type="submit">
                    <Check className="mr-2 h-4 w-4" />
                    {invitation.music ? 'Update Music' : 'Add Music'}
                  </Button>
                </form>
              </div>
            )}
          </GlassPanel>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
