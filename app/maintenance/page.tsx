"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Bell, Filter, Wrench, CheckCircle, AlertTriangle, Calendar, Clock } from "lucide-react"

interface MaintenanceItem {
  id: string
  type: "filter" | "tank" | "pipes" | "pump"
  name: string
  lastCleaned: Date
  nextDue: Date
  status: "good" | "warning" | "overdue"
  daysUntilDue: number
}

const maintenanceItems: MaintenanceItem[] = [
  {
    id: "1",
    type: "filter",
    name: "Primary Water Filter",
    lastCleaned: new Date("2024-01-15"),
    nextDue: new Date("2024-02-15"),
    status: "overdue",
    daysUntilDue: -5,
  },
  {
    id: "2",
    type: "filter",
    name: "Secondary Filter",
    lastCleaned: new Date("2024-01-20"),
    nextDue: new Date("2024-02-20"),
    status: "warning",
    daysUntilDue: 3,
  },
  {
    id: "3",
    type: "tank",
    name: "Main Storage Tank",
    lastCleaned: new Date("2023-12-01"),
    nextDue: new Date("2024-06-01"),
    status: "good",
    daysUntilDue: 45,
  },
  {
    id: "4",
    type: "pipes",
    name: "Inlet Pipes",
    lastCleaned: new Date("2024-01-10"),
    nextDue: new Date("2024-04-10"),
    status: "good",
    daysUntilDue: 25,
  },
]

export default function MaintenancePage() {
  const [items, setItems] = useState<MaintenanceItem[]>(maintenanceItems)
  const [showNotification, setShowNotification] = useState(false)
  const [cleaningItem, setCleaningItem] = useState<string | null>(null)

  useEffect(() => {
    // Simulate push notification for overdue items
    const overdueItems = items.filter((item) => item.status === "overdue")
    if (overdueItems.length > 0) {
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 5000)
    }
  }, [items])

  const handleMarkCleaned = (itemId: string) => {
    setCleaningItem(itemId)

    // Animate cleaning process
    setTimeout(() => {
      setItems((prev) =>
        prev.map((item) => {
          if (item.id === itemId) {
            const today = new Date()
            const nextDue = new Date(today)
            nextDue.setMonth(nextDue.getMonth() + (item.type === "filter" ? 1 : item.type === "tank" ? 6 : 3))

            return {
              ...item,
              lastCleaned: today,
              nextDue,
              status: "good" as const,
              daysUntilDue: Math.ceil((nextDue.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)),
            }
          }
          return item
        }),
      )
      setCleaningItem(null)
    }, 2000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "bg-secondary/10 text-secondary border-secondary/20"
      case "warning":
        return "bg-accent/10 text-accent border-accent/20"
      case "overdue":
        return "bg-destructive/10 text-destructive border-destructive/20"
      default:
        return "bg-muted/10 text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return <CheckCircle className="w-4 h-4" />
      case "warning":
        return <Clock className="w-4 h-4" />
      case "overdue":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "filter":
        return <Filter className="w-5 h-5" />
      case "tank":
        return <div className="w-5 h-5 border-2 border-current rounded" />
      case "pipes":
        return <div className="w-5 h-5 border-2 border-current rounded-full" />
      case "pump":
        return <Wrench className="w-5 h-5" />
      default:
        return <Bell className="w-5 h-5" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      {/* Push Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in-from-right">
          <Card className="bg-destructive/10 border-destructive/50 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="animate-pulse">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <p className="font-semibold text-destructive">Maintenance Alert!</p>
                  <p className="text-sm text-muted-foreground">Filter cleaning overdue</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

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
            <div className="p-2 bg-accent/20 rounded-full">
              <Bell className="w-5 h-5 text-accent" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Maintenance & Alerts</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-destructive/5 border-destructive/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <div>
                  <p className="text-sm font-medium text-destructive">Overdue</p>
                  <p className="text-2xl font-bold text-foreground">
                    {items.filter((item) => item.status === "overdue").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-accent/5 border-accent/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-sm font-medium text-accent">Due Soon</p>
                  <p className="text-2xl font-bold text-foreground">
                    {items.filter((item) => item.status === "warning").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-secondary/5 border-secondary/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-secondary" />
                <div>
                  <p className="text-sm font-medium text-secondary">Up to Date</p>
                  <p className="text-2xl font-bold text-foreground">
                    {items.filter((item) => item.status === "good").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-primary">Total Items</p>
                  <p className="text-2xl font-bold text-foreground">{items.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Maintenance Items */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Maintenance Schedule</h2>
          {items.map((item) => (
            <Card key={item.id} className={`${getStatusColor(item.status)} transition-all duration-300`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full ${getStatusColor(item.status)}`}>
                      {cleaningItem === item.id ? (
                        <div className="w-5 h-5 animate-spin border-2 border-current border-t-transparent rounded-full" />
                      ) : (
                        getTypeIcon(item.type)
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Last cleaned: {item.lastCleaned.toLocaleDateString()}
                      </p>
                      <p className="text-sm text-muted-foreground">Next due: {item.nextDue.toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <Badge variant="outline" className={getStatusColor(item.status)}>
                        {getStatusIcon(item.status)}
                        <span className="ml-1 capitalize">{item.status}</span>
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.daysUntilDue > 0
                          ? `${item.daysUntilDue} days remaining`
                          : `${Math.abs(item.daysUntilDue)} days overdue`}
                      </p>
                    </div>

                    {item.status !== "good" && (
                      <Button
                        onClick={() => handleMarkCleaned(item.id)}
                        disabled={cleaningItem === item.id}
                        className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                      >
                        {cleaningItem === item.id ? (
                          <>
                            <div className="w-4 h-4 animate-spin border-2 border-current border-t-transparent rounded-full mr-2" />
                            Cleaning...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Mark Cleaned
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>

                {/* Progress Bar for Filter Items */}
                {item.type === "filter" && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span>Filter Condition</span>
                      <span>
                        {item.status === "good" ? "Clean" : item.status === "warning" ? "Needs Attention" : "Clogged"}
                      </span>
                    </div>
                    <Progress
                      value={
                        cleaningItem === item.id
                          ? 100
                          : item.status === "good"
                            ? 90
                            : item.status === "warning"
                              ? 40
                              : 10
                      }
                      className={`h-2 ${
                        cleaningItem === item.id
                          ? "animate-pulse"
                          : item.status === "overdue"
                            ? "[&>div]:bg-destructive"
                            : item.status === "warning"
                              ? "[&>div]:bg-accent"
                              : "[&>div]:bg-secondary"
                      }`}
                    />
                  </div>
                )}

                {/* Cleaning Animation */}
                {cleaningItem === item.id && item.type === "filter" && (
                  <div className="mt-4 p-4 bg-secondary/10 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-destructive/60 rounded animate-pulse" />
                      <div className="text-sm text-muted-foreground">→</div>
                      <div className="w-6 h-6 bg-secondary/60 rounded animate-bounce" />
                      <span className="text-sm font-medium text-secondary ml-2">Filter cleaning in progress...</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common maintenance tasks and reminders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2 border-primary text-primary hover:bg-primary/10 bg-transparent"
                onClick={() => (window.location.href = "/logs")}
              >
                <Calendar className="w-6 h-6" />
                <span>View Maintenance Logs</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2 border-secondary text-secondary hover:bg-secondary/10 bg-transparent"
              >
                <Bell className="w-6 h-6" />
                <span>Set Reminder</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2 border-accent text-accent hover:bg-accent/10 bg-transparent"
              >
                <Wrench className="w-6 h-6" />
                <span>Schedule Service</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
