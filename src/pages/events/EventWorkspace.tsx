import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ExternalLink, Eye, Edit, Users, Heart, MessageSquare } from 'lucide-react'
import EventWorkspaceLayout from '@/components/layout/EventWorkspaceLayout'
import { supabase } from '@/lib/supabase'
import { Event } from '@/types'

export default function EventWorkspace() {
  const { id } = useParams()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) fetchEvent()
  }, [id])

  const fetchEvent = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      setEvent(data)
    } catch (error) {
      console.error('Error fetching event:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <EventWorkspaceLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </EventWorkspaceLayout>
    )
  }

  if (!event) {
    return (
      <EventWorkspaceLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900">Acara tidak ditemukan</h2>
        </div>
      </EventWorkspaceLayout>
    )
  }

  return (
    <EventWorkspaceLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{event.title}</h1>
            <p className="mt-1 text-sm text-gray-500">
              {event.bride_name} & {event.groom_name}
            </p>
          </div>
          <div className="flex space-x-2">
            <Link
              to={`/undangan/${event.slug}`}
              target="_blank"
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Lihat Publik
            </Link>
            <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Tamu</p>
                <p className="text-2xl font-semibold">0</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Heart className="w-8 h-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-500">RSVP Hadir</p>
                <p className="text-2xl font-semibold">0</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <MessageSquare className="w-8 h-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-500">Ucapan</p>
                <p className="text-2xl font-semibold">0</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Edit className="w-8 h-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-500">Status</p>
                <p className="text-sm font-semibold capitalize">{event.status}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Data Pengantin</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Mempelai Pria</p>
                <p className="font-medium">{event.groom_name} ({event.groom_nick})</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Mempelai Wanita</p>
                <p className="font-medium">{event.bride_name} ({event.bride_nick})</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Informasi Acara</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Akad Nikah</p>
                <p className="font-medium">{event.akad_date} - {event.akad_time}</p>
                <p className="text-sm text-gray-600">{event.akad_location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Resepsi</p>
                <p className="font-medium">{event.reception_date} - {event.reception_time}</p>
                <p className="text-sm text-gray-600">{event.reception_location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EventWorkspaceLayout>
  )
}
