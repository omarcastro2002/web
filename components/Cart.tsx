'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { useCart } from '@/contexts/CartContext'

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const { toast } = useToast()
  const [userOrders, setUserOrders] = useState([])

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  useEffect(() => {
    const savedOrders = localStorage.getItem('userOrders')
    if (savedOrders) {
      setUserOrders(JSON.parse(savedOrders))
    }
  }, [])

  const placeOrder = async () => {
    if (name && phone) {
      const order = {
        items: cart,
        totalPrice,
        customerName: name,
        customerPhone: phone,
      }

      try {
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(order),
        })

        if (response.ok) {
          const newOrder = await response.json()
          toast({
            title: "Pedido realizado",
            description: `Gracias ${name}, tu pedido ha sido recibido. Número de pedido: ${newOrder.orderNumber}. Total: $${totalPrice.toLocaleString()}`,
          })
          const updatedOrders = [...userOrders, newOrder]
          setUserOrders(updatedOrders)
          localStorage.setItem('userOrders', JSON.stringify(updatedOrders))
          clearCart()
          setName('')
          setPhone('')
        } else {
          throw new Error('Error al realizar el pedido')
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Hubo un problema al procesar tu pedido. Por favor, intenta de nuevo.",
          variant: "destructive",
        })
      }
    } else {
      toast({
        title: "Error",
        description: "Por favor, ingrese su nombre y número de teléfono",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-8">
      <h2 className="text-xl font-semibold mb-4">Carrito</h2>
      {cart.length === 0 ? (
        <p>Su carrito está vacío</p>
      ) : (
        <>
          <ul className="space-y-2 mb-4">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <span>{item.name} - ${item.price.toLocaleString()} x {item.quantity}</span>
                <Button variant="destructive" size="sm" onClick={() => removeFromCart(item.id)}>
                  Eliminar
                </Button>
              </li>
            ))}
          </ul>
          <p className="font-bold mb-4">Total: ${totalPrice.toLocaleString()}</p>
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Su nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="tel"
              placeholder="Su número de teléfono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Button onClick={placeOrder} className="w-full">
              Hacer pedido
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

