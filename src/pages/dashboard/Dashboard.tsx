import { useAuth } from '@/hooks/useAuth'
import { LogOut, Calendar, Users, Heart, MessageCircle, QrCode } from 'lucide-react'

export default function Dashboard() {
  const { signOut } = useAuth()

  const stats = [
    { name: 'Total Acara', value: '0', icon: Calendar, color: 'bg-blue-500' },
    { name: 'Acara Aktif', value: '0', icon: Heart, color: 'bg-green-500' },
    { name: 'Total Tamu', value: '0', icon: Users, color: 'bg-purple-500' },
    { name: 'RSVP Hadir', value: '0', icon: Heart, color: 'bg-pink-500' },
    { name: 'Ucapan', value: '0', icon: MessageCircle, color: 'bg-yellow-500' },
    { name: 'Check-in', value: '0', icon: QrCode, color: 'bg-indigo-500' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Attarivitation Admin</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={signOut}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className={`${stat.color} rounded-md p-3`}>
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                        <dd className="text-lg font-medium text-gray-900">{stat.value}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100">
                  Buat Acara Baru
                </button>
                <button className="w-full text-left px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100">
                  Lihat Semua Acara
                </button>
                <button className="w-full text-left px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100">
                  Kelola Template
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
