import { cn } from '@/lib/utils';
import { type HTMLAttributes, forwardRef } from 'react';

export interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'dark' | 'light' | 'gold';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  border?: boolean;
  glow?: boolean;
}

const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  (
    { className, variant = 'dark', padding = 'md', border = true, glow = false, children, ...props },
    ref
  ) => {
    const baseStyles = 'rounded-soft overflow-hidden transition-all duration-500 ease-luxury';

    const variants = {
      dark: 'glass-panel',
      light: 'glass-panel-light',
      gold: 'bg-gold/5 backdrop-blur-xl border border-gold/20',
    };

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6 md:p-8',
      lg: 'p-8 md:p-10',
      xl: 'p-10 md:p-14',
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          paddings[padding],
          border && variant !== 'gold' && 'border border-gold/10',
          glow && 'shadow-gold',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassPanel.displayName = 'GlassPanel';

export { GlassPanel };
