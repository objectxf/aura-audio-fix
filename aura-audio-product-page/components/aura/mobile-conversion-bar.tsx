'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { formatPrice, product, type Currency } from '@/lib/product'

type MobileConversionBarProps = {
  visible: boolean
  currency: Currency
  colorName: string
  justAdded: boolean
  onAddToBag: () => void
}

export function MobileConversionBar({ visible, currency, colorName, justAdded, onAddToBag }: MobileConversionBarProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md sm:hidden"
        >
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <p className="truncate text-[13px] font-medium text-foreground">{product.shortName}</p>
              <p className="truncate text-xs tabular-nums text-muted-foreground">
                {formatPrice(currency)} · {colorName}
              </p>
            </div>
            <button
              type="button"
              onClick={onAddToBag}
              className="h-11 shrink-0 rounded-md bg-foreground px-5 text-[12px] font-medium uppercase tracking-[0.14em] text-background transition-opacity active:opacity-80"
            >
              {justAdded ? 'Added' : 'Add to Bag'}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
