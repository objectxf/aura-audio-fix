'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { specSections } from '@/lib/product'

export function ProductAccordion() {
  const [openId, setOpenId] = useState<string | null>(specSections[0].id)

  return (
    <section id="details" aria-labelledby="details-heading" className="border-t border-border">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400">The Details</p>
          <h2 id="details-heading" className="mt-3 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Engineered for the studio. Built for everywhere else.
          </h2>
          <p className="mt-4 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
            Every component is designed, tuned and tested in-house in Copenhagen — from the beryllium driver to the
            replaceable memory foam cushions.
          </p>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <div className="border-t border-border">
            {specSections.map((section) => {
              const isOpen = openId === section.id
              const panelId = `panel-${section.id}`
              const buttonId = `button-${section.id}`
              return (
                <div key={section.id} className="border-b border-border">
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenId(isOpen ? null : section.id)}
                      className="group flex w-full items-center justify-between py-6 text-left"
                    >
                      <span className="text-[15px] font-medium text-foreground">{section.title}</span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="text-muted-foreground transition-colors group-hover:text-foreground"
                      >
                        <Plus className="size-4" strokeWidth={1.5} aria-hidden="true" />
                      </motion.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <dl className="pb-6">
                          {section.rows.map(([term, value]) => (
                            <div key={term} className="grid grid-cols-5 gap-4 border-t border-dashed border-border py-3 text-[13px]">
                              <dt className="col-span-2 text-muted-foreground">{term}</dt>
                              <dd className="col-span-3 text-foreground">{value}</dd>
                            </div>
                          ))}
                        </dl>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
