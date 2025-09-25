"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Droplets, AlertTriangle, CheckCircle, Beaker } from "lucide-react"

interface WaterQualityMetric {
  name: string
  value: number
  unit: string
  status: "safe" | "caution" | "unsafe"
  range: { min: number; max: number; optimal: { min: number; max: number } }
  description: string
}

export default function WaterQualityPage() {
  const [phLevel, setPhLevel] = useState(7.2)
  const [isAnimating, setIsAnimating] = useState(false)

  const waterMetrics: WaterQualityMetric[] = [
    {
      name: "pH Level",
      value: phLevel,
      unit: "",
      status: phLevel >= 6.5 && phLevel <= 8.5 ? "safe" : phLevel >= 6.0 && phLevel <= 9.0 ? "caution" : "unsafe",
      range: { min: 0, max: 14, optimal: { min: 6.5, max: 8.5 } },
      description: "Measures acidity/alkalinity of water",
    },
    {
      name: "TDS",
      value: 180,
      unit: "ppm",
      status: "safe",
      range: { min: 0, max: 500, optimal: { min: 50, max: 300 } },
      description: "Total Dissolved Solids concentration",
    },
    {
      name: "Turbidity",
      value: 2.1,
      unit: "NTU",
      status: "safe",
      range: { min: 0, max: 10, optimal: { min: 0, max: 4 } },
      description: "Water clarity measurement",
    },
    {
      name: "Chlorine",
      value: 0.3,
      unit: "mg/L",
      status: "safe",
      range: { min: 0, max: 5, optimal: { min: 0.2, max: 1.0 } },
      description: "Disinfectant residual level",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      // Simulate slight pH variations
      setPhLevel((prev) => {
        const variation = (Math.random() - 0.5) * 0.2
        return Math.max(6.0, Math.min(8.5, prev + variation))
      })
      setTimeout(() => setIsAnimating(false), 500)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "safe":
        return "text-secondary"
      case "caution":
        return "text-accent"
      case "unsafe":
        return "text-destructive"
      default:
        return "text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "safe":
        return <CheckCircle className="w-4 h-4" />
      case "caution":
        return <AlertTriangle className="w-4 h-4" />
      case "unsafe":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Droplets className="w-4 h-4" />
    }
  }

  const getUsageRecommendation = (metrics: WaterQualityMetric[]) => {
    const unsafeCount = metrics.filter((m) => m.status === "unsafe").length
    const cautionCount = metrics.filter((m) => m.status === "caution").length

    if (unsafeCount > 0) {
      return {
        status: "unsafe",
        title: "Not Safe for Consumption",
        description: "Water requires treatment before any use. Consider professional filtration.",
        color: "bg-destructive/10 text-destructive border-destructive/20",
      }
    }
    if (cautionCount > 0) {
      return {
        status: "caution",
        title: "Safe for Washing & Cleaning Only",
        description: "Water is suitable for non-potable uses. Avoid drinking without treatment.",
        color: "bg-accent/10 text-accent border-accent/20",
      }
    }
    return {
      status: "safe",
      title: "Safe for All Uses",
      description: "Water quality is excellent and safe for drinking, cooking, and all household uses.",
      color: "bg-secondary/10 text-secondary border-secondary/20",
    }
  }

  const recommendation = getUsageRecommendation(waterMetrics)

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
              <Droplets className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Water Quality Monitoring</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Overall Status */}
        <Card className={recommendation.color}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full ${recommendation.color}`}>{getStatusIcon(recommendation.status)}</div>
              <div>
                <h2 className="text-xl font-bold">{recommendation.title}</h2>
                <p className="text-sm opacity-80">{recommendation.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* pH Gauge */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Beaker className="w-5 h-5 text-primary" />
              <span>pH Level Monitor</span>
            </CardTitle>
            <CardDescription>Real-time pH measurement with color-coded safety zones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-6">
              <div className="relative">
                {/* pH Gauge */}
                <div className="w-48 h-24 relative overflow-hidden">
                  <div
                    className="absolute inset-0 rounded-t-full"
                    style={{
                      background: `conic-gradient(
                        from 180deg at 50% 100%,
                        #ef4444 0deg,
                        #f59e0b 60deg,
                        #22c55e 90deg,
                        #22c55e 150deg,
                        #f59e0b 180deg,
                        #ef4444 240deg
                      )`,
                    }}
                  />
                  <div className="absolute inset-2 bg-background rounded-t-full" />

                  {/* pH Needle */}
                  <div
                    className={`absolute bottom-0 left-1/2 w-0.5 h-20 bg-foreground origin-bottom transition-transform duration-500 ${
                      isAnimating ? "animate-pulse" : ""
                    }`}
                    style={{
                      transform: `translateX(-50%) rotate(${(phLevel / 14) * 180 - 90}deg)`,
                    }}
                  />

                  {/* Center dot */}
                  <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-foreground rounded-full transform -translate-x-1/2" />
                </div>

                {/* pH Value Display */}
                <div className="text-center mt-4">
                  <div
                    className={`text-3xl font-bold ${getStatusColor(waterMetrics[0].status)} ${isAnimating ? "animate-pulse" : ""}`}
                  >
                    {phLevel.toFixed(1)}
                  </div>
                  <div className="text-sm text-muted-foreground">pH Level</div>
                </div>

                {/* pH Scale Labels */}
                <div className="flex justify-between text-xs text-muted-foreground mt-2 px-2">
                  <span>0 (Acidic)</span>
                  <span>7 (Neutral)</span>
                  <span>14 (Basic)</span>
                </div>
              </div>
            </div>

            {/* pH Status */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center p-3 bg-destructive/10 rounded-lg">
                <div className="text-destructive font-semibold">Unsafe</div>
                <div className="text-xs text-muted-foreground">pH &lt; 6.0 or &gt; 9.0</div>
              </div>
              <div className="text-center p-3 bg-secondary/10 rounded-lg">
                <div className="text-secondary font-semibold">Safe</div>
                <div className="text-xs text-muted-foreground">pH 6.5 - 8.5</div>
              </div>
              <div className="text-center p-3 bg-accent/10 rounded-lg">
                <div className="text-accent font-semibold">Caution</div>
                <div className="text-xs text-muted-foreground">pH 6.0-6.5 or 8.5-9.0</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Water Quality Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {waterMetrics.map((metric, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">{metric.name}</h3>
                    <Badge variant="outline" className={getStatusColor(metric.status)}>
                      {getStatusIcon(metric.status)}
                      <span className="ml-1 capitalize">{metric.status}</span>
                    </Badge>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">
                      {metric.value}
                      <span className="text-sm text-muted-foreground ml-1">{metric.unit}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Min: {metric.range.min}</span>
                      <span>Max: {metric.range.max}</span>
                    </div>
                    <Progress
                      value={(metric.value / metric.range.max) * 100}
                      className={`h-2 ${
                        metric.status === "safe"
                          ? "[&>div]:bg-secondary"
                          : metric.status === "caution"
                            ? "[&>div]:bg-accent"
                            : "[&>div]:bg-destructive"
                      }`}
                    />
                    <p className="text-xs text-muted-foreground">{metric.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testing History */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Test Results</CardTitle>
            <CardDescription>Water quality testing history and trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { date: "2024-01-20", status: "safe", ph: 7.1, tds: 175 },
                { date: "2024-01-15", status: "safe", ph: 7.3, tds: 182 },
                { date: "2024-01-10", status: "caution", ph: 6.4, tds: 195 },
                { date: "2024-01-05", status: "safe", ph: 7.0, tds: 168 },
              ].map((test, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-1 rounded-full ${getStatusColor(test.status)}`}>
                      {getStatusIcon(test.status)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{test.date}</p>
                      <p className="text-sm text-muted-foreground">
                        pH: {test.ph}, TDS: {test.tds}ppm
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className={getStatusColor(test.status)}>
                    {test.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
