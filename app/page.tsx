"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Droplets, Cloud, Leaf } from "lucide-react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showCapacityForm, setShowCapacityForm] = useState(false)
  const [usesRainwater, setUsesRainwater] = useState<boolean | null>(null)
  const [tankCapacity, setTankCapacity] = useState("")

  const handleLogin = () => {
    // Simple validation
    if (username && password) {
      setShowCapacityForm(true)
    }
  }

  const handleGuestContinue = () => {
    setShowCapacityForm(true)
  }

  const handleRainwaterResponse = (response: boolean) => {
    setUsesRainwater(response)
    if (response) {
      // Show tank capacity input
    } else {
      // Redirect to awareness page (for now, just show message)
      alert("Redirecting to awareness page...")
    }
  }

  const handleCapacitySubmit = () => {
    // Redirect to main dashboard
    window.location.href = "/dashboard"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated raindrop background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            <Droplets className="w-4 h-4 text-primary/30" />
          </div>
        ))}
      </div>

      <Card className="w-full max-w-md shadow-2xl border-0 bg-card/95 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center items-center space-x-2">
            <div className="p-3 bg-primary/10 rounded-full">
              <Droplets className="w-8 h-8 text-primary" />
            </div>
            <div className="p-3 bg-secondary/10 rounded-full">
              <Leaf className="w-8 h-8 text-secondary" />
            </div>
            <div className="p-3 bg-accent/10 rounded-full">
              <Cloud className="w-8 h-8 text-accent" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">Rainwater Harvesting</CardTitle>
          <CardDescription className="text-muted-foreground">Smart Water Conservation Assistant</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {!showCapacityForm ? (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border-primary/20 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleLogin}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={!username || !password}
                >
                  Login
                </Button>
                <Button
                  onClick={handleGuestContinue}
                  variant="outline"
                  className="w-full border-secondary text-secondary hover:bg-secondary/10 bg-transparent"
                >
                  Continue as Guest
                </Button>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              {usesRainwater === null ? (
                <>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Do you use Rainwater Harvesting?</h3>
                  </div>
                  <div className="space-y-3">
                    <Button
                      onClick={() => handleRainwaterResponse(true)}
                      className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    >
                      Yes, I do
                    </Button>
                    <Button
                      onClick={() => handleRainwaterResponse(false)}
                      variant="outline"
                      className="w-full border-muted-foreground text-muted-foreground hover:bg-muted"
                    >
                      No, I don't
                    </Button>
                  </div>
                </>
              ) : usesRainwater ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Tank Capacity (Liters)</Label>
                    <Input
                      id="capacity"
                      type="number"
                      placeholder="Enter your tank capacity"
                      value={tankCapacity}
                      onChange={(e) => setTankCapacity(e.target.value)}
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>
                  <Button
                    onClick={handleCapacitySubmit}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={!tankCapacity}
                  >
                    Continue to Dashboard
                  </Button>
                </>
              ) : (
                <div className="text-center space-y-4">
                  <div className="p-4 bg-accent/10 rounded-lg">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Learn About Rainwater Harvesting</h3>
                    <p className="text-muted-foreground text-sm">
                      Discover how rainwater harvesting can help you save water and reduce costs.
                    </p>
                  </div>
                  <Button
                    onClick={() => (window.location.href = "/awareness")}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    Learn More
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
