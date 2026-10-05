export type Currency = 'USD' | 'EUR' | 'GBP'

export const currencies: Record<Currency, { symbol: string; price: number; locale: string }> = {
  USD: { symbol: '$', price: 349, locale: 'en-US' },
  EUR: { symbol: '€', price: 329, locale: 'de-DE' },
  GBP: { symbol: '£', price: 289, locale: 'en-GB' },
}

export function formatPrice(currency: Currency, quantity = 1) {
  const { price, locale } = currencies[currency]
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(price * quantity)
}

export type ColorOption = {
  id: string
  name: string
  swatch: string
  image: string
}

export const colors: ColorOption[] = [
  { id: 'obsidian', name: 'Matte Obsidian', swatch: '#18181b', image: '/images/headphones-obsidian.png' },
  { id: 'chalk', name: 'Chalk White', swatch: '#f4f4f0', image: '/images/headphones-chalk.png' },
  { id: 'silver', name: 'Raw Silver', swatch: '#b8b8bc', image: '/images/headphones-silver.png' },
]

export const sharedImages = [
  { src: '/images/headphones-detail.png', alt: 'Close-up of the memory foam ear cushion and machined aluminium hinge' },
  { src: '/images/headphones-lifestyle.png', alt: 'AURA Studio headphones worn against a white wall' },
]

export const product = {
  name: 'AURA Studio Wireless Headphones',
  shortName: 'AURA Studio Wireless',
  collection: 'AURA / Studio Collection',
  rating: 4.9,
  reviews: 128,
}

export const specSections = [
  {
    id: 'specs',
    title: 'Technical Specifications',
    rows: [
      ['Driver', '40 mm beryllium-coated dynamic'],
      ['Frequency Response', '4 Hz – 40 kHz'],
      ['Noise Cancellation', 'Adaptive hybrid ANC, 8 microphones'],
      ['Battery', 'Up to 60 hours (ANC off), 40 hours (ANC on)'],
      ['Charging', 'USB-C, 10 min for 5 hours playback'],
      ['Connectivity', 'Bluetooth 5.4, LDAC, AAC, multipoint'],
    ],
  },
  {
    id: 'materials',
    title: 'Dimensions & Materials',
    rows: [
      ['Weight', '268 g'],
      ['Folded', '182 × 156 × 48 mm'],
      ['Frame', 'CNC-machined 6061 aluminium'],
      ['Headband', 'Vegan protein leather, stainless spring core'],
      ['Ear Cushions', 'Slow-rebound memory foam, replaceable'],
      ['Case', 'Recycled felt with magnetic closure'],
    ],
  },
  {
    id: 'shipping',
    title: 'Shipping & Global Returns',
    rows: [
      ['Dispatch', 'Within 24 hours, Monday – Friday'],
      ['Express Shipping', 'Free worldwide, 2–4 business days'],
      ['Duties', 'Included for US, EU, UK, CA and AU'],
      ['Returns', '30-day risk-free trial, free return label'],
      ['Warranty', '2-year international coverage'],
    ],
  },
] as const
