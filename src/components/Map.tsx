import { type FC, useEffect, useRef } from 'react'
import styled from '@emotion/styled'

// Extend Window interface for Google Maps
declare global {
  interface Window {
    google?: {
      maps: {
        Map: new (element: HTMLElement, opts: unknown) => unknown
        Marker: new (opts: unknown) => {
          addListener: (event: string, handler: () => void) => void
        }
        InfoWindow: new (opts: { content: string }) => {
          open: (map: unknown, marker: unknown) => void
        }
        SymbolPath: {
          CIRCLE: number
        }
      }
    }
  }
}

const MapSection = styled('section')(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: '6rem 3rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '@media (max-width: 768px)': {
    padding: '4rem 1.5rem',
  },
}))

const MapTitle = styled('h2')(({ theme }) => ({
  fontFamily: "'Playfair Display', serif",
  fontWeight: 400,
  fontSize: '2.5rem',
  color: theme.palette.primary.main,
  marginBottom: '2rem',
  textAlign: 'center',
  '@media (max-width: 768px)': {
    fontSize: '1.6rem',
  },
}))

const MapFrame = styled('div')({
  width: '100%',
  maxWidth: '900px',
  aspectRatio: '16/9',
  borderRadius: '1.5rem',
  overflow: 'hidden',
  boxShadow: '0 4px 32px rgba(44,24,16,0.10)',
  background: '#eee',
  margin: '0 auto',
  position: 'relative',
})

const mapApiKey = 'AIzaSyCh3akmXOMXtgL5Vxei1hpfErdDhLJNg4g'

const categoryColors: Record<string, string> = {
  home: '#8B3A3A',
  restaurant: '#D4A373',
  cafe: '#8B7E74',
  shop: '#5B8A72',
  drugstore: '#A67C9E',
  bakery: '#C89F5D',
}

const places = [
  { name: 'Mieszkanie Modena', lat: 52.4093, lng: 16.899, category: 'home', icon: '🏠', notes: 'Twój nowy dom na Jeżycach' },
  {
    name: 'Việt Nam Quán',
    lat: 52.4116884,
    lng: 16.9046233,
    category: 'restaurant',
    icon: '🍜',
    notes: 'Najlepsza kuchnia wietnamska w Poznaniu',
  },
  {
    name: 'Sip Easy Cocktail Bar',
    lat: 52.4116115,
    lng: 16.90509,
    category: 'restaurant',
    icon: '🍸',
    notes: 'Najlepszy koktajlowy bar w Poznaniu',
  },
  {
    name: 'Po Swojemu',
    lat: 52.4113841,
    lng: 16.8993163,
    category: 'restaurant',
    icon: '🍷',
    notes: 'Polska kuchnia z twistem, świetne wina',
  },
  {
    name: 'Ona i On',
    lat: 52.4112947,
    lng: 16.9030497,
    category: 'restaurant',
    icon: '🥞',
    notes: 'Śniadania cały dzień - must visit!',
  },
  {
    name: 'Talerzyki',
    lat: 52.4114208,
    lng: 16.8997404,
    category: 'restaurant',
    icon: '🥙',
    notes: 'Orientalne talerze do dzielenia',
  },
  { name: 'U Bećka', lat: 52.4120504, lng: 16.9075592, category: 'restaurant', icon: '🍺', notes: 'Czeskie piwo, gry planszowe' },
  {
    name: 'Tonari',
    lat: 52.4103052,
    lng: 16.8962642,
    category: 'restaurant',
    icon: '🍜',
    notes: 'Tylko 100m od domu! Autentyczny ramen',
  },
  {
    name: 'Bar Tylko u Nas',
    lat: 52.4144525,
    lng: 16.9049103,
    category: 'restaurant',
    icon: '🍲',
    notes: 'Bar mleczny - polska kuchnia domowa',
  },
  { name: 'WinoBramie', lat: 52.4098891, lng: 16.8972792, category: 'restaurant', icon: '🍷', notes: 'Tuż obok! Wine bar z ogrodem' },
  {
    name: 'WYPAS',
    lat: 52.4099147,
    lng: 16.8970312,
    category: 'restaurant',
    icon: '🌱',
    notes: 'Tuż obok! Wegańskie dania światowe',
  },
  { name: 'Kim Chi Ken', lat: 52.4103283, lng: 16.9029148, category: 'restaurant', icon: '🍗', notes: 'Korean fried chicken' },
  {
    name: 'UMI Concept Store & Coffee',
    lat: 52.4093257,
    lng: 16.8989914,
    category: 'cafe',
    icon: '☕',
    notes: 'W TYM SAMYM BUDYNKU! Kawa i polska moda',
  },
  {
    name: 'Trzecia Kawa',
    lat: 52.4136086,
    lng: 16.8974837,
    category: 'cafe',
    icon: '☕',
    notes: 'Najlepsza kawa i śniadania w okolicy',
  },
  {
    name: 'Mówiش Mash',
    lat: 52.4091084,
    lng: 16.9022527,
    category: 'cafe',
    icon: '☕',
    notes: 'Specialty coffee, bagele, śniadania',
  },
  { name: 'Uno', lat: 52.4105511, lng: 16.9041687, category: 'cafe', icon: '☕', notes: 'Jajka po turecku - idealne śniadanie' },
  { name: 'Cukier Puder', lat: 52.4103157, lng: 16.9099996, category: 'cafe', icon: '🍰', notes: 'Najlepsze ciasta - Dacquoise!' },
  { name: 'STRAG.', lat: 52.4115284, lng: 16.8956447, category: 'cafe', icon: '☕', notes: 'Panko eggs toast - must try' },
  { name: 'Biedronka', lat: 52.4142521, lng: 16.8976563, category: 'shop', icon: '🛒', notes: '5 min piechotą • Pn-Sb: 6:00-23:00' },
  { name: 'Netto', lat: 52.4115439, lng: 16.89534, category: 'shop', icon: '🛒', notes: '6 min piechotą • Pn-Sb: 6:00-22:00' },
  {
    name: 'Sklep 24h Ekoland',
    lat: 52.4087521,
    lng: 16.9098744,
    category: 'shop',
    icon: '🏪',
    notes: 'Prawie non-stop! • 6:00-3:00',
  },
  { name: 'Żabka', lat: 52.4091736, lng: 16.8993793, category: 'shop', icon: '🏪', notes: 'W TYM SAMYM BUDYNKU! • 6:00-23:00' },
  {
    name: 'Rossmann',
    lat: 52.4116315,
    lng: 16.907833,
    category: 'drugstore',
    icon: '💄',
    notes: 'Największa drogeria • Pn-Pt: 7:30-21:00',
  },
  {
    name: 'Hebe',
    lat: 52.4117788,
    lng: 16.908725,
    category: 'drugstore',
    icon: '💄',
    notes: 'Świetny wybór kosmetyków • Pn-Pt: 8:00-20:00',
  },
  {
    name: 'Piekarnia Czarny Chleb',
    lat: 52.41158,
    lng: 16.9095143,
    category: 'bakery',
    icon: '🥖',
    notes: 'Bio chleb na zakwasie - szybko się kończy!',
  },
  { name: 'Mąka Woda Sól', lat: 52.4143374, lng: 16.904868, category: 'bakery', icon: '🥐', notes: 'Najlepsze rogaliki w Poznaniu' },
]

