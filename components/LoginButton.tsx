'use client'
import React from 'react';
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function LoginButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    // Aquí iría la lógica de autenticación
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <Button onClick={isLoggedIn ? handleLogout : handleLogin}>
      {isLoggedIn ? 'Cerrar sesión' : 'Iniciar sesión'}
    </Button>
  )
}

