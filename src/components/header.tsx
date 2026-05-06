import { cn } from '#/lib/utils'

function Header({ className, ...props }: React.ComponentProps<'header'>) {
  return <header className={cn('sticky top-0 z-10 bg-background', className)} {...props} />
}

function HeaderContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('mx-auto flex w-full max-w-6xl items-center p-4 sm:gap-4', className)}
      {...props}
    />
  )
}

export { Header, HeaderContent }