const createMarkers = (googleMap: unknown) => {
  if (!window.google?.maps) return

  const gmaps = window.google.maps

  places.forEach(place => {
    const marker = new gmaps.Marker({
      position: { lat: place.lat, lng: place.lng },
      map: googleMap,
      title: place.name,
      label: { text: place.icon, fontSize: '20px' },
      icon: {
        path: gmaps.SymbolPath.CIRCLE,
        fillColor: categoryColors[place.category],
        fillOpacity: 0.9,
        strokeColor: '#FFFFFF',
        strokeWeight: 3,
        scale: place.category === 'home' ? 18 : 14,
      },
    })

    const infoContent = `
      <div class="info-window">
        <div class="info-title">${place.icon} ${place.name}</div>
        <div class="info-notes">${place.notes}</div>
      </div>
    `

    const infoWindow = new gmaps.InfoWindow({
      content: infoContent,
    })

    const openInfo = () => infoWindow.open(googleMap, marker)
    marker.addListener('click', openInfo)

    if (place.category === 'home') {
      setTimeout(openInfo, 500)
    }
  })
}

const MapComponent: FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const mapInstanceRef = useRef<unknown>(null)

  useEffect(() => {
    const initGoogleMap = () => {
      if (!mapRef.current || !window.google?.maps || mapInstanceRef.current) return

      const center = { lat: 52.4093, lng: 16.899 }
      const googleMap = new window.google.maps.Map(mapRef.current, {
        zoom: 15,
        center,
        styles: [
          { featureType: 'all', elementType: 'geometry', stylers: [{ color: '#f5f5f5' }] },
          { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#c9d6df' }] },
          { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
          { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
        ],
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      })

      mapInstanceRef.current = googleMap
      createMarkers(googleMap)
    }

    // Check if script is already loading or loaded
    const existingScript = document.querySelector(`script[src*="maps.googleapis.com/maps/api/js"]`)

    if (existingScript) {
      // Script already exists, just wait for it to load
      if (window.google?.maps) {
        initGoogleMap()
      } else {
        // Wait for the script to load
        existingScript.addEventListener('load', initGoogleMap)
        return () => existingScript.removeEventListener('load', initGoogleMap)
      }
    } else {
      // Load Google Maps script for the first time
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${mapApiKey}`
      script.async = true
      script.defer = true
      script.addEventListener('load', initGoogleMap)
      document.head.appendChild(script)

      return () => {
        script.removeEventListener('load', initGoogleMap)
      }
    }
  }, [])

  return (
    <MapSection id="location" className="fade-in">
      <MapTitle>Mapa sąsiedztwa</MapTitle>
      <MapFrame>
        <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      </MapFrame>
    </MapSection>
  )
}

export { MapComponent as Map }
