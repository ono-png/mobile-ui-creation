"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { MapPin, Search, Navigation } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface MapPinSelectorProps {
  onLocationSelect: (lat: number, lng: number, address: string) => void
  initialLat?: number
  initialLng?: number
}

export function MapPinSelector({ onLocationSelect, initialLat = 35.6812, initialLng = 139.7671 }: MapPinSelectorProps) {
  const [pinPosition, setPinPosition] = useState({ x: 50, y: 50 })
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState({
    lat: initialLat,
    lng: initialLng,
    address: "",
  })

  const handleMapClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setPinPosition({ x, y })

      // Simulate lat/lng calculation
      const lat = initialLat + (50 - y) * 0.001
      const lng = initialLng + (x - 50) * 0.001
      const address = `東京都新宿区西新宿${Math.floor(x / 10)}-${Math.floor(y / 10)}-1`

      setSelectedLocation({ lat, lng, address })
      onLocationSelect(lat, lng, address)
    },
    [initialLat, initialLng, onLocationSelect],
  )

  const handleSearch = () => {
    if (searchQuery) {
      // Simulate address search
      setPinPosition({ x: 50, y: 40 })
      const address = searchQuery
      setSelectedLocation({ lat: 35.6895, lng: 139.6917, address })
      onLocationSelect(35.6895, 139.6917, address)
    }
  }

  return (
    <div className="space-y-3">
      {/* Search bar */}
      <div className="flex gap-2 p-4 pb-0">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="住所を検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <Button type="button" variant="outline" onClick={handleSearch}>
          検索
        </Button>
      </div>

      {/* Map area */}
      <div className="relative h-80 bg-muted cursor-crosshair overflow-hidden" onClick={handleMapClick}>
        {/* Simulated map background */}
        <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/80">
          {/* Grid lines */}
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
            {Array.from({ length: 36 }).map((_, i) => (
              <div key={i} className="border border-border/20" />
            ))}
          </div>

          {/* Simulated roads */}
          <div className="absolute top-1/3 left-0 right-0 h-3 bg-muted-foreground/10" />
          <div className="absolute top-2/3 left-0 right-0 h-2 bg-muted-foreground/10" />
          <div className="absolute left-1/4 top-0 bottom-0 w-2 bg-muted-foreground/10" />
          <div className="absolute left-2/3 top-0 bottom-0 w-3 bg-muted-foreground/10" />

          {/* Label */}
          <div className="absolute top-4 left-4 bg-card/90 backdrop-blur px-3 py-1.5 rounded-lg text-xs text-muted-foreground flex items-center gap-1.5">
            <Navigation className="h-3.5 w-3.5" />
            クリックしてピンを配置
          </div>
        </div>

        {/* Pin marker */}
        <div
          className="absolute transform -translate-x-1/2 -translate-y-full transition-all duration-200"
          style={{ left: `${pinPosition.x}%`, top: `${pinPosition.y}%` }}
        >
          <div className="relative">
            <MapPin className="h-10 w-10 text-destructive drop-shadow-lg" fill="currentColor" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-destructive/30 rounded-full animate-ping" />
          </div>
        </div>
      </div>

      {/* Selected location info */}
      {selectedLocation.address && (
        <div className="px-4 pb-4">
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-sm font-medium text-foreground mb-1">選択された場所</p>
            <p className="text-sm text-muted-foreground">{selectedLocation.address}</p>
            <p className="text-xs text-muted-foreground mt-1">
              緯度: {selectedLocation.lat.toFixed(6)}, 経度: {selectedLocation.lng.toFixed(6)}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
