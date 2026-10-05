'use client'

import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

export type GalleryImage = { src: string; alt: string }

type ProductGalleryProps = {
  images: GalleryImage[]
  activeIndex: number
  onSelect: (index: number) => void
}

export function ProductGallery({ images, activeIndex, onSelect }: ProductGalleryProps) {
  const active = images[activeIndex] ?? images[0]

  return (
    <section aria-label="Product images" className="flex flex-col-reverse gap-3 lg:flex-row lg:gap-4">
      <ul className="flex gap-2 lg:w-20 lg:flex-col lg:gap-3" role="list">
        {images.map((image, index) => (
          <li key={image.src} className="w-16 shrink-0 sm:w-20">
            <button
              type="button"
              onClick={() => onSelect(index)}
              aria-label={`View image ${index + 1} of ${images.length}`}
              aria-current={index === activeIndex}
              className={`relative block aspect-[4/5] w-full overflow-hidden rounded-md bg-surface ring-offset-2 transition-all ${
                index === activeIndex ? 'ring-1 ring-foreground' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <Image src={image.src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          </li>
        ))}
      </ul>

      <div className="relative aspect-[4/5] w-full flex-1 overflow-hidden rounded-md bg-surface">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={active.src}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={active.src}
              alt={active.alt}
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <span className="absolute bottom-4 left-4 font-mono text-[11px] tabular-nums text-muted-foreground">
          {String(activeIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  )
}
