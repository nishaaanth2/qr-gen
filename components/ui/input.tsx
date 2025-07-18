import * as React from 'react';

import { cn } from '@/utils/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  suffix?: string;
  variant?: 'default' | 'small';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, suffix, variant = 'default', ...props }, ref) => {
    return (
      <div className={cn("relative", variant === 'small' && 'w-24')}>
        <input
          type={type}
          className={cn(
            'flex w-full rounded-md border border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
            {
              'h-10 px-3 py-2 text-sm mx-auto': variant === 'default',
              'h-6 text-xs': variant === 'small',
            },
            suffix && 'pr-8',
            className
          )}
          ref={ref}
          {...props}
        />
        {suffix && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
            {suffix}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
