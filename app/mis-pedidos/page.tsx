'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Header from '@/components/Header'
import type { Order } from '@/types/order'

export default function MisPedidos() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const savedOrders = localStorage.getItem('userOrders')
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <h1 className="text-2xl font-bold mb-4">Mis Pedidos</h1>
      {orders.length === 0 ? (
        <p>No tienes pedidos realizados.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order, index) => (
            <li key={index} className="border p-4 rounded-lg">
              <h2 className="font-semibold">Pedido #{order.orderNumber}</h2>
              <p>Fecha: {new Date(order.date).toLocaleString()}</p>
              <p>Total: ${order.totalPrice.toLocaleString()}</p>
              <h3 className="font-semibold mt-2">Artículos:</h3>
              <ul className="list-disc list-inside">
                {order.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    {item.name} - ${item.price.toLocaleString()} x {item.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
      <Button asChild className="mt-4">
        <a href="/">Volver al Menú</a>
      </Button>
    </div>
  )
}
