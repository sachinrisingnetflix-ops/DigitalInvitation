import { cn } from '@/lib/utils';
import { type HTMLAttributes, forwardRef } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'gold' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', children, ...props }, ref) => {
    const baseStyles = 'rounded-elegant overflow-hidden transition-all duration-500 ease-luxury';

    const variants = {
      default: 'bg-black-50 border border-gold/10 hover:border-gold/25',
      glass: 'glass-panel',
      gold: 'bg-gold/5 border border-gold/20 hover:border-gold/40',
      elevated:
        'bg-black-50 border border-gold/10 hover:border-gold/25 hover-lift',
    };

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], paddings[padding], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export { Card };
