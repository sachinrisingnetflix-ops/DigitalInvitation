import { cn } from '@/lib/utils';
import { type HTMLAttributes, forwardRef } from 'react';

export interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p';
  variant?: 'display' | 'hero' | 'section' | 'card' | 'label';
  color?: 'gold' | 'ivory' | 'muted' | 'white';
  align?: 'left' | 'center' | 'right';
  ornament?: boolean;
}

const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  (
    {
      as: Component = 'h2',
      variant = 'section',
      color = 'ivory',
      align = 'left',
      ornament = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      display: 'font-display text-display-lg md:text-display-xl font-medium leading-tight',
      hero: 'font-display text-display-md md:text-display-lg font-medium leading-tight',
      section: 'font-display text-display-sm md:text-display-md font-medium leading-snug',
      card: 'font-display text-display-xs font-medium leading-snug',
      label: 'font-body text-label uppercase tracking-[0.2em] font-medium',
    };

    const colors = {
      gold: 'text-gold-gradient',
      ivory: 'text-ivory',
      muted: 'text-ivory/60',
      white: 'text-white',
    };

    const aligns = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    };

    return (
      <Component
        ref={ref}
        className={cn(variants[variant], colors[color], aligns[align], className)}
        {...props}
      >
        {ornament && variant !== 'label' ? (
          <span className="ornament">{children}</span>
        ) : (
          children
        )}
      </Component>
    );
  }
);

Title.displayName = 'Title';

export { Title };
