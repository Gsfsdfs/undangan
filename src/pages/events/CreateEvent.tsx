import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import AdminLayout from '@/components/layout/AdminLayout'
import { supabase } from '@/lib/supabase'

export default function CreateEvent() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    bride_name: '',
    groom_name: '',
    bride_nick: '',
    groom_nick: '',
  })

  const handleSlugChange = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
    setFormData({ ...formData, title, slug })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase
        .from('events')
        .insert([{
          ...formData,
          status: 'draft',
        }])
        .select()
        .single()

      if (error) throw error
      navigate(`/events/${data.id}`)
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/events')} className="text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Buat Acara Baru</h1>
            <p className="mt-1 text-sm text-gray-500">Buat undangan pernikahan baru</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Judul Acara</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleSlugChange(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Contoh: Pernikahan Andi & Sinta"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Slug URL</label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="andi-sinta"
            />
            <p className="mt-1 text-sm text-gray-500">URL: domain.com/undangan/{formData.slug}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Mempelai Pria</label>
              <input
                type="text"
                required
                value={formData.groom_name}
                onChange={(e) => setFormData({ ...formData, groom_name: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Mempelai Wanita</label>
              <input
                type="text"
                required
                value={formData.bride_name}
                onChange={(e) => setFormData({ ...formData, bride_name: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Panggilan Pria</label>
              <input
                type="text"
                value={formData.groom_nick}
                onChange={(e) => setFormData({ ...formData, groom_nick: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Panggilan Wanita</label>
              <input
                type="text"
                value={formData.bride_nick}
                onChange={(e) => setFormData({ ...formData, bride_nick: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/events')}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Menyimpan...' : 'Buat Acara'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
