import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Save, Plus, Trash2 } from 'lucide-react'
import EventWorkspaceLayout from '@/components/layout/EventWorkspaceLayout'
import { supabase } from '@/lib/supabase'

export default function Gallery() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [gallery, setGallery] = useState<string[]>([])
  const [newUrl, setNewUrl] = useState('')

  useEffect(() => {
    if (id) fetchEvent()
  }, [id])

  const fetchEvent = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('gallery')
        .eq('id', id)
        .single()

      if (error) throw error
      setGallery(Array.isArray(data.gallery) ? data.gallery : [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const addImage = () => {
    if (newUrl.trim()) {
      setGallery([...gallery, newUrl.trim()])
      setNewUrl('')
    }
  }

  const removeImage = (index: number) => {
    setGallery(gallery.filter((_, i) => i !== index))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const { error } = await supabase
        .from('events')
        .update({ gallery })
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
            <h1 className="text-2xl font-bold text-gray-900">Galeri Foto</h1>
            <p className="mt-1 text-sm text-gray-500">Kelola foto galeri undangan</p>
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
          <div className="flex space-x-2">
            <input
              type="url"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
            />
            <button
              onClick={addImage}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {gallery.map((url, index) => (
              <div key={index} className="relative group">
                <img src={url} alt={`Gallery ${index}`} className="w-full h-32 object-cover rounded" />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </EventWorkspaceLayout>
  )
}
