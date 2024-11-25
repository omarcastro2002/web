'use client'

import { useEffect, useState } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'

interface OrderItem {
  name: string
  quantity: number
  price: number
}

interface Order {
  id: number
  orderNumber: string
  date: string
  items: OrderItem[]
  totalPrice: number
  customerName: string
  customerPhone: string
  status: 'pending' | 'preparing' | 'ready'
}

export default function KitchenPage() {
  const { logout } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const { toast } = useToast()

  useEffect(() => {
    // En una aplicación real, esto vendría de una API
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        // Agregar estado a cada pedido
        const ordersWithStatus = data.map((order: Order) => ({
          ...order,
          status: order.status || 'pending'
        }))
        setOrders(ordersWithStatus)
      })
  }, [])

  const updateOrderStatus = (orderId: number, newStatus: Order['status']) => {
    // En una aplicación real, esto se enviaría a una API
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ))

    toast({
      title: "Estado actualizado",
      description: `Pedido #${orderId} marcado como ${newStatus}`,
    })
  }

  const getPendingOrders = () => orders.filter(order => order.status === 'pending')
  const getPreparingOrders = () => orders.filter(order => order.status === 'preparing')
  const getReadyOrders = () => orders.filter(order => order.status === 'ready')

  const OrderCard = ({ order }: { order: Order }) => (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Pedido #{order.orderNumber}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p><strong>Cliente:</strong> {order.customerName}</p>
          <p><strong>Teléfono:</strong> {order.customerPhone}</p>
          <p><strong>Hora:</strong> {new Date(order.date).toLocaleString()}</p>
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Artículos:</h4>
            <ul className="list-disc list-inside">
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.name} x {item.quantity}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-2 mt-4">
            {order.status === 'pending' && (
              <Button 
                onClick={() => updateOrderStatus(order.id, 'preparing')}
                variant="outline"
              >
                Comenzar preparación
              </Button>
            )}
            {order.status === 'preparing' && (
              <Button 
                onClick={() => updateOrderStatus(order.id, 'ready')}
                variant="outline"
              >
                Marcar como listo
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <ProtectedRoute allowedRoles={['kitchen']}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Panel de Cocina</h1>
          <Button onClick={logout} variant="outline">
            Cerrar sesión
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <h2 className="text-xl font-semibold mb-4">Pedidos Pendientes</h2>
            {getPendingOrders().map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">En Preparación</h2>
            {getPreparingOrders().map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Listos</h2>
            {getReadyOrders().map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

