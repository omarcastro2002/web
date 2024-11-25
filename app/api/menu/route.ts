import { NextResponse } from 'next/server'

// En una aplicación real, esto vendría de una base de datos
const menuItems = [
  { id: 1, name: 'Albóndiga', price: 10000, category: 'Regular' },
  { id: 2, name: 'Pollo Guisado', price: 10000, category: 'Regular' },
  { id: 3, name: 'Higado', price: 10000, category: 'Regular' },
  { id: 4, name: 'Pollo frito', price: 10000, category: 'Regular' },
  { id: 5, name: 'Carne - Pechuga - Cerdo', price: 10000, category: 'Regular' },
  { id: 6, name: 'Arroz Mixto', price: 14000, category: 'Especial' },
  { id: 7, name: 'Pechuga Apanada', price: 12000, category: 'Especial' },
  { id: 8, name: 'Bandeja paisa', price: 14000, category: 'Especial' },
  { id: 9, name: 'Chanfaina', price: 14000, category: 'Especial' },
]

export async function GET() {
  return NextResponse.json(menuItems)
}

