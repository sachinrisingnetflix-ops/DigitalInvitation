import { cn } from '@/lib/utils';
import { type InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block font-body text-label uppercase tracking-[0.15em] text-ivory/70">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full bg-black-50 border border-gold/15 text-ivory placeholder:text-ivory/30',
              'font-body text-body-md',
              'rounded-elegant px-4 py-3',
              'transition-all duration-300 ease-luxury',
              'focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20',
              'hover:border-gold/30',
              icon && 'pl-11',
              error && 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="font-body text-body-sm text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
