import { Link, useLocation, useParams } from 'react-router-dom'
import { 
  LayoutDashboard, Heart, Calendar, FileText, Image, Music, 
  Gift, Users, MessageSquare, QrCode, Settings, ArrowLeft 
} from 'lucide-react'

const navigation = [
  { name: 'Ringkasan', href: '', icon: LayoutDashboard },
  { name: 'Data Pengantin', href: '/bride-groom', icon: Heart },
  { name: 'Informasi Acara', href: '/schedule', icon: Calendar },
  { name: 'Template', href: '/template', icon: FileText },
  { name: 'Editor Undangan', href: '/editor', icon: Settings },
  { name: 'Galeri Foto', href: '/gallery', icon: Image },
  { name: 'Musik', href: '/music', icon: Music },
  { name: 'Wedding Gift', href: '/gift', icon: Gift },
  { name: 'Daftar Tamu', href: '/guests', icon: Users },
  { name: 'RSVP', href: '/rsvp', icon: Heart },
  { name: 'Ucapan & Doa', href: '/wishes', icon: MessageSquare },
  { name: 'QR Check-in', href: '/checkin', icon: QrCode },
  { name: 'Publikasi', href: '/publish', icon: Settings },
]

export default function EventWorkspaceLayout({ children }: { children: React.ReactNode }) {
  const { id } = useParams()
  const location = useLocation()
  const basePath = `/events/${id}`

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        <div className="w-64 bg-white shadow-sm border-r">
          <div className="flex flex-col h-full">
            <div className="flex items-center h-16 px-4 border-b">
              <Link to="/events" className="flex items-center text-sm text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Daftar Acara
              </Link>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
              {navigation.map((item) => {
                const href = basePath + item.href
                const isActive = location.pathname === href || (item.href === '' && location.pathname === basePath)
                return (
                  <Link
                    key={item.name}
                    to={href}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-4 h-4 mr-3" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
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
