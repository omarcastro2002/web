'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import type { UserRole } from '@/types/auth'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    if (allowedRoles && user?.role && !allowedRoles.includes(user.role)) {
      // Redirigir basado en el rol
      if (user.role === 'admin') {
        router.push('/admin')
      } else if (user.role === 'kitchen') {
        router.push('/cocina')
      } else {
        router.push('/')
      }
    }
  }, [isAuthenticated, router, allowedRoles, user, pathname])

  if (!isAuthenticated || (allowedRoles && !user?.role)) {
    return null
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return null
  }

  return <>{children}</>
}

