import { cn } from '@/lib/utils';
import { type HTMLAttributes, forwardRef } from 'react';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'lg', padding = 'md', children, ...props }, ref) => {
    const sizes = {
      sm: 'max-w-3xl',
      md: 'max-w-4xl',
      lg: 'max-w-6xl',
      xl: 'max-w-7xl',
      full: 'max-w-full',
    };

    const paddings = {
      none: '',
      sm: 'px-4',
      md: 'px-6 md:px-8',
      lg: 'px-8 md:px-12',
      xl: 'px-10 md:px-16',
    };

    return (
      <div
        ref={ref}
        className={cn('mx-auto w-full', sizes[size], paddings[padding], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';

export { Container };
