import { motion } from 'framer-motion';
import {
  Pencil,
  Trash2,
  Eye,
  Send,
  FileText,
  Image,
  Music,
  ChevronDown,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import type { InvitationWithMedia } from '@/hooks/useInvitations';

interface InvitationListProps {
  invitations: InvitationWithMedia[];
  onEdit: (inv: InvitationWithMedia) => void;
  onDelete: (id: string) => void;
  onPreview: (inv: InvitationWithMedia) => void;
  onPublish: (id: string) => void;
  onUnpublish: (id: string) => void;
  onManageMedia: (inv: InvitationWithMedia) => void;
}

const statusConfig = {
  draft: { label: 'Draft', className: 'bg-ivory/5 text-ivory/40 border-ivory/10' },
  sent: { label: 'Published', className: 'bg-green-500/10 text-green-400 border-green-500/20' },
  opened: { label: 'Opened', className: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  rsvp: { label: 'RSVP', className: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
};

export function InvitationList({
  invitations,
  onEdit,
  onDelete,
  onPreview,
  onPublish,
  onUnpublish,
  onManageMedia,
}: InvitationListProps) {
  return (
    <div className="space-y-4">
      {invitations.length === 0 ? (
        <Card variant="default" padding="lg" className="text-center py-16">
          <FileText className="h-12 w-12 text-gold/20 mx-auto mb-4" />
          <p className="font-body text-lg text-ivory/60">No invitations yet</p>
          <p className="font-body text-sm text-ivory/30 mt-1">
            Create your first invitation to get started
          </p>
        </Card>
      ) : (
        invitations.map((inv, index) => (
          <motion.div
            key={inv.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.08,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            <Card
              variant="default"
              padding="md"
              className="group hover-lift"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-display text-lg font-medium text-ivory group-hover:text-gold transition-colors truncate">
                      {inv.title}
                    </h3>
                    <span
                      className={cn(
                        'inline-flex items-center rounded-elegant px-2.5 py-0.5 text-xs font-medium border flex-shrink-0',
                        statusConfig[inv.status]?.className
                      )}
                    >
                      {statusConfig[inv.status]?.label}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ivory/40">
                    <span>
                      {inv.brideFirstName} & {inv.groomFirstName}
                    </span>
                    <span className="hidden sm:inline">·</span>
                    <span>
                      {new Date(inv.eventDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="hidden sm:inline">·</span>
                    <span>{inv.venueName}</span>
                    <span className="hidden sm:inline">·</span>
                    <span>{inv.recipientCount} guests</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => onPreview(inv)}
                    className="h-9 w-9 rounded-elegant border border-gold/15 flex items-center justify-center text-ivory/40 hover:text-gold hover:border-gold/40 transition-all"
                    title="Preview"
                  >
                    <Eye className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => onManageMedia(inv)}
                    className="h-9 w-9 rounded-elegant border border-gold/15 flex items-center justify-center text-ivory/40 hover:text-gold hover:border-gold/40 transition-all relative"
                    title="Manage Media"
                  >
                    <Image className="h-4 w-4" />
                    {inv.photos && inv.photos.length > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gold text-black text-[10px] font-bold flex items-center justify-center">
                        {inv.photos.length}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => onManageMedia(inv)}
                    className="h-9 w-9 rounded-elegant border border-gold/15 flex items-center justify-center text-ivory/40 hover:text-gold hover:border-gold/40 transition-all relative"
                    title="Music"
                  >
                    <Music className="h-4 w-4" />
                    {inv.music && (
                      <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-gold" />
                    )}
                  </button>

                  <div className="w-px h-6 bg-gold/10 mx-1" />

                  {inv.status === 'draft' ? (
                    <button
                      onClick={() => onPublish(inv.id)}
                      className="h-9 px-3 rounded-elegant bg-gold/10 border border-gold/20 text-gold font-body text-xs uppercase tracking-wider hover:bg-gold/20 transition-all flex items-center gap-1.5"
                    >
                      <Send className="h-3 w-3" />
                      Publish
                    </button>
                  ) : (
                    <button
                      onClick={() => onUnpublish(inv.id)}
                      className="h-9 px-3 rounded-elegant bg-ivory/5 border border-ivory/10 text-ivory/50 font-body text-xs uppercase tracking-wider hover:bg-ivory/10 transition-all flex items-center gap-1.5"
                    >
                      <ChevronDown className="h-3 w-3" />
                      Unpublish
                    </button>
                  )}

                  <button
                    onClick={() => onEdit(inv)}
                    className="h-9 w-9 rounded-elegant border border-gold/15 flex items-center justify-center text-ivory/40 hover:text-gold hover:border-gold/40 transition-all"
                    title="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => onDelete(inv.id)}
                    className="h-9 w-9 rounded-elegant border border-red-500/15 flex items-center justify-center text-red-400/60 hover:text-red-400 hover:border-red-500/40 transition-all"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))
      )}
    </div>
  );
}
