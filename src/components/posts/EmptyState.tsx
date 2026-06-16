import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type EmptyStateProps = {
    title: string
    description?: string
    actionLabel?: string
    actionHref?: string
    className?: string
}

export function EmptyState({
    title,
    description,
    actionLabel,
    actionHref,
    className,
}: EmptyStateProps) {
    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center py-20 text-center text-muted-foreground',
                className
            )}
        >
            <p className="text-lg font-medium text-foreground">{title}</p>

            {description && (
                <p className="text-sm mt-1 max-w-md">{description}</p>
            )}

            {actionLabel && actionHref && (
                <Button asChild className="mt-6">
                    <Link href={actionHref}>{actionLabel}</Link>
                </Button>
            )}
        </div>
    )
}