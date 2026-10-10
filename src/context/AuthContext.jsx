import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Persist login across reloads
  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const TEST_USERS = [
  { email: 'admin@demo.com', password: 'admin123', name: 'Admin' },
  { email: 'user@demo.com',  password: 'user123',  name: 'User' },
]

const login = (email, password) => {
  const found = TEST_USERS.find(
    (u) => u.email === email && u.password === password
  )
  if (!found) {
    return { success: false, error: 'Invalid email or password' }
  }
  const user = { id: found.email, name: found.name, email: found.email }
  setUser(user)
  localStorage.setItem('user', JSON.stringify(user))
  return { success: true }
}

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}