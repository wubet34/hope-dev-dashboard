import { LogIn } from 'lucide-react'
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    const result = login(email, password)
    if (!result.success) setError(result.error)
  }

  return (
    <div className='flex items-center justify-center bg-primary w-full h-screen text-secondary p-4 font-primary select-none'>
      <div className='w-full max-w-120 transition-all duration-300 transform hover:scale-[1.01]'>
        <form
          onSubmit={handleSubmit}
          className='p-8 rounded-3xl bg-card border border-secondary/5 shadow-2xl flex flex-col justify-between min-h-130'
        >
          <div className="text-center mb-6">
            <h2 className='text-3xl font-extrabold tracking-tight mb-2'>Welcome Back</h2>
            <p className='text-secondary/60 text-sm font-medium'>Sign in to continue to your dashboard</p>
          </div>

          <div className='space-y-5 flex-1 flex flex-col justify-center'>
            <div>
              <label htmlFor="email" className='text-xs tracking-wider text-secondary/70 block mb-2'>
                Email Address
              </label>
              <input
                className='w-full p-3 rounded-xl border border-secondary/10 bg-primary/30 outline-none text-sm transition-all duration-200 placeholder:text-secondary/40 focus:border-accent focus:ring-2 focus:ring-accent/20'
                id="email"
                type="email"
                placeholder='Enter your email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <div className='flex justify-between items-center mb-2'>
                <label htmlFor="password" className='text-xs tracking-wider text-secondary/70'>
                  Password
                </label>
                <a href="#forgot" className='text-xs font-semibold text-accent hover:underline'>Forgot?</a>
              </div>
              <input
                className='w-full p-3 rounded-xl border border-secondary/10 bg-primary/30 outline-none text-sm transition-all duration-200 placeholder:text-secondary/40 focus:border-accent focus:ring-2 focus:ring-accent/20'
                id="password"
                type="password"
                placeholder='••••••••'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className='text-xs font-semibold text-red-500 text-center'>{error}</p>
            )}
          </div>

          <div className='mt-8 space-y-4'>
            <button
              className='bg-secondary hover:bg-secondary/90 active:scale-[0.99] text-primary w-full rounded-xl font-bold tracking-wide shadow-lg shadow-secondary/20 transition-all duration-200 flex items-center justify-center p-3.5 gap-2 group cursor-pointer'
              type="submit"
            >
              Login
              <LogIn size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            <p className='text-center text-sm text-secondary/60 font-medium pt-2'>
              Don't have an account?{' '}
              <a href="/" className='text-accent font-bold hover:underline transition-colors'>Sign up</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login