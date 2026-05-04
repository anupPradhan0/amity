import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-display font-black uppercase tracking-widest transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:translate-y-1 active:shadow-none',
  {
    variants: {
      variant: {
        default:
          'bg-yellow text-deep border-4 border-deep shadow-[4px_4px_0px_0px_rgba(13,27,42,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(13,27,42,1)]',
        deep:
          'bg-deep text-white border-4 border-deep hover:bg-white hover:text-deep shadow-[4px_4px_0px_0px_rgba(13,27,42,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(13,27,42,1)]',
        ghost:
          'bg-transparent text-white border-4 border-white hover:bg-white hover:text-deep hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]',
        outline:
          'bg-transparent text-deep border-4 border-deep hover:bg-yellow hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(13,27,42,1)]',
        link: 'text-deep underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-12 px-8 py-2 text-sm',
        sm:      'h-10 px-6 py-1 text-xs',
        lg:      'h-16 px-10 py-3 text-base',
        icon:    'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
