"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Camera, Upload, Trash2, Save, ArrowLeft, Satellite, Square, Home } from "lucide-react"

interface UploadedImage {
  id: string
  file: File
  preview: string
  name: string
}

interface Coordinate {
  lat: number
  lng: number
}

export default function RooftopDataPage() {
  const [location, setLocation] = useState<{ lat: number; lng: number; address: string } | null>(null)
  const [isDetectingLocation, setIsDetectingLocation] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [rooftopCoordinates, setRooftopCoordinates] = useState<Coordinate[]>([])
  const [isDrawingMode, setIsDrawingMode] = useState(false)
  const [rooftopArea, setRooftopArea] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const detectLocation = () => {
    setIsDetectingLocation(true)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude

          // Simulate reverse geocoding to get place name
          const places = [
            "New Delhi, Delhi, India",
            "Mumbai, Maharashtra, India",
            "Bangalore, Karnataka, India",
            "Chennai, Tamil Nadu, India",
            "Hyderabad, Telangana, India",
            "Pune, Maharashtra, India",
          ]

          const randomPlace = places[Math.floor(Math.random() * places.length)]

          setLocation({
            lat,
            lng,
            address: randomPlace,
          })
          setIsDetectingLocation(false)
        },
        (error) => {
          console.error("Geolocation error:", error)
          // Fallback to simulated location
          setLocation({
            lat: 28.6139,
            lng: 77.209,
            address: "New Delhi, Delhi, India",
          })
          setIsDetectingLocation(false)
        },
      )
    } else {
      // Fallback for browsers without geolocation
      setTimeout(() => {
        setLocation({
          lat: 28.6139,
          lng: 77.209,
          address: "New Delhi, Delhi, India",
        })
        setIsDetectingLocation(false)
      }, 2000)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const newImage: UploadedImage = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            file,
            preview: e.target?.result as string,
            name: file.name,
          }
          setUploadedImages((prev) => [...prev, newImage])
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const removeImage = (id: string) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== id))
  }

  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrawingMode) return

    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    // Convert pixel coordinates to lat/lng (simplified simulation)
    const lat = location ? location.lat + (y - 200) * 0.0001 : 0
    const lng = location ? location.lng + (x - 300) * 0.0001 : 0

    setRooftopCoordinates((prev) => [...prev, { lat, lng }])
  }

  const calculateArea = () => {
    if (rooftopCoordinates.length < 3) return 0
    // Simplified area calculation (in reality, this would use proper geographic calculations)
    return Math.round(rooftopCoordinates.length * 50 + Math.random() * 100)
  }

  const finishDrawing = () => {
    setIsDrawingMode(false)
    const area = calculateArea()
    setRooftopArea(area)
  }

  const clearDrawing = () => {
    setRooftopCoordinates([])
    setRooftopArea(null)
  }

  const saveRooftopData = () => {
    const data = {
      location,
      coordinates: rooftopCoordinates,
      area: rooftopArea,
      images: uploadedImages.map((img) => ({
        id: img.id,
        name: img.name,
        size: img.file.size,
      })),
      timestamp: new Date().toISOString(),
    }

    // In a real app, this would be saved to a database
    console.log("Saving rooftop data:", data)
    alert("Rooftop data saved successfully!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 p-6">
        <div className="max-w-7xl mx-auto flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => (window.location.href = "/dashboard")}
            className="text-foreground hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-primary/20 rounded-full">
              <Home className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Upload Rooftop Data</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Location Detection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span>Location Detection</span>
            </CardTitle>
            <CardDescription>Detect your location to center the map on your rooftop</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Button
                onClick={detectLocation}
                disabled={isDetectingLocation}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <MapPin className="w-4 h-4 mr-2" />
                {isDetectingLocation ? "Detecting..." : "Detect My Location"}
              </Button>
              {location && (
                <Badge variant="secondary" className="bg-secondary/10 text-secondary">
                  📍 {location.address}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Map Interface */}
        {location && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Satellite className="w-5 h-5 text-secondary" />
                <span>Satellite Map - Draw Your Rooftop</span>
              </CardTitle>
              <CardDescription>Click on the map to draw the boundary of your rooftop</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => setIsDrawingMode(!isDrawingMode)}
                    variant={isDrawingMode ? "default" : "outline"}
                    className={isDrawingMode ? "bg-secondary hover:bg-secondary/90" : ""}
                  >
                    <Square className="w-4 h-4 mr-2" />
                    {isDrawingMode ? "Drawing Mode ON" : "Start Drawing"}
                  </Button>
                  {rooftopCoordinates.length > 0 && (
                    <>
                      <Button
                        onClick={finishDrawing}
                        variant="outline"
                        className="border-accent text-accent bg-transparent"
                      >
                        Finish Drawing
                      </Button>
                      <Button onClick={clearDrawing} variant="outline" size="sm">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear
                      </Button>
                    </>
                  )}
                </div>

                {/* Simulated Map */}
                <div
                  className="relative w-full h-96 bg-gradient-to-br from-green-100 to-green-200 rounded-lg border-2 border-dashed border-primary/30 cursor-crosshair overflow-hidden"
                  onClick={handleMapClick}
                  style={{
                    backgroundImage: `
                      radial-gradient(circle at 20% 30%, rgba(34, 197, 94, 0.3) 0%, transparent 50%),
                      radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                      linear-gradient(45deg, rgba(34, 197, 94, 0.1) 25%, transparent 25%),
                      linear-gradient(-45deg, rgba(59, 130, 246, 0.1) 25%, transparent 25%)
                    `,
                    backgroundSize: "100px 100px, 150px 150px, 20px 20px, 20px 20px",
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Satellite className="w-12 h-12 text-primary/50 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        {isDrawingMode
                          ? "Click to add points for your rooftop boundary"
                          : "Click 'Start Drawing' to begin mapping your rooftop"}
                      </p>
                    </div>
                  </div>

                  {/* Draw rooftop coordinates */}
                  {rooftopCoordinates.map((coord, index) => (
                    <div
                      key={index}
                      className="absolute w-3 h-3 bg-primary rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${50 + (coord.lng - (location?.lng || 0)) * 10000}%`,
                        top: `${50 + (coord.lat - (location?.lat || 0)) * 10000}%`,
                      }}
                    />
                  ))}

                  {/* Draw lines between points */}
                  {rooftopCoordinates.length > 1 && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <polyline
                        points={rooftopCoordinates
                          .map((coord) => {
                            const x = (50 + (coord.lng - (location?.lng || 0)) * 10000) * 6 // Approximate conversion
                            const y = (50 + (coord.lat - (location?.lat || 0)) * 10000) * 3.84 // Approximate conversion
                            return `${x},${y}`
                          })
                          .join(" ")}
                        fill="rgba(59, 130, 246, 0.2)"
                        stroke="rgb(59, 130, 246)"
                        strokeWidth="2"
                      />
                    </svg>
                  )}
                </div>

                {rooftopArea && (
                  <div className="p-4 bg-accent/10 rounded-lg">
                    <p className="text-sm font-medium text-accent">
                      Estimated Rooftop Area: <span className="font-bold">{rooftopArea} sq ft</span>
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Image Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Camera className="w-5 h-5 text-accent" />
              <span>Upload Rooftop Images</span>
            </CardTitle>
            <CardDescription>Upload photos of your rooftop for better analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload from Gallery
                </Button>
                <Button
                  onClick={() => cameraInputRef.current?.click()}
                  variant="outline"
                  className="border-secondary text-secondary hover:bg-secondary/10"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Take Photo
                </Button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileUpload}
                className="hidden"
              />

              {/* Image Gallery */}
              {uploadedImages.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Uploaded Images</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {uploadedImages.map((image) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={image.preview || "/placeholder.svg"}
                          alt={image.name}
                          className="w-full h-32 object-cover rounded-lg border border-border"
                        />
                        <Button
                          onClick={() => removeImage(image.id)}
                          size="sm"
                          variant="destructive"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                        <p className="text-xs text-muted-foreground mt-1 truncate">{image.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Save Data */}
        {(location || uploadedImages.length > 0 || rooftopCoordinates.length > 0) && (
          <Card>
            <CardContent className="pt-6">
              <Button
                onClick={saveRooftopData}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                size="lg"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Rooftop Data
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
