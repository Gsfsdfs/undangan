import { useState } from 'react'
import { Eye, Check } from 'lucide-react'
import AdminLayout from '@/components/layout/AdminLayout'

const templates = [
  { id: 'heritage-utary', name: 'Heritage Utary', category: 'heritage', image: '/templates/heritage-utary/screenshots/screenshot.png' },
  { id: 'heritage-sandhayu', name: 'Heritage Sandhayu', category: 'heritage', image: '/templates/heritage-sandhayu/screenshots/screenshot.png' },
  { id: 'heritage-aruna', name: 'Heritage Aruna', category: 'heritage', image: '/templates/heritage-aruna/screenshots/screenshot.png' },
  { id: 'premium-01', name: 'Premium 01', category: 'premium', image: '/templates/premium-01/screenshots/screenshot.png' },
  { id: 'premium-02', name: 'Premium 02', category: 'premium', image: '/templates/premium-02/screenshots/screenshot.png' },
  { id: 'premium-danila', name: 'Premium Danila', category: 'premium', image: '/templates/premium-danila/screenshots/screenshot.png' },
  { id: 'premium-ivanna', name: 'Premium Ivanna', category: 'premium', image: '/templates/premium-ivanna/screenshots/screenshot.png' },
  { id: 'premium-kila', name: 'Premium Kila', category: 'premium', image: '/templates/premium-kila/screenshots/screenshot.png' },
  { id: 'premium-flara', name: 'Premium Flara', category: 'premium', image: '/templates/premium-flara/screenshots/screenshot.png' },
]

export default function Templates() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'heritage' | 'premium'>('all')

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory)

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Template Undangan</h1>
          <p className="mt-1 text-sm text-gray-500">Pilih template untuk acara pernikahan Anda</p>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Semua
          </button>
          <button
            onClick={() => setSelectedCategory('heritage')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedCategory === 'heritage'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Heritage Series
          </button>
          <button
            onClick={() => setSelectedCategory('premium')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedCategory === 'premium'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Premium Series
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="aspect-[3/4] bg-gray-100 relative">
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400'
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
                <p className="text-sm text-gray-500 capitalize">{template.category}</p>
                <div className="mt-4 flex space-x-2">
                  <button className="flex-1 flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </button>
                  <button className="flex-1 flex items-center justify-center px-3 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
                    <Check className="w-4 h-4 mr-2" />
                    Pilih
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
