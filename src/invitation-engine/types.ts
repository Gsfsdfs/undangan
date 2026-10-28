import type { Event } from '@/types'

/**
 * Kontrak komponen template undangan.
 * PublicInvitation merender <TemplateComponent event={event} guestName={guestName} />
 */
export interface InvitationTemplateProps {
  event: Event
  guestName: string
}

export type TemplateCategory = 'heritage' | 'premium'

export interface TemplateMeta {
  /** ID slug template, mis. 'heritage-aruna' */
  id: string
  name: string
  category: TemplateCategory
  /** Path thumbnail relatif public/, mis. '/templates/heritage-aruna/screenshots/full-page.png' */
  preview: string
  active: boolean
  description?: string
}
