"use client"

import { useEffect, useState, useRef } from "react"
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { Search, MapPin, Crosshair } from "lucide-react"

// Fix for default marker icon in Leaflet + Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
})

interface LocationMapProps {
  initialAddress?: string
  onLocationSelect: (location: {
    address: string
    city: string
    zipCode: string
    latitude: number
    longitude: number
  }) => void
}

interface SearchResult {
  place_id: number
  display_name: string
  lat: string
  lon: string
  address?: {
    city?: string
    town?: string
    village?: string
    county?: string
    postcode?: string
  }
}

// Component to handle map clicks/drags and update state
function MapEvents({ onLocationChange }: { onLocationChange: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onLocationChange(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
}

// Component to programmatically update map view
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, map.getZoom(), { animate: true })
  }, [center, map])
  return null
}

export default function LocationMap({ initialAddress, onLocationSelect }: LocationMapProps) {
  const [searchQuery, setSearchQuery] = useState(initialAddress || "")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [position, setPosition] = useState<[number, number]>([20.5937, 78.9629]) // Default India
  const [isLocked, setIsLocked] = useState(false)
  const searchTimeoutRef = useRef<NodeJS.Timeout>()

  // Debounced Search
  useEffect(() => {
    if (searchQuery.length < 3) {
      setSearchResults([])
      return
    }

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    searchTimeoutRef.current = setTimeout(() => {
      setIsSearching(true)
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5&addressdetails=1`)
        .then((res) => res.json())
        .then((data) => {
          setSearchResults(data)
          setShowResults(true)
          setIsSearching(false)
        })
        .catch(() => setIsSearching(false))
    }, 500)

    return () => clearTimeout(searchTimeoutRef.current)
  }, [searchQuery])

  // Get User Location on Mount
  useEffect(() => {
    if (navigator.geolocation && !initialAddress) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude
          const lng = pos.coords.longitude
          setPosition([lat, lng])
          reverseGeocode(lat, lng)
        },
        () => {
          console.log("Geolocation denied or unavailable")
        }
      )
    }
  }, [])

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
      const data = await res.json()
      
      if (data && data.display_name) {
        setSearchQuery(data.display_name)
        
        const city = data.address?.city || data.address?.town || data.address?.village || data.address?.county || ""
        const zipCode = data.address?.postcode || ""
        
        onLocationSelect({
          address: data.display_name,
          city,
          zipCode,
          latitude: lat,
          longitude: lng,
        })
        setIsLocked(true)
      }
    } catch (e) {
      console.error("Reverse geocoding failed")
    }
  }

  const handleResultSelect = (result: SearchResult) => {
    const lat = parseFloat(result.lat)
    const lng = parseFloat(result.lon)
    setPosition([lat, lng])
    setSearchQuery(result.display_name)
    setShowResults(false)
    
    const city = result.address?.city || result.address?.town || result.address?.village || result.address?.county || ""
    const zipCode = result.address?.postcode || ""
    
    onLocationSelect({
      address: result.display_name,
      city,
      zipCode,
      latitude: lat,
      longitude: lng,
    })
    setIsLocked(true)
  }

  const handleMarkerDragEnd = (e: any) => {
    const marker = e.target
    const pos = marker.getLatLng()
    setPosition([pos.lat, pos.lng])
    reverseGeocode(pos.lat, pos.lng)
  }

  const handleCenterUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        setPosition([lat, lng])
        reverseGeocode(lat, lng)
      })
    }
  }

  return (
    <div className="space-y-4 w-full">
      {/* Search Input */}
      <div className="relative z-[1000]">
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Search Service Address
        </label>
        <div className="relative mt-2">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setIsLocked(false)
            }}
            onFocus={() => {
              if (searchResults.length > 0) setShowResults(true)
            }}
            placeholder="Search for an address or area..."
            className="w-full rounded-xl border border-border bg-secondary/50 pl-10 pr-10 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          />
          {isSearching && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          )}
        </div>

        {/* Dropdown Results */}
        {showResults && searchResults.length > 0 && (
          <div className="absolute left-0 right-0 mt-2 max-h-60 overflow-y-auto rounded-xl border border-border bg-background shadow-xl">
            {searchResults.map((result) => (
              <button
                key={result.place_id}
                onClick={() => handleResultSelect(result)}
                className="flex w-full items-start gap-3 border-b border-border p-3 text-left hover:bg-secondary/50 last:border-0"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-foreground">{result.display_name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Map Container */}
      <div className="relative h-[300px] sm:h-[400px] w-full overflow-hidden rounded-2xl border border-border shadow-sm z-[10]">
        <MapContainer
          center={position}
          zoom={15}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; Google Maps'
            url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          />
          <Marker
            position={position}
            draggable={true}
            eventHandlers={{
              dragend: handleMarkerDragEnd,
            }}
          />
          <MapEvents onLocationChange={(lat, lng) => {
            setPosition([lat, lng])
            reverseGeocode(lat, lng)
          }} />
          <MapUpdater center={position} />
        </MapContainer>

        {/* My Location Button */}
        <button
          onClick={handleCenterUserLocation}
          className="absolute bottom-4 right-4 z-[400] flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background/90 text-primary shadow-sm backdrop-blur-md hover:bg-background transition-colors"
          title="Center on my location"
        >
          <Crosshair className="h-5 w-5" />
        </button>
      </div>

      {/* Coordinates Display */}
      <div className="flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 p-4">
        <div className="flex items-center gap-3">
          <div className={`h-2 w-2 rounded-full animate-pulse ${isLocked ? "bg-success" : "bg-warning"}`} />
          <span className={`text-xs font-semibold ${isLocked ? "text-success" : "text-warning"}`}>
            {isLocked ? "Location Locked" : "Locating..."}
          </span>
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          {position[0].toFixed(6)}, {position[1].toFixed(6)}
        </div>
      </div>
    </div>
  )
}
