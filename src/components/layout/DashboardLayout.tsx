import React, { useState } from 'react'
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Workflow, 
  Users, 
  FileText, 
  Settings, 
  Bell, 
  Search, 
  User,
  LogOut,
  Plus,
  Menu,
  X,
  Zap,
  Folder,
  Users as UsersIcon,
  Grid,
  Shield
} from 'lucide-react'
import useAuthStore from '../../stores/auth-store'

// Create a simple button component
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { 
  variant?: 'default' | 'outline' 
}> = ({ children, className = '', variant = 'default', ...props }) => {
  const base = 'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
  const variants = {
    default: 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl active:scale-95',
    outline: 'border-2 border-slate-700 text-slate-300 hover:border-blue-500 hover:text-blue-400 bg-transparent'
  }
  return (
    <button className={`${base} ${variants[variant]} ${className} px-4 py-2`} {...props}>
      {children}
    </button>
  )
}

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeNav, setActiveNav] = useState('dashboard')
  const [notifications] = useState([
    { id: 1, text: 'Maria commented on your canvas', time: '5 min ago', read: false },
    { id: 2, text: 'New team member joined', time: '1 hour ago', read: true },
    { id: 3, text: 'Canvas export completed', time: '2 hours ago', read: true },
  ])
  const [showNotifications, setShowNotifications] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // Use /app paths for dashboard navigation
  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, href: '/app/dashboard', count: null },
    { id: 'canvases', name: 'Canvases', icon: Workflow, href: '/app/canvases', count: 3 },
    { id: 'templates', name: 'Templates', icon: FileText, href: '/app/templates', count: null },
    { id: 'team', name: 'Team', icon: Users, href: '/app/team', count: null },
    { id: 'settings', name: 'Settings', icon: Settings, href: '/app/settings', count: null },
  ]

  const handleNavClick = (id: string, href: string) => {
    setActiveNav(id)
    navigate(href)
  }

  const handleCreateCanvas = () => {
    const canvasId = Date.now()
    navigate(`/app/canvas/${canvasId}`)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const searchInput = document.getElementById('search-input') as HTMLInputElement
    if (searchInput.value.trim()) {
      alert(`Searching for: ${searchInput.value}`)
      searchInput.value = ''
    }
  }

  const unreadNotifications = notifications.filter(n => !n.read).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900/80 backdrop-blur-xl border-r border-slate-800 transition-all duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-16 items-center justify-between px-4 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold text-white">FlowCanvas</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 text-slate-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id, item.href)}
              className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                activeNav === item.id
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                  : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
              {item.count !== null && (
                <span className="ml-auto bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded">
                  {item.count}
                </span>
              )}
            </button>
          ))}
          
          <div className="pt-6">
            <Button className="w-full" onClick={handleCreateCanvas}>
              <Plus className="mr-2 h-4 w-4" />
              New Canvas
            </Button>
          </div>
        </nav>
        
        <div className="border-t border-slate-800 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center">
                <span className="text-white font-semibold">
                  {user?.name?.charAt(0).toUpperCase() || 'T'}
                </span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">{user?.name || 'test1770024380811'}</p>
              <p className="text-xs text-slate-400">{user?.email || 'test1770024380811@example.com'}</p>
            </div>
            <button
              onClick={handleLogout}
              className="ml-auto p-2 text-slate-400 hover:text-white"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Topbar */}
        <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-800">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center">
              {!sidebarOpen && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 text-slate-400 hover:text-white"
                >
                  <Menu className="h-6 w-6" />
                </button>
              )}
              <form onSubmit={handleSearch} className="relative ml-4">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="search-input"
                  type="search"
                  placeholder="Search canvases, nodes, or teams..."
                  className="w-96 pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </form>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-slate-400 hover:text-white"
                >
                  <Bell className="h-5 w-5" />
                  {unreadNotifications > 0 && (
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                  )}
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-700 rounded-lg shadow-xl z-50">
                    <div className="p-4 border-b border-slate-800">
                      <h3 className="font-semibold text-white">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`p-4 border-b border-slate-800 hover:bg-slate-800/50 cursor-pointer ${!notification.read ? 'bg-blue-500/5' : ''}`}
                          onClick={() => alert(`Opening notification: ${notification.text}`)}
                        >
                          <p className="text-sm text-white">{notification.text}</p>
                          <p className="text-xs text-slate-400 mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-2 border-t border-slate-800">
                      <button 
                        className="w-full text-sm text-blue-400 hover:text-blue-300 py-2"
                        onClick={() => alert('Marking all as read...')}
                      >
                        Mark all as read
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="h-8 w-px bg-slate-700"></div>
              
              <button 
                onClick={() => navigate('/app/settings')}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-800/50"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {user?.name?.charAt(0).toUpperCase() || 'T'}
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-white">{user?.name || 'test1770024380811'}</p>
                  <p className="text-xs text-slate-400">Online</p>
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
