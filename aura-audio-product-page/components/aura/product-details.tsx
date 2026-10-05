'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { Check, Minus, Plus, RotateCcw, ShieldCheck, Star, Truck, Zap } from 'lucide-react'
import { colors, formatPrice, product, type ColorOption, type Currency } from '@/lib/product'

type ProductDetailsProps = {
  currency: Currency
  color: ColorOption
  onColorChange: (color: ColorOption) => void
  quantity: number
  onQuantityChange: (quantity: number) => void
  justAdded: boolean
  onAddToBag: () => void
}

const trustItems = [
  { icon: ShieldCheck, label: '2-Year International Warranty' },
  { icon: RotateCcw, label: '30-Day Risk-Free Trial' },
  { icon: Zap, label: 'Dispatched in 24 Hours' },
]

export const ProductDetails = forwardRef<HTMLDivElement, ProductDetailsProps>(function ProductDetails(
  { currency, color, onColorChange, quantity, onQuantityChange, justAdded, onAddToBag },
  ctaRef,
) {
  return (
    <div className="flex flex-col">
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400">{product.collection}</p>

      <h1 className="mt-3 text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-4xl">
        {product.name}
      </h1>

      <a href="#details" className="mt-4 inline-flex w-fit items-center gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground">
        <Star className="size-3.5 fill-foreground text-foreground" strokeWidth={1.5} aria-hidden="true" />
        <span className="font-medium text-foreground">{product.rating}</span>
        <span className="underline decoration-border underline-offset-4">({product.reviews} reviews)</span>
      </a>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <p className="text-xl font-medium tabular-nums text-foreground">
          {formatPrice(currency)} <span className="text-sm font-normal text-muted-foreground">{currency}</span>
        </p>
        <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-2 py-1 text-[11px] font-medium text-foreground">
          <Truck className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
          Free Express Shipping
        </span>
      </div>

      <hr className="my-8 border-border" />

      <fieldset>
        <legend className="flex w-full items-baseline justify-between text-[13px]">
          <span className="font-medium text-foreground">Color</span>
          <span className="text-muted-foreground">{color.name}</span>
        </legend>
        <div className="mt-4 flex gap-3" role="radiogroup" aria-label="Color">
          {colors.map((option) => {
            const selected = option.id === color.id
            return (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={selected}
                aria-label={option.name}
                title={option.name}
                onClick={() => onColorChange(option)}
                className="relative flex size-10 items-center justify-center rounded-full"
              >
                {selected && (
                  <motion.span
                    layoutId="swatch-ring"
                    className="absolute inset-0 rounded-full border border-foreground"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <span
                  className="size-7 rounded-full border border-black/10 transition-transform hover:scale-105"
                  style={{ backgroundColor: option.swatch }}
                />
              </button>
            )
          })}
        </div>
      </fieldset>

      <div className="mt-8">
        <span id="quantity-label" className="block text-[13px] font-medium text-foreground">
          Quantity
        </span>
        <div
          className="mt-4 inline-flex h-11 items-center rounded-md border border-border"
          role="group"
          aria-labelledby="quantity-label"
        >
          <button
            type="button"
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            className="flex h-full w-11 items-center justify-center text-foreground transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:text-neutral-300"
          >
            <Minus className="size-3.5" strokeWidth={1.5} />
          </button>
          <span className="w-10 text-center font-mono text-sm tabular-nums" aria-live="polite">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => onQuantityChange(Math.min(10, quantity + 1))}
            disabled={quantity >= 10}
            aria-label="Increase quantity"
            className="flex h-full w-11 items-center justify-center text-foreground transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:text-neutral-300"
          >
            <Plus className="size-3.5" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div ref={ctaRef} className="mt-8 flex flex-col gap-2.5">
        <motion.button
          type="button"
          onClick={onAddToBag}
          whileHover={{ scale: 1.005 }}
          whileTap={{ scale: 0.99 }}
          className="relative flex h-12 w-full items-center justify-center overflow-hidden rounded-md bg-foreground text-[13px] font-medium uppercase tracking-[0.16em] text-background transition-opacity hover:opacity-90"
        >
          <motion.span
            key={justAdded ? 'added' : 'add'}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="inline-flex items-center gap-2"
          >
            {justAdded ? (
              <>
                <Check className="size-4" strokeWidth={2} aria-hidden="true" /> Added to Bag
              </>
            ) : (
              <>Add to Bag — {formatPrice(currency, quantity)}</>
            )}
          </motion.span>
        </motion.button>
        <button
          type="button"
          className="flex h-12 w-full items-center justify-center rounded-md border border-foreground bg-background text-[13px] font-medium text-foreground transition-colors hover:bg-surface"
        >
          Buy with <span className="ml-1 font-semibold">Apple Pay</span>
        </button>
      </div>

      <ul className="mt-8 flex flex-col divide-y divide-border border-y border-border" role="list">
        {trustItems.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-3 py-3.5 text-[13px] text-foreground">
            <Icon className="size-4 text-muted-foreground" strokeWidth={1.5} aria-hidden="true" />
            {label}
          </li>
        ))}
      </ul>
    </div>
  )
})
