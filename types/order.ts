export interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
}

export interface Order {
  id: number
  orderNumber: string
  date: string
  items: OrderItem[]
  totalPrice: number
  customerName: string
  customerPhone: string
}

