import { cn } from '@/lib/utils';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'outline' | 'ghost' | 'ivory' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'gold', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-body font-medium tracking-wide transition-all duration-500 ease-luxury focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      gold: 'bg-gold text-black hover:bg-gold-400 active:bg-gold-600 shadow-gold hover:shadow-gold-lg',
      outline:
        'border border-gold/40 text-gold hover:bg-gold/10 hover:border-gold/60 active:bg-gold/20',
      ghost: 'text-gold hover:bg-gold/10 active:bg-gold/20',
      ivory:
        'bg-ivory text-black hover:bg-ivory-400 active:bg-ivory-600 shadow-dark hover:shadow-dark-lg',
      dark: 'bg-black-50 border border-gold/20 text-ivory hover:bg-black-100 hover:border-gold/40 active:bg-black-200',
    };

    const sizes = {
      sm: 'px-5 py-2 text-label uppercase',
      md: 'px-8 py-3 text-body-sm',
      lg: 'px-10 py-4 text-body-md',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
