import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Save } from 'lucide-react'
import EventWorkspaceLayout from '@/components/layout/EventWorkspaceLayout'
import { supabase } from '@/lib/supabase'

export default function BrideGroom() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    bride_name: '', bride_nick: '', bride_photo: '', bride_father: '', bride_mother: '', bride_ig: '',
    groom_name: '', groom_nick: '', groom_photo: '', groom_father: '', groom_mother: '', groom_ig: '',
  })

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
      setFormData({
        bride_name: data.bride_name || '', bride_nick: data.bride_nick || '', bride_photo: data.bride_photo || '',
        bride_father: data.bride_father || '', bride_mother: data.bride_mother || '', bride_ig: data.bride_ig || '',
        groom_name: data.groom_name || '', groom_nick: data.groom_nick || '', groom_photo: data.groom_photo || '',
        groom_father: data.groom_father || '', groom_mother: data.groom_mother || '', groom_ig: data.groom_ig || '',
      })
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
        .update(formData)
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
            <h1 className="text-2xl font-bold text-gray-900">Data Pengantin</h1>
            <p className="mt-1 text-sm text-gray-500">Kelola data mempelai pria dan wanita</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white shadow rounded-lg p-6 space-y-4">
            <h2 className="text-lg font-medium text-gray-900">Mempelai Pria</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
              <input
                type="text"
                value={formData.groom_name}
                onChange={(e) => setFormData({ ...formData, groom_name: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Panggilan</label>
              <input
                type="text"
                value={formData.groom_nick}
                onChange={(e) => setFormData({ ...formData, groom_nick: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Ayah</label>
              <input
                type="text"
                value={formData.groom_father}
                onChange={(e) => setFormData({ ...formData, groom_father: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Ibu</label>
              <input
                type="text"
                value={formData.groom_mother}
                onChange={(e) => setFormData({ ...formData, groom_mother: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Instagram</label>
              <input
                type="text"
                value={formData.groom_ig}
                onChange={(e) => setFormData({ ...formData, groom_ig: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6 space-y-4">
            <h2 className="text-lg font-medium text-gray-900">Mempelai Wanita</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
              <input
                type="text"
                value={formData.bride_name}
                onChange={(e) => setFormData({ ...formData, bride_name: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Panggilan</label>
              <input
                type="text"
                value={formData.bride_nick}
                onChange={(e) => setFormData({ ...formData, bride_nick: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Ayah</label>
              <input
                type="text"
                value={formData.bride_father}
                onChange={(e) => setFormData({ ...formData, bride_father: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Ibu</label>
              <input
                type="text"
                value={formData.bride_mother}
                onChange={(e) => setFormData({ ...formData, bride_mother: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Instagram</label>
              <input
                type="text"
                value={formData.bride_ig}
                onChange={(e) => setFormData({ ...formData, bride_ig: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </EventWorkspaceLayout>
  )
}
