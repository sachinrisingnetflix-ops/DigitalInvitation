import { cn } from '@/lib/utils';
import { Title } from './Title';

export interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  titleClassName?: string;
  showLine?: boolean;
}

export function SectionHeader({
  label,
  title,
  subtitle,
  align = 'center',
  className,
  titleClassName,
  showLine = true,
}: SectionHeaderProps) {
  return (
    <div className={cn('space-y-4', align === 'center' && 'text-center', className)}>
      {label && (
        <Title as="span" variant="label" color="gold" align={align}>
          {label}
        </Title>
      )}
      <Title
        as="h2"
        variant="section"
        color="ivory"
        align={align}
        ornament={align === 'center'}
        className={titleClassName}
      >
        {title}
      </Title>
      {showLine && align === 'center' && <div className="gold-line w-24 mx-auto mt-6" />}
      {showLine && align !== 'center' && <div className="gold-line w-24 mt-6" />}
      {subtitle && (
        <p
          className={cn(
            'font-body text-body-md text-ivory/60 max-w-2xl mt-4',
            align === 'center' && 'mx-auto'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
