'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { useCart } from '@/contexts/CartContext'

interface MenuItem {
  id: number
  name: string
  price: number
  category: string
}

export default function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const { addToCart } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    fetch('/api/menu')
      .then(response => response.json())
      .then(data => setMenuItems(data))
      .catch(error => console.error('Error fetching menu:', error))
  }, [])

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item)
    toast({
      title: "Producto añadido",
      description: `${item.name} ha sido añadido al carrito.`,
    })
  }

  const MenuSection = ({ title, items }: { title: string, items: MenuItem[] }) => (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-gray-500">${item.price.toLocaleString()}</p>
              </div>
              <Button 
                onClick={() => handleAddToCart(item)}
                className="ml-4"
              >
                Agregar al carrito
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const regularItems = menuItems.filter(item => item.category === 'Regular')
  const specialItems = menuItems.filter(item => item.category === 'Especial')

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Nuestro Menú</h2>
      <MenuSection title="Menú Regular" items={regularItems} />
      <MenuSection title="Menú Especial" items={specialItems} />
    </div>
  )
}

