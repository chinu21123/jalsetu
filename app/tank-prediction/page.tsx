"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Droplets, AlertTriangle, TrendingUp, Gauge } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

// Sample data for rainfall vs tank fill
const rainfallData = [
  { month: "Jan", rainfall: 15, tankFill: 25, capacity: 1000 },
  { month: "Feb", rainfall: 20, tankFill: 35, capacity: 1000 },
  { month: "Mar", rainfall: 45, tankFill: 60, capacity: 1000 },
  { month: "Apr", rainfall: 80, tankFill: 85, capacity: 1000 },
  { month: "May", rainfall: 120, tankFill: 95, capacity: 1000 },
  { month: "Jun", rainfall: 200, tankFill: 100, capacity: 1000 },
  { month: "Jul", rainfall: 250, tankFill: 100, capacity: 1000 },
  { month: "Aug", rainfall: 180, tankFill: 98, capacity: 1000 },
  { month: "Sep", rainfall: 100, tankFill: 80, capacity: 1000 },
  { month: "Oct", rainfall: 60, tankFill: 65, capacity: 1000 },
  { month: "Nov", rainfall: 25, tankFill: 45, capacity: 1000 },
  { month: "Dec", rainfall: 10, tankFill: 30, capacity: 1000 },
]

export default function TankPredictionPage() {
  const [currentTankLevel, setCurrentTankLevel] = useState(78)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const [animatedLevel, setAnimatedLevel] = useState(0)
  const [selectedMonth, setSelectedMonth] = useState("Jun")

  // Animate tank filling
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimatedLevel((prev) => {
        if (prev < currentTankLevel) {
          return prev + 1
        }
        return prev
      })
    }, 50)

    return () => clearInterval(timer)
  }, [currentTankLevel])

  // Check for overflow
  useEffect(() => {
    setIsOverflowing(currentTankLevel >= 95)
  }, [currentTankLevel])

  const currentMonthData = rainfallData.find((data) => data.month === selectedMonth)
  const predictedCapacity = Math.round((currentMonthData?.rainfall || 0) * 4.2 + 500)

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
            <h1 className="text-2xl font-bold text-foreground">Tank Size Prediction & Monitoring</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Current Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-primary flex items-center">
                <Gauge className="w-4 h-4 mr-2" />
                Current Tank Level
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{currentTankLevel}%</div>
              <Progress value={currentTankLevel} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {currentTankLevel >= 95 ? "Near overflow" : currentTankLevel >= 80 ? "Optimal level" : "Room for more"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-secondary/5 border-secondary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-secondary flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Predicted Capacity Needed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{predictedCapacity}L</div>
              <p className="text-xs text-muted-foreground mt-1">Based on {selectedMonth} rainfall</p>
            </CardContent>
          </Card>

          <Card
            className={`${isOverflowing ? "bg-destructive/10 border-destructive/50" : "bg-accent/5"} border-accent/20`}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-accent flex items-center">
                <AlertTriangle className={`w-4 h-4 mr-2 ${isOverflowing ? "text-destructive" : ""}`} />
                Overflow Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Badge variant={isOverflowing ? "destructive" : "secondary"}>
                  {isOverflowing ? "WARNING" : "SAFE"}
                </Badge>
                {isOverflowing && (
                  <div className="animate-pulse">
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {isOverflowing ? "Tank overflow risk detected" : "Tank level within safe limits"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 3D Tank Visualization */}
        <Card className={isOverflowing ? "ring-2 ring-destructive/50 shadow-lg shadow-destructive/20" : ""}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Droplets className="w-5 h-5 text-primary" />
              <span>3D Tank Visualization</span>
            </CardTitle>
            <CardDescription>Real-time water level with overflow detection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <div className="relative">
                {/* Tank Container */}
                <div
                  className={`relative w-48 h-64 border-4 rounded-b-3xl rounded-t-lg ${
                    isOverflowing
                      ? "border-destructive shadow-lg shadow-destructive/30 animate-pulse"
                      : "border-primary/30"
                  } bg-gradient-to-b from-transparent to-primary/5`}
                  style={{
                    background: `linear-gradient(to bottom, 
                      transparent 0%, 
                      transparent ${100 - animatedLevel}%, 
                      rgba(59, 130, 246, 0.3) ${100 - animatedLevel}%, 
                      rgba(59, 130, 246, 0.6) 100%)`,
                  }}
                >
                  {/* Water Animation */}
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/80 to-primary/40 rounded-b-3xl transition-all duration-1000 ease-out"
                    style={{ height: `${animatedLevel}%` }}
                  >
                    {/* Water Surface Animation */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary/60 via-primary/80 to-primary/60 animate-pulse" />

                    {/* Bubbles */}
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-primary/30 rounded-full animate-bounce"
                        style={{
                          left: `${20 + i * 15}%`,
                          bottom: `${10 + i * 10}%`,
                          animationDelay: `${i * 0.5}s`,
                          animationDuration: `${2 + i * 0.3}s`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Tank Level Indicator */}
                  <div className="absolute right-2 top-4 bottom-4 w-6 bg-muted/20 rounded-full">
                    <div
                      className="absolute bottom-0 w-full bg-gradient-to-t from-primary to-primary/60 rounded-full transition-all duration-1000"
                      style={{ height: `${animatedLevel}%` }}
                    />
                    <div className="absolute top-1/2 -right-8 transform -translate-y-1/2">
                      <span className="text-sm font-bold text-foreground">{animatedLevel}%</span>
                    </div>
                  </div>

                  {/* Overflow Effect */}
                  {isOverflowing && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <div className="w-8 h-8 bg-destructive/60 rounded-full animate-ping" />
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-destructive rounded-full" />
                    </div>
                  )}
                </div>

                {/* Tank Base */}
                <div className="w-52 h-4 bg-gradient-to-r from-muted via-muted-foreground/20 to-muted rounded-full -mt-2 mx-auto" />
              </div>
            </div>

            {/* Tank Controls */}
            <div className="mt-6 space-y-4">
              <div className="flex justify-center space-x-2">
                <Button
                  onClick={() => setCurrentTankLevel(Math.max(0, currentTankLevel - 10))}
                  variant="outline"
                  size="sm"
                >
                  -10%
                </Button>
                <Button
                  onClick={() => setCurrentTankLevel(Math.min(100, currentTankLevel + 10))}
                  variant="outline"
                  size="sm"
                >
                  +10%
                </Button>
                <Button
                  onClick={() => setCurrentTankLevel(100)}
                  variant="outline"
                  size="sm"
                  className="text-destructive border-destructive"
                >
                  Simulate Overflow
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rainfall vs Tank Fill Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-secondary" />
              <span>Rainfall vs Tank Fill Analysis</span>
            </CardTitle>
            <CardDescription>Monthly rainfall correlation with tank water levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={rainfallData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="rainfall"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                    name="Rainfall (mm)"
                  />
                  <Line
                    type="monotone"
                    dataKey="tankFill"
                    stroke="hsl(var(--secondary))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--secondary))", strokeWidth: 2, r: 4 }}
                    name="Tank Fill (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Prediction Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Gauge className="w-5 h-5 text-accent" />
              <span>Tank Capacity Prediction</span>
            </CardTitle>
            <CardDescription>Recommended tank sizes based on seasonal rainfall patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={rainfallData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="capacity"
                    stroke="hsl(var(--accent))"
                    fill="hsl(var(--accent))"
                    fillOpacity={0.3}
                    name="Recommended Capacity (L)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
