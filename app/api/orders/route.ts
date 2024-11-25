import { NextRequest, NextResponse } from 'next/server'

// En una aplicación real, esto se guardaría en una base de datos
let orders = []

export async function GET() {
  return NextResponse.json(orders)
}

export async function POST(request: NextRequest) {
  const order = await request.json()
  order.id = orders.length + 1
  order.orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`
  order.date = new Date().toISOString()
  order.status = 'pending'
  orders.push(order)
  return NextResponse.json(order, { status: 201 })
}

export async function PUT(request: NextRequest) {
  const { id, status } = await request.json()
  const order = orders.find(o => o.id === id)
  if (order) {
    order.status = status
    return NextResponse.json(order)
  }
  return NextResponse.json({ error: 'Order not found' }, { status: 404 })
}

