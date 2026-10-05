export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-10 text-[12px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
        <p>
          <span className="font-semibold tracking-[0.32em] text-foreground">AURA</span>
          <span className="ml-3">Audio Instruments, Copenhagen</span>
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {['Support', 'Warranty', 'Privacy', 'Terms'].map((link) => (
            <li key={link}>
              <a href="#" className="transition-colors hover:text-foreground">
                {link}
              </a>
            </li>
          ))}
        </ul>
        <p>{'© 2026 AURA Audio ApS'}</p>
      </div>
    </footer>
  )
}
