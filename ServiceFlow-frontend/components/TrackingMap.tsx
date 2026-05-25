"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix for default marker icon in Leaflet + Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
})

// Custom Icon for Technician
const techIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom Icon for Destination
const destIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface TrackingMapProps {
  techLocation: { lat?: number; lng?: number; latitude?: number; longitude?: number } | null
  destination: { lat?: number; lng?: number; latitude?: number; longitude?: number } | null
  techName: string
}

function MapBounds({ positions }: { positions: [number, number][] }) {
  const map = useMap()
  useEffect(() => {
    if (positions.length > 0) {
      const bounds = L.latLngBounds(positions)
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 })
    }
  }, [positions, map])
  return null
}

export default function TrackingMap({ techLocation, destination, techName }: TrackingMapProps) {
  // Default fallback location (San Francisco)
  const defaultCenter: [number, number] = [37.7749, -122.4194]
  
  const techLat = techLocation?.lat ?? techLocation?.latitude
  const techLng = techLocation?.lng ?? techLocation?.longitude
  const destLat = destination?.lat ?? destination?.latitude
  const destLng = destination?.lng ?? destination?.longitude

  const techPos: [number, number] | null = techLat !== undefined && techLng !== undefined ? [techLat, techLng] : null
  const destPos: [number, number] | null = destLat !== undefined && destLng !== undefined ? [destLat, destLng] : null
  
  const positions: [number, number][] = []
  if (techPos) positions.push(techPos)
  if (destPos) positions.push(destPos)

  const center = positions.length > 0 ? positions[0] : defaultCenter

  return (
    <div className="relative h-64 sm:h-80 w-full overflow-hidden z-[10]">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; Google Maps'
          url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        />
        
        {techPos && (
          <Marker position={techPos} icon={techIcon}>
            <Popup>
              <strong>{techName}</strong><br/>
              Current Location
            </Popup>
          </Marker>
        )}
        
        {destPos && (
          <Marker position={destPos} icon={destIcon}>
            <Popup>
              <strong>Your Location</strong><br/>
              Service Destination
            </Popup>
          </Marker>
        )}

        {techPos && destPos && (
          <Polyline 
            positions={[techPos, destPos]} 
            color="hsl(var(--primary))" 
            weight={3} 
            dashArray="10, 10" 
            opacity={0.7} 
          />
        )}

        <MapBounds positions={positions} />
      </MapContainer>
    </div>
  )
}
