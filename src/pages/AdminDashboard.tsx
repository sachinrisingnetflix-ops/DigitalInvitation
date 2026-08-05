import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  TrendingUp,
  TrendingDown,
  Mail,
  Users,
  Eye,
  PartyPopper,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Title } from '@/components/ui/Title';
import { Card } from '@/components/ui/Card';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { useInvitations } from '@/hooks/useInvitations';
import type { InvitationFormData } from '@/schemas/invitation';
import { InvitationForm } from '@/components/admin/InvitationForm';
import { InvitationList } from '@/components/admin/InvitationList';
import { MediaUploader } from '@/components/admin/MediaUploader';
import { PreviewModal } from '@/components/admin/PreviewModal';
import type { InvitationWithMedia } from '@/hooks/useInvitations';

const stats = [
  { label: 'Total Invitations', value: '142', icon: Mail, change: '+12%', positive: true },
  { label: 'Recipients', value: '12,450', icon: Users, change: '+8%', positive: true },
  { label: 'Open Rate', value: '78.4%', icon: Eye, change: '+5.2%', positive: true },
  { label: 'RSVP Rate', value: '62.1%', icon: PartyPopper, change: '-2.1%', positive: false },
];

export function AdminDashboard() {
  const {
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
  } = useInvitations();

  const [showForm, setShowForm] = useState(false);
  const [editingInvitation, setEditingInvitation] = useState<InvitationWithMedia | null>(null);
  const [mediaInvitation, setMediaInvitation] = useState<InvitationWithMedia | null>(null);
  const [previewInvitation, setPreviewInvitation] = useState<InvitationWithMedia | null>(null);

  const handleCreate = () => {
    setEditingInvitation(null);
    setShowForm(true);
  };

  const handleEdit = (inv: InvitationWithMedia) => {
    setEditingInvitation(inv);
    setShowForm(true);
  };

  const handleSubmit = (data: InvitationFormData) => {
    if (editingInvitation) {
      update(editingInvitation.id, data);
    } else {
      create(data);
    }
    setShowForm(false);
    setEditingInvitation(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this invitation?')) {
      remove(id);
    }
  };

  const handleManageMedia = (inv: InvitationWithMedia) => {
    setMediaInvitation(inv);
  };

  const handlePreview = (inv: InvitationWithMedia) => {
    setPreviewInvitation(inv);
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Title as="h1" variant="card" color="ivory">
            Dashboard
          </Title>
          <p className="font-body text-sm text-ivory/40 mt-1">
            Manage your invitations and track performance
          </p>
        </div>
        <Button variant="gold" size="md" onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          New Invitation
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
          >
            <Card variant="default" padding="md" className="hover-lift">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <p className="font-body text-xs uppercase tracking-[0.15em] text-ivory/40">
                    {s.label}
                  </p>
                  <p className="font-display text-3xl font-medium text-ivory">
                    {s.value}
                  </p>
                  <div
                    className={`inline-flex items-center gap-1 font-body text-sm ${
                      s.positive ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {s.positive ? (
                      <TrendingUp className="h-3.5 w-3.5" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5" />
                    )}
                    {s.change}
                  </div>
                </div>
                <div className="h-10 w-10 rounded-elegant bg-gold/10 border border-gold/15 flex items-center justify-center">
                  <s.icon className="h-4 w-4 text-gold" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Invitations List */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <Title as="h2" variant="card" color="ivory">
            Your Invitations ({items.length})
          </Title>
        </div>

        <InvitationList
          invitations={items}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onPreview={handlePreview}
          onPublish={publish}
          onUnpublish={unpublish}
          onManageMedia={handleManageMedia}
        />
      </div>

      {/* Activity Chart */}
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
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.8, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
                    className="w-full bg-gold/20 rounded-t-sm hover:bg-gold/40 transition-colors duration-300"
                  />
                  <span className="font-body text-xs text-ivory/30">
                    {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}
                  </span>
                </div>
              );
            })}
          </div>
        </GlassPanel>
      </div>

      {/* Modals */}
      {showForm && (
        <InvitationForm
          invitation={editingInvitation}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingInvitation(null);
          }}
        />
      )}

      {mediaInvitation && (
        <MediaUploader
          invitation={mediaInvitation}
          onAddPhotos={(photos) => addPhotos(mediaInvitation.id, photos)}
          onRemovePhoto={(photoId) => removePhoto(mediaInvitation.id, photoId)}
          onSetMusic={(music) => setMusic(mediaInvitation.id, music)}
          onRemoveMusic={() => removeMusic(mediaInvitation.id)}
          onClose={() => setMediaInvitation(null)}
        />
      )}

      {previewInvitation && (
        <PreviewModal
          invitation={previewInvitation}
          onClose={() => setPreviewInvitation(null)}
        />
      )}
    </div>
  );
}
