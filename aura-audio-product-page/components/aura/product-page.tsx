'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { colors, product, sharedImages, type ColorOption, type Currency } from '@/lib/product'
import { SiteHeader } from './site-header'
import { ProductGallery } from './product-gallery'
import { ProductDetails } from './product-details'
import { ProductAccordion } from './product-accordion'
import { MobileConversionBar } from './mobile-conversion-bar'
import { SiteFooter } from './site-footer'

export function ProductPage() {
  const [currency, setCurrency] = useState<Currency>('USD')
  const [color, setColor] = useState<ColorOption>(colors[0])
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [bagCount, setBagCount] = useState(1)
  const [justAdded, setJustAdded] = useState(false)
  const [ctaInView, setCtaInView] = useState(true)
  const ctaRef = useRef<HTMLDivElement>(null)
  const addedTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const images = useMemo(
    () => [{ src: color.image, alt: `${product.name} in ${color.name}` }, ...sharedImages],
    [color],
  )

  useEffect(() => {
    const node = ctaRef.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => setCtaInView(entry.isIntersecting), {
      rootMargin: '0px 0px -40px 0px',
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => () => clearTimeout(addedTimer.current), [])

  function handleColorChange(next: ColorOption) {
    setColor(next)
    setActiveImage(0)
  }

  function handleAddToBag() {
    setBagCount((count) => count + quantity)
    setJustAdded(true)
    clearTimeout(addedTimer.current)
    addedTimer.current = setTimeout(() => setJustAdded(false), 1800)
  }

  return (
    <>
      <SiteHeader bagCount={bagCount} currency={currency} onCurrencyChange={setCurrency} />

      <main className="pb-24 sm:pb-0">
        <nav aria-label="Breadcrumb" className="mx-auto max-w-[1440px] px-4 pt-5 sm:px-6 lg:px-10">
          <ol className="flex items-center gap-2 text-[12px] text-muted-foreground">
            <li>
              <a href="#" className="transition-colors hover:text-foreground">Shop</a>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <a href="#" className="transition-colors hover:text-foreground">Headphones</a>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">Studio Wireless</li>
          </ol>
        </nav>

        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 pb-16 pt-5 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:pb-24">
          <div className="lg:col-span-7">
            <ProductGallery images={images} activeIndex={activeImage} onSelect={setActiveImage} />
          </div>
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <ProductDetails
                ref={ctaRef}
                currency={currency}
                color={color}
                onColorChange={handleColorChange}
                quantity={quantity}
                onQuantityChange={setQuantity}
                justAdded={justAdded}
                onAddToBag={handleAddToBag}
              />
            </div>
          </div>
        </div>

        <ProductAccordion />
      </main>

      <SiteFooter />

      <MobileConversionBar
        visible={!ctaInView}
        currency={currency}
        colorName={color.name}
        justAdded={justAdded}
        onAddToBag={handleAddToBag}
      />

      <p className="sr-only" aria-live="polite">
        {justAdded ? `${product.name} added to bag. Bag now has ${bagCount} items.` : ''}
      </p>
    </>
  )
}
