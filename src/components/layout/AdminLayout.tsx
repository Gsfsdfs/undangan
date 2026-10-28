import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { 
  LayoutDashboard, Calendar, FileText, Users, MessageSquare, 
  QrCode, Image, LogOut, Heart, Settings 
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Semua Acara', href: '/events', icon: Calendar },
  { name: 'Buat Acara Baru', href: '/events/create', icon: Heart },
  { name: 'Template Undangan', href: '/templates', icon: FileText },
  { name: 'Daftar Tamu', href: '/guests', icon: Users },
  { name: 'RSVP', href: '/rsvp', icon: Heart },
  { name: 'Ucapan & Doa', href: '/wishes', icon: MessageSquare },
  { name: 'QR Check-in', href: '/checkin', icon: QrCode },
  { name: 'Galeri & Media', href: '/media', icon: Image },
  { name: 'Pengaturan Website', href: '/settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { signOut } = useAuth()
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        <div className="w-64 bg-white shadow-sm border-r">
          <div className="flex flex-col h-full">
            <div className="flex items-center h-16 px-6 border-b">
              <h1 className="text-lg font-bold text-gray-900">Attarivitation</h1>
            </div>
            <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
            <div className="p-4 border-t">
              <button
                onClick={signOut}
                className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          <main className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
