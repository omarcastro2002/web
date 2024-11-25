import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Map() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Nuestra Ubicación</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video rounded-lg overflow-hidden">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!3m2!1ses-419!2sco!4v1732398125369!5m2!1ses-419!2sco!6m8!1m7!1sqS3BBv-cS18cn6QKqIYMyA!2m2!1d7.893402882922081!2d-72.51040497471185!3f292.20712689364274!4f7.57306405613177!5f1.0875869328265277" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-600">Av. 10 #262, Carora, Cúcuta, Norte de Santander</p>
          <a 
            href="https://maps.app.goo.gl/QrocH1hFZagatjrx7" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 hover:underline mt-1 inline-block text-sm"
          >
            Ver en Google Maps
          </a>
        </div>
      </CardContent>
    </Card>
  )
}

