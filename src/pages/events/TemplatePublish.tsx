import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ExternalLink, Save } from 'lucide-react'
import EventWorkspaceLayout from '@/components/layout/EventWorkspaceLayout'
import { supabase } from '@/lib/supabase'
import type { Event, EventTemplate } from '@/types'

/**
 * Registry internal invitation-engine (sumber nama + preview).
 * Tabel event_templates di DB tetap sumber kebenaran UUID/slug/active.
 */
export const TEMPLATE_REGISTRY_ENTRIES: { slug: string; name: string; category: 'heritage' | 'premium'; preview: string }[] = [
  { slug: 'heritage-aruna', name: 'Heritage Aruna', category: 'heritage', preview: '/templates/heritage-aruna/screenshots/full-page.png' },
  { slug: 'heritage-sandhayu', name: 'Heritage Sandhayu', category: 'heritage', preview: '/templates/heritage-sandhayu/screenshots/full-page.png' },
  { slug: 'heritage-utary', name: 'Heritage Utary', category: 'heritage', preview: '/templates/heritage-utary/screenshots/full-page.png' },
  { slug: 'premium-01', name: 'Premium 01', category: 'premium', preview: '/templates/premium-01/screenshots/full-page.png' },
  { slug: 'premium-02', name: 'Premium 02', category: 'premium', preview: '/templates/premium-02/screenshots/full-page.png' },
  { slug: 'premium-danila', name: 'Premium Danila', category: 'premium', preview: '/templates/premium-danila/screenshots/full-page.png' },
  { slug: 'premium-flara', name: 'Premium Flara', category: 'premium', preview: '/templates/premium-flara/screenshots/full-page.png' },
  { slug: 'premium-ivanna', name: 'Premium Ivanna', category: 'premium', preview: '/templates/premium-ivanna/screenshots/full-page.png' },
  { slug: 'premium-kila', name: 'Premium Kila', category: 'premium', preview: '/templates/premium-kila/screenshots/full-page.png' },
]

export default function TemplatePublish() {
  const { id } = useParams()
  const [event, setEvent] = useState<Event | null>(null)
  const [templates, setTemplates] = useState<EventTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [templateId, setTemplateId] = useState('')
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>('draft')

  useEffect(() => {
    if (id) fetchEvent()
  }, [id])

  const fetchEvent = async () => {
    try {
      const [{ data: evData, error: evError }, { data: tplData, error: tplError }] = await Promise.all([
        supabase.from('events').select('*').eq('id', id).single(),
        supabase.from('event_templates').select('*').order('category', { ascending: true }),
      ])
      if (evError) throw evError
      if (tplError) console.warn('event_templates fetch:', tplError.message)
      setEvent(evData)
      setTemplates(tplData ?? [])
      setTemplateId(evData.template_id || '')
      setStatus((evData.status as 'draft' | 'published' | 'archived') || 'draft')
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!event) return
    setSaving(true)
    try {
      const updateData: Record<string, unknown> = { template_id: templateId || null, status }
      if (status === 'published' && event.status !== 'published') {
        updateData.published_at = new Date().toISOString()
      }
      const { error } = await supabase.from('events').update(updateData).eq('id', id)
      if (error) throw error
      alert('Berhasil disimpan')
      fetchEvent()
    } catch (error: any) {
      alert(error.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <EventWorkspaceLayout>
        <div className="flex justify-center py-12">Loading...</div>
      </EventWorkspaceLayout>
    )
  }

  return (
    <EventWorkspaceLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Template &amp; Publikasi</h1>
            <p className="mt-1 text-sm text-gray-500">Pilih template dan atur status publikasi</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Pilih Template</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {templates
                .filter((t) => t.active)
                .map((t) => {
                  const meta = TEMPLATE_REGISTRY_ENTRIES.find((r) => r.slug === t.slug)
                  const selected = templateId === t.id
                  return (
                    <div
                      key={t.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => setTemplateId(t.id)}
                      onKeyDown={() => setTemplateId(t.id)}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                        selected ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={t.preview_image || meta?.preview}
                        alt={t.name}
                        className="w-full aspect-[3/4] object-cover rounded mb-2"
                      />
                      <p className="text-sm font-medium text-gray-900">{t.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{t.category}</p>
                    </div>
                  )
                })}
              {templates.length === 0 && (
                <p className="text-sm text-gray-500 col-span-3">
                  Tabel event_templates belum berisi data. Jalankan seed templates terlebih dahulu.
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Status Publikasi</label>
            <div className="space-y-2">
              {(['draft', 'published', 'archived'] as const).map((s) => (
                <label key={s} className="flex items-center">
                  <input type="radio" name="status" checked={status === s} onChange={() => setStatus(s)} className="mr-2" />
                  <span className="text-sm">
                    {s === 'draft'
                      ? 'Draft - Hanya bisa dilihat oleh admin'
                      : s === 'published'
                        ? 'Published - Dapat diakses publik'
                        : 'Archived - Dinonaktifkan'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {event?.slug && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700 mb-2">URL Undangan Publik:</p>
              <div className="flex items-center space-x-2">
                <code className="flex-1 px-3 py-2 bg-white border rounded text-sm">
                  /undangan/{event.slug}
                </code>
                <a
                  href={`/undangan/${event.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center px-3 py-2 bg-white border rounded hover:bg-gray-50"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </EventWorkspaceLayout>
  )
}
