import React from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

const AppContent = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className='flex items-center justify-center bg-primary w-full h-screen text-secondary font-primary'>
        <div className='text-sm font-medium text-secondary/60'>Loading...</div>
      </div>
    )
  }

  return user ? <Dashboard /> : <Login />
}

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App