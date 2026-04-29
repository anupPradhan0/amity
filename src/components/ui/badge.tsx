import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-[#F5C518] text-[#0D1B2A]',
        sky:     'bg-[#4A90D9] text-white',
        dark:    'bg-[#0D1B2A] text-white',
        surface: 'bg-[#F8F9FB] text-[#0D1B2A] border border-[#E5E7EB]',
        yellow:  'bg-[#F5C518]/15 text-[#0D1B2A] border border-[#F5C518]/40',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
