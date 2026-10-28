import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Event } from '@/types'
import { getTemplate } from '@/invitation-engine/registry'

interface WithTemplate extends Event {
  event_templates?: { slug: string } | null
}

export default function PublicInvitation() {
  const { slug } = useParams()
  const [searchParams] = useSearchParams()
  const guestName = searchParams.get('to') || 'Tamu Undangan'
  const [event, setEvent] = useState<WithTemplate | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvent()
  }, [slug])

  const fetchEvent = async () => {
    try {
      // left join event_templates; jika FK/tabel belum siap tetap ikut terbaca
      const { data, error } = await supabase
        .from('events')
        .select('*, event_templates(slug)')
        .eq('slug', slug)
        .eq('status', 'published')
        .single()

      if (error) throw error
      setEvent(data)
    } catch (error) {
      console.error('Error fetching event:', error)
      // [DEV-ONLY] fixture untuk pengujian template sebelum DB terisi
      if (import.meta.env.DEV && slug?.startsWith('demo-')) {
        setEvent(makeDemoEvent(slug))
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-gray-900'>Undangan tidak ditemukan</h1>
          <p className='mt-2 text-gray-600'>Undangan ini mungkin tidak aktif atau sudah diarsipkan</p>
        </div>
      </div>
    )
  }

  const TemplateComponent = getTemplate(event.event_templates?.slug ?? String(event.template_id ?? ''))

  return <TemplateComponent event={event} guestName={guestName} />
}

function makeDemoEvent(slug: string): WithTemplate {
  const today = new Date()
  const d = (days: number) => {
    const x = new Date(today)
    x.setDate(x.getDate() + days)
    return x.toISOString().slice(0, 10)
  }
  return {
    id: '00000000-0000-0000-0000-000000000000',
    slug,
    title: 'Demo Undangan',
    template_id: slug.replace(/^demo-/, ''),
    status: 'published',
    bride_name: 'Nadia Amelia',
    groom_name: 'Rangga Prasetya',
    bride_nick: 'Nadia',
    groom_nick: 'Rangga',
    bride_photo: '/templates/heritage-aruna/images/Utary-Bride-Groom-CPP-1-e1763011874777.webp',
    groom_photo: '/templates/heritage-aruna/images/Utary-Bride-Groom-CPW-1-e1762934239256.webp',
    bride_father: 'Bapak Ahmad',
    bride_mother: 'Ibu Sari',
    groom_father: 'Bapak Dedi',
    groom_mother: 'Ibu Lina',
    bride_ig: 'nadiaamelia',
    groom_ig: 'rangga.pras',
    akad_date: d(45),
    akad_time: '08:00',
    akad_location: 'Masjid Agung Demo',
    reception_date: d(45),
    reception_time: '11:00',
    reception_location: 'Pendopo Demo',
    address: 'Jl. Demo No. 1, Kota Contoh',
    maps_url: 'https://maps.google.com',
    dress_code: 'Moton (Kondangan tema batik)',
    love_story:
      '2019\nPertama bertemu saat kuliah.\n\n2022\nMulai berpacangan.\n\n2025\nLamaran di rumah keluarga.',
    prewedding_photos: [],
    gallery: [
      '/templates/heritage-aruna/images/Utary-Bride-Groom-03-e1763374114498.webp',
      '/templates/heritage-aruna/images/Aruna-Home-Fallback.webp',
      '/templates/heritage-aruna/images/Aruna-Group-Floral-3-HD.webp',
    ],
    video_url: '',
    music_url: '',
    quote: '“Dan segala sesuatu Kami ciptakan berpasang-pasangan agar kamu mengingat (kebesaran Allah)”\nQS. Adz-Dzariyat : 49',
    gift_bank_name: 'BCA',
    gift_account_number: '0123456789',
    gift_account_holder: 'Nadia Amelia',
    gift_address: 'Jl. Demo No. 1, Kota Contoh',
    gift_recipient: 'Nadia',
    gift_wa: '6281234567890',
    published_at: undefined,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
}
