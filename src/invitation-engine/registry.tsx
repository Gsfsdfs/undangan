import type { ComponentType } from 'react'
import type { InvitationTemplateProps, TemplateMeta } from './types'

import HeritageAruna from './templates/heritage/HeritageAruna'
import HeritageSandhayu from './templates/heritage/HeritageSandhayu'
import HeritageUtary from './templates/heritage/HeritageUtary'
import Premium01 from './templates/premium/Premium01'
import Premium02 from './templates/premium/Premium02'
import PremiumDanila from './templates/premium/PremiumDanila'
import PremiumFlara from './templates/premium/PremiumFlara'
import PremiumIvanna from './templates/premium/PremiumIvanna'
import PremiumKila from './templates/premium/PremiumKila'

interface TemplateEntry extends TemplateMeta {
  component: ComponentType<InvitationTemplateProps>
}

export const TEMPLATES: TemplateEntry[] = [
  {
    id: 'heritage-aruna',
    name: 'Heritage Aruna',
    category: 'heritage',
    preview: '/templates/heritage-aruna/screenshots/full-page.png',
    active: true,
    description: 'Desain klasik Jawa dengan palet hijau tua, emas, dan ornamen batik.',
    component: HeritageAruna,
  },
  {
    id: 'heritage-sandhayu',
    name: 'Heritage Sandhayu',
    category: 'heritage',
    preview: '/templates/heritage-sandhayu/screenshots/full-page.png',
    active: true,
    description: 'Series heritage dengan nuansa klasik dan ornamen tradisional.',
    component: HeritageSandhayu,
  },
  {
    id: 'heritage-utary',
    name: 'Heritage Utary',
    category: 'heritage',
    preview: '/templates/heritage-utary/screenshots/full-page.png',
    active: true,
    description: 'Series heritage dengan tipografi elegan dan ornament klasik.',
    component: HeritageUtary,
  },
  {
    id: 'premium-01',
    name: 'Premium 01',
    category: 'premium',
    preview: '/templates/premium-01/screenshots/full-page.png',
    active: true,
    component: Premium01,
  },
  {
    id: 'premium-02',
    name: 'Premium 02',
    category: 'premium',
    preview: '/templates/premium-02/screenshots/full-page.png',
    active: true,
    component: Premium02,
  },
  {
    id: 'premium-danila',
    name: 'Premium Danila',
    category: 'premium',
    preview: '/templates/premium-danila/screenshots/full-page.png',
    active: true,
    component: PremiumDanila,
  },
  {
    id: 'premium-flara',
    name: 'Premium Flara',
    category: 'premium',
    preview: '/templates/premium-flara/screenshots/full-page.png',
    active: true,
    component: PremiumFlara,
  },
  {
    id: 'premium-ivanna',
    name: 'Premium Ivanna',
    category: 'premium',
    preview: '/templates/premium-ivanna/screenshots/full-page.png',
    active: true,
    component: PremiumIvanna,
  },
  {
    id: 'premium-kila',
    name: 'Premium Kila',
    category: 'premium',
    preview: '/templates/premium-kila/screenshots/full-page.png',
    active: true,
    component: PremiumKila,
  },
]

export function getTemplateMeta(templateId: string): TemplateMeta | undefined {
  return TEMPLATES.find((t) => t.id === templateId)
}

/**
 * Ambil komponen template berdasarkan ID slug (mis. 'heritage-aruna').
 * Selalu mengembalikan komponen yang informatif — halaman publik tidak pernah crash.
 */
export function getTemplate(templateId: string): ComponentType<InvitationTemplateProps> {
  const entry = TEMPLATES.find((t) => t.id === templateId)
  if (entry) return entry.component
  return UnknownTemplate
}

function UnknownTemplate({ event }: InvitationTemplateProps) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        fontFamily: 'Georgia, serif',
        background: '#faf7f2',
        color: '#4a3f35',
        textAlign: 'center',
      }}
    >
      <div>
        <p style={{ fontSize: '2rem', letterSpacing: '0.2em' }}>THE WEDDING OF</p>
        <h1 style={{ fontWeight: 400, margin: '0.5rem 0 1rem' }}>
          {event.bride_name ?? ''} & {event.groom_name ?? ''}
        </h1>
        <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>
          {event.template_id
            ? `Template "${event.template_id}" belum tersedia. Silakan pilih template lain pada halaman Template & Publikasi.`
            : 'Template belum dipilih untuk event ini.'}
        </p>
        {event.status === 'published' && event.slug && (
          <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>
            Undangan {event.title} — /undangan/{event.slug}
          </p>
        )}
      </div>
    </div>
  )
}
