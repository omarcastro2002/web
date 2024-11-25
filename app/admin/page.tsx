'use client'

import { useEffect, useState } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Order {
  id: number
  orderNumber: string
  date: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  totalPrice: number
  customerName: string
  customerPhone: string
}

export default function AdminPage() {
  const { logout } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    averageOrderValue: 0
  })

  useEffect(() => {
    // En una aplicación real, esto vendría de una API
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        setOrders(data)
        calculateStats(data)
      })
  }, [])

  const calculateStats = (orders: Order[]) => {
    const totalOrders = orders.length
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0)
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

    setStats({
      totalOrders,
      totalRevenue,
      averageOrderValue
    })
  }

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Panel de Administración</h1>
          <Button onClick={logout} variant="outline">
            Cerrar sesión
          </Button>
        </div>

        <div className="grid gap-6 mb-8 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total de Pedidos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.totalOrders}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ingresos Totales</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Valor Promedio por Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">${stats.averageOrderValue.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Historial de Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">N° Pedido</th>
                    <th className="text-left p-2">Cliente</th>
                    <th className="text-left p-2">Fecha</th>
                    <th className="text-left p-2">Total</th>
                    <th className="text-left p-2">Detalles</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="p-2">{order.orderNumber}</td>
                      <td className="p-2">{order.customerName}</td>
                      <td className="p-2">{new Date(order.date).toLocaleString()}</td>
                      <td className="p-2">${order.totalPrice.toLocaleString()}</td>
                      <td className="p-2">
                        <Button variant="outline" size="sm">
                          Ver detalles
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
}

