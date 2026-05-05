import { cn } from '@/lib/utils'

export function Title({ className, ...props }: React.ComponentProps<'h1'>) {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-center text-4xl font-medium tracking-tight text-balance',
        className,
      )}
      {...props}
    />
  )
}

export function Heading({ className, ...props }: React.ComponentProps<'h2'>) {
  return (
    <h2
      className={cn('scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0', className)}
      {...props}
    />
  )
}

export function Subheading({ className, ...props }: React.ComponentProps<'h3'>) {
  return (
    <h3 className={cn('scroll-m-20 text-2xl font-semibold tracking-tight', className)} {...props} />
  )
}

export function Text({ className, ...props }: React.ComponentProps<'p'>) {
  return <p className={cn('leading-7 not-first:mt-6', className)} {...props} />
}

export function Blockquote({ className, ...props }: React.ComponentProps<'blockquote'>) {
  return (
    <blockquote className={cn('mt-6 border-l-2 border-primary/50 pl-6', className)} {...props} />
  )
}

export function List({ className, ...props }: React.ComponentProps<'ul'>) {
  return <ul className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)} {...props} />
}

export function Lead({ className, ...props }: React.ComponentProps<'p'>) {
  return <p className={cn('text-xl text-muted-foreground', className)} {...props} />
}

export function Large({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('text-lg font-semibold', className)} {...props} />
}

export function Small({ className, ...props }: React.ComponentProps<'small'>) {
  return <small className={cn('text-sm leading-none font-medium', className)} {...props} />
}

export function Muted({ className, ...props }: React.ComponentProps<'p'>) {
  return <p className={cn('text-sm text-muted-foreground', className)} {...props} />
}
