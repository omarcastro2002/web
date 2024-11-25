import React from 'react';
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <header className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Restaurante Como en Casa</h1>
      <nav className="space-x-4">
        <Button asChild variant="ghost">
          <Link href="/mis-pedidos">Mis Pedidos</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/login">Iniciar sesión</Link>
        </Button>
      </nav>
    </header>
  )
}

