import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Save } from 'lucide-react'
import EventWorkspaceLayout from '@/components/layout/EventWorkspaceLayout'
import { supabase } from '@/lib/supabase'

export default function Music() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [musicUrl, setMusicUrl] = useState('')

  useEffect(() => {
    if (id) fetchEvent()
  }, [id])

  const fetchEvent = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('music_url')
        .eq('id', id)
        .single()

      if (error) throw error
      setMusicUrl(data.music_url || '')
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const { error } = await supabase
        .from('events')
        .update({ music_url: musicUrl })
        .eq('id', id)

      if (error) throw error
      alert('Berhasil disimpan')
    } catch (error: any) {
      alert(error.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <EventWorkspaceLayout><div className="flex justify-center py-12">Loading...</div></EventWorkspaceLayout>
  }

  return (
    <EventWorkspaceLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Musik Latar</h1>
            <p className="mt-1 text-sm text-gray-500">Atur musik pengiring undangan</p>
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

        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">URL Musik (MP3/YouTube)</label>
            <input
              type="url"
              value={musicUrl}
              onChange={(e) => setMusicUrl(e.target.value)}
              placeholder="https://example.com/music.mp3"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <p className="mt-1 text-sm text-gray-500">Masukkan URL file audio atau YouTube</p>
          </div>
        </div>
      </div>
    </EventWorkspaceLayout>
  )
}
