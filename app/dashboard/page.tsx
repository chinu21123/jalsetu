"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from "react"
import {
  Camera,
  BarChart3,
  Bell,
  Droplets,
  FileText,
  Calculator,
  Bot,
  Calendar,
  Home,
  Cloud,
  CloudRain,
  Sun,
  CloudSnow,
  Wind,
} from "lucide-react"

const dashboardCards = [
  {
    title: "Upload Rooftop Data",
    description: "Capture and analyze your rooftop area",
    icon: Camera,
    href: "/rooftop-data",
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Tank Size Prediction",
    description: "AI-powered tank capacity recommendations",
    icon: BarChart3,
    href: "/tank-prediction",
    color: "bg-secondary/10 text-secondary",
  },
  {
    title: "Maintenance Alerts",
    description: "Stay on top of system maintenance",
    icon: Bell,
    href: "/maintenance",
    color: "bg-accent/10 text-accent",
  },
  {
    title: "PH & Water Quality",
    description: "Monitor your water quality levels",
    icon: Droplets,
    href: "/water-quality",
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Govt Schemes",
    description: "Explore subsidies and benefits",
    icon: FileText,
    href: "/government-schemes",
    color: "bg-secondary/10 text-secondary",
  },
  {
    title: "ROI Calculator",
    description: "Calculate your investment returns",
    icon: Calculator,
    href: "/roi-calculator",
    color: "bg-accent/10 text-accent",
  },
  {
    title: "Smart AI Tips",
    description: "Get personalized recommendations",
    icon: Bot,
    href: "/ai-tips",
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Logs & Alerts",
    description: "Track your maintenance history",
    icon: Calendar,
    href: "/logs",
    color: "bg-secondary/10 text-secondary",
  },
]

export default function Dashboard() {
  const [userLocation, setUserLocation] = useState("New Delhi, India")
  const [isEditingLocation, setIsEditingLocation] = useState(false)
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)

  useEffect(() => {
    const script = document.createElement("script")
    script.innerHTML = `
      (function() {
        const iframe = document.createElement('iframe');
        iframe.src = 'https://cdn.botpress.cloud/webchat/v3.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/09/08/14/20250908144412-ZO8PB0T5.json';
        iframe.style.cssText = 'position: fixed; bottom: 20px; right: 20px; width: 400px; height: 600px; border: none; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); z-index: 9999; display: none;';
        iframe.id = 'botpress-chat-iframe';
        document.body.appendChild(iframe);
        
        window.toggleBotpressChat = function() {
          const chatIframe = document.getElementById('botpress-chat-iframe');
          if (chatIframe.style.display === 'none') {
            chatIframe.style.display = 'block';
          } else {
            chatIframe.style.display = 'none';
          }
        };
      })();
    `
    document.head.appendChild(script)

    return () => {
      const chatIframe = document.getElementById("botpress-chat-iframe")
      if (chatIframe) {
        document.body.removeChild(chatIframe)
      }
      document.head.removeChild(script)
    }
  }, [])

  const handleLocationChange = (newLocation: string) => {
    setUserLocation(newLocation)
    setIsEditingLocation(false)
    // In a real app, this would fetch weather data for the new location
  }

  const toggleBotpressChat = () => {
    if (window.toggleBotpressChat) {
      window.toggleBotpressChat()
      setIsChatbotOpen(!isChatbotOpen)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <div className="p-2 bg-primary/20 rounded-full">
                  <Home className="w-6 h-6 text-primary" />
                </div>
                <div className="p-2 bg-secondary/20 rounded-full">
                  <Droplets className="w-6 h-6 text-secondary" />
                </div>
                <div className="p-2 bg-accent/20 rounded-full">
                  <Cloud className="w-6 h-6 text-accent" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Smart Water Conservation Dashboard</h1>
                <p className="text-muted-foreground mt-1">Manage your rainwater harvesting system efficiently</p>
              </div>
            </div>

            {/* Chatbot Button */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-50"></div>
                <Button
                  onClick={toggleBotpressChat}
                  className="relative bg-gradient-to-r from-primary/90 to-secondary/90 hover:from-primary hover:to-secondary text-white shadow-xl border-0 px-6 py-3 backdrop-blur-sm"
                  style={{ backgroundColor: "rgb(59, 130, 246)" }} // Fallback solid color for contrast
                  size="lg"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-semibold text-white">AquaBot</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardCards.map((card, index) => {
            const IconComponent = card.icon
            return (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-0 bg-card/80 backdrop-blur-sm"
                onClick={() => (window.location.href = card.href)}
              >
                <CardHeader className="pb-3">
                  <div className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center mb-3`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">{card.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Weather Predictions & Stats */}
        <div className="mt-12 space-y-6">
          {/* Weather Forecast */}
          <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-foreground flex items-center">
                    <Cloud className="w-6 h-6 mr-2 text-primary" />
                    7-Day Weather Forecast
                  </CardTitle>
                  <CardDescription>Plan your rainwater collection with accurate weather predictions</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  {isEditingLocation ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={userLocation}
                        onChange={(e) => setUserLocation(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleLocationChange(userLocation)}
                        className="px-3 py-1 text-sm border border-primary/30 rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="Enter location..."
                        autoFocus
                      />
                      <Button
                        size="sm"
                        onClick={() => handleLocationChange(userLocation)}
                        className="bg-primary hover:bg-primary/90"
                      >
                        ✓
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditingLocation(true)}
                      className="text-primary border-primary/30 hover:bg-primary/10"
                    >
                      📍 {userLocation} ✏️
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {[
                  { day: "Today", icon: CloudRain, temp: "28°C", rain: "85%", amount: "15mm" },
                  { day: "Tomorrow", icon: CloudRain, temp: "26°C", rain: "92%", amount: "22mm" },
                  { day: "Wed", icon: Sun, temp: "32°C", rain: "10%", amount: "0mm" },
                  { day: "Thu", icon: CloudRain, temp: "29°C", rain: "78%", amount: "12mm" },
                  { day: "Fri", icon: CloudSnow, temp: "24°C", rain: "95%", amount: "28mm" },
                  { day: "Sat", icon: Sun, temp: "31°C", rain: "20%", amount: "2mm" },
                  { day: "Sun", icon: Wind, temp: "30°C", rain: "45%", amount: "5mm" },
                ].map((forecast, index) => {
                  const IconComponent = forecast.icon
                  return (
                    <div key={index} className="text-center p-3 bg-card/50 rounded-lg border border-border/50">
                      <p className="text-sm font-medium text-muted-foreground mb-2">{forecast.day}</p>
                      <IconComponent className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <p className="text-lg font-bold text-foreground">{forecast.temp}</p>
                      <p className="text-sm text-secondary font-medium">{forecast.rain}</p>
                      <p className="text-xs text-accent font-semibold">{forecast.amount}</p>
                    </div>
                  )
                })}
              </div>
              <div className="mt-4 p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                <p className="text-sm text-secondary font-medium">
                  💧 Expected Collection: <span className="font-bold">84L</span> this week for {userLocation}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Heavy rainfall expected Thu-Fri. Prepare your collection system!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Updated Quick Stats without tank capacity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-primary">Water Saved This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">2,450L</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card className="bg-accent/5 border-accent/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-accent">Cost Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">₹1,240</div>
                <p className="text-xs text-muted-foreground">This quarter</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
