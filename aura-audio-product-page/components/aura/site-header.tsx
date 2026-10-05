'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, Search, X } from 'lucide-react'
import { currencies, type Currency } from '@/lib/product'

const navLinks = ['Shop', 'Studio', 'Technology', 'Journal']

type SiteHeaderProps = {
  bagCount: number
  currency: Currency
  onCurrencyChange: (currency: Currency) => void
}

export function SiteHeader({ bagCount, currency, onCurrencyChange }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-10">
          <button
            type="button"
            className="-ml-2 inline-flex size-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="size-[18px]" strokeWidth={1.5} /> : <Menu className="size-[18px]" strokeWidth={1.5} />}
          </button>

          <a href="#" className="text-[15px] font-semibold tracking-[0.32em] text-foreground" aria-label="AURA Audio home">
            AURA
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-7">
              {navLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                    aria-current={link === 'Shop' ? 'page' : undefined}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <label className="relative hidden items-center sm:flex">
            <span className="sr-only">Currency</span>
            <select
              value={currency}
              onChange={(event) => onCurrencyChange(event.target.value as Currency)}
              className="h-9 cursor-pointer appearance-none rounded-md bg-transparent pl-2.5 pr-7 text-[13px] text-foreground transition-colors hover:bg-accent focus-visible:outline-2"
            >
              {(Object.keys(currencies) as Currency[]).map((code) => (
                <option key={code} value={code}>
                  {code} {currencies[code].symbol}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 size-3.5 text-muted-foreground" strokeWidth={1.5} aria-hidden="true" />
          </label>

          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent"
            aria-label="Search"
          >
            <Search className="size-[18px]" strokeWidth={1.5} />
          </button>

          <button
            type="button"
            className="inline-flex h-9 items-center rounded-md px-2.5 text-[13px] font-medium text-foreground transition-colors hover:bg-accent"
            aria-label={`Bag, ${bagCount} ${bagCount === 1 ? 'item' : 'items'}`}
          >
            Bag
            <span className="ml-1 font-mono tabular-nums">
              [
              <motion.span
                key={bagCount}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="inline-block"
              >
                {bagCount}
              </motion.span>
              ]
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-background md:hidden"
          >
            <ul className="flex flex-col px-4 py-2">
              {navLinks.map((link) => (
                <li key={link} className="border-b border-border last:border-b-0">
                  <a href="#" className="block py-4 text-xl font-medium tracking-tight text-foreground" onClick={() => setMenuOpen(false)}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between border-t border-border px-4 py-4">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Currency</span>
              <div className="flex gap-1">
                {(Object.keys(currencies) as Currency[]).map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => onCurrencyChange(code)}
                    aria-pressed={currency === code}
                    className={`rounded-md border px-3 py-1.5 text-xs transition-colors ${
                      currency === code ? 'border-foreground text-foreground' : 'border-border text-muted-foreground'
                    }`}
                  >
                    {code} {currencies[code].symbol}
                  </button>
                ))}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
