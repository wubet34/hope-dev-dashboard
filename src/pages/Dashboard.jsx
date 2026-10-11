import React, { useState } from 'react'
import {
  LogOut, LayoutDashboard, Users, Settings, BarChart3,
  FileText, Menu, X
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const stats = [
    { label: 'Total Users', value: '2,543', change: '+12%', icon: Users },
    { label: 'Revenue', value: '$45,231', change: '+8%', icon: BarChart3 },
    { label: 'Documents', value: '1,234', change: '+23%', icon: FileText },
    { label: 'Active Sessions', value: '342', change: '+5%', icon: LayoutDashboard },
  ]

  const recentActivity = [
    { user: 'John Doe', action: 'Created a new document', time: '2 minutes ago' },
    { user: 'Jane Smith', action: 'Updated profile settings', time: '15 minutes ago' },
    { user: 'Mike Johnson', action: 'Uploaded a file', time: '1 hour ago' },
    { user: 'Sarah Wilson', action: 'Logged in', time: '2 hours ago' },
  ]

  const navItems = [
    { label: 'Overview', icon: LayoutDashboard, active: true },
    { label: 'Users', icon: Users },
    { label: 'Analytics', icon: BarChart3 },
    { label: 'Documents', icon: FileText },
    { label: 'Settings', icon: Settings },
  ]

  return (
    <div className='flex bg-primary w-full min-h-screen text-secondary font-primary select-none'>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className='fixed inset-0 bg-secondary/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300'
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 z-50 md:z-0
          h-screen w-64 bg-card border-r border-secondary/10 p-6
          flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Close button on mobile */}
        <button
          onClick={() => setSidebarOpen(false)}
          className='md:hidden absolute top-4 right-4 p-2 rounded-xl hover:bg-primary text-secondary/60 hover:text-secondary transition-all duration-200'
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>

        {/* Brand */}
        <div className='mb-10'>
          <div className='flex items-center gap-2 mb-1'>
            <div className='w-8 h-8 rounded-lg bg-accent flex items-center justify-center'>
              <span className='text-sm font-extrabold text-card'>A</span>
            </div>
            <h1 className='text-xl font-extrabold tracking-tight text-secondary'>Dashboard</h1>
          </div>
          <p className='text-secondary/50 text-xs font-medium mt-1 truncate'>
            Welcome, {user?.name || 'User'}
          </p>
        </div>

        <nav className='flex-1 space-y-1.5 overflow-y-auto'>
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.label}
                href={`#${item.label.toLowerCase()}`}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 p-3 rounded-xl text-sm transition-all duration-200
                  ${item.active
                    ? 'bg-accent text-card font-semibold shadow-md shadow-accent/30'
                    : 'hover:bg-primary text-secondary/70 hover:text-secondary font-medium'}
                `}
              >
                <Icon size={18} />
                {item.label}
              </a>
            )
          })}
        </nav>

        <button
          onClick={logout}
          className='flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 text-secondary/60 hover:text-red-500 font-medium text-sm transition-all duration-200 mt-4'
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className='flex-1 min-w-0 p-4 sm:p-6 md:p-8 overflow-y-auto'>

        {/* Top Bar */}
        <div className='flex items-center justify-between mb-6 md:mb-8'>
          <div className='flex items-center gap-3'>
            <button
              onClick={() => setSidebarOpen(true)}
              className='md:hidden p-2.5 rounded-xl bg-card border border-secondary/10 hover:bg-primary text-secondary transition-all duration-200'
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className='text-xl sm:text-2xl font-extrabold tracking-tight text-secondary'>Overview</h1>
              <p className='text-secondary/50 text-xs sm:text-sm font-medium mt-0.5 hidden sm:block'>
                Welcome back, {user?.name}
              </p>
            </div>
          </div>

          {/* User chip */}
          <div className='flex items-center gap-3 p-2 pr-3 sm:pr-4 rounded-xl bg-card border border-secondary/10'>
            <div className='w-8 h-8 rounded-full bg-accent flex items-center justify-center'>
              <span className='text-xs font-bold text-card uppercase'>
                {user?.name?.[0] || 'U'}
              </span>
            </div>
            <span className='text-sm font-semibold hidden sm:block truncate max-w-32 text-secondary'>
              {user?.name}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8'>
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className='p-5 sm:p-6 rounded-2xl bg-card border border-secondary/10 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]'
              >
                <div className='flex items-center justify-between mb-4'>
                  <div className='p-2.5 rounded-xl bg-accent/15'>
                    <Icon size={20} className='text-accent' />
                  </div>
                  <span className='text-xs font-semibold text-green-700 bg-green-500/15 px-2 py-1 rounded-lg'>
                    {stat.change}
                  </span>
                </div>
                <h3 className='text-xl sm:text-2xl font-extrabold tracking-tight mb-1 text-secondary'>
                  {stat.value}
                </h3>
                <p className='text-secondary/50 text-xs font-medium tracking-wider'>{stat.label}</p>
              </div>
            )
          })}
        </div>

        {/* Recent Activity */}
        <div className='p-5 sm:p-8 rounded-3xl bg-card border border-secondary/10 shadow-sm'>
          <div className='flex items-center justify-between mb-6'>
            <div>
              <h2 className='text-lg sm:text-xl font-extrabold tracking-tight text-secondary'>
                Recent Activity
              </h2>
              <p className='text-secondary/50 text-xs sm:text-sm font-medium mt-1'>
                Latest actions from your team
              </p>
            </div>
            <a href="#all" className='text-xs font-semibold text-accent hover:underline whitespace-nowrap ml-2'>
              View All
            </a>
          </div>

          <div className='space-y-3 sm:space-y-4'>
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className='flex items-center justify-between p-3 sm:p-4 rounded-xl border border-secondary/10 bg-primary/60 transition-all duration-200 hover:border-accent/50 hover:bg-primary'
              >
                <div className='flex items-center gap-3 sm:gap-4 min-w-0'>
                  <div className='w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full bg-accent/20 flex items-center justify-center'>
                    <span className='text-xs sm:text-sm font-bold text-accent'>
                      {activity.user.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className='min-w-0'>
                    <p className='text-sm font-semibold truncate text-secondary'>{activity.user}</p>
                    <p className='text-xs text-secondary/50 font-medium truncate'>{activity.action}</p>
                  </div>
                </div>
                <span className='text-xs text-secondary/40 font-medium whitespace-nowrap ml-3 hidden sm:block'>
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  )
}

export default Dashboard