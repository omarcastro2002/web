import Header from '@/components/Header'
import Menu from '@/components/Menu'
import Cart from '@/components/Cart'
import Map from '@/components/Map'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Menu />
          </div>
          <div className="space-y-8">
            <Cart />
            <Map />
          </div>
        </main>
      </div>
    </div>
  )
}

