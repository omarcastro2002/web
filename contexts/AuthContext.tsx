'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { User, AuthState } from '@/types/auth'

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// En una aplicación real, esto vendría de una base de datos
const MOCK_USERS = [
  { id: '1', username: 'admin', password: 'admin123', role: 'admin' as const },
  { id: '2', username: 'cocina', password: 'cocina123', role: 'kitchen' as const },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  })
  const router = useRouter()

  useEffect(() => {
    // Verificar si hay una sesión guardada
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setAuthState({
        user: JSON.parse(savedUser),
        isAuthenticated: true,
      })
    }
  }, [])

  const login = async (username: string, password: string) => {
    // Simular una llamada a la API
    const user = MOCK_USERS.find(
      (u) => u.username === username && u.password === password
    )

    if (user) {
      const { password: _, ...userWithoutPassword } = user
      setAuthState({
        user: userWithoutPassword,
        isAuthenticated: true,
      })
      localStorage.setItem('user', JSON.stringify(userWithoutPassword))
      return true
    }
    return false
  }

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
    })
    localStorage.removeItem('user')
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

