"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Filter, Wrench, CheckCircle, Clock, User } from "lucide-react"

interface LogEntry {
  id: string
  date: Date
  type: "filter" | "tank" | "pipes" | "pump"
  action: "cleaned" | "repaired" | "replaced" | "inspected"
  item: string
  notes: string
  technician: string
  duration: string
  cost?: number
}

const maintenanceLogs: LogEntry[] = [
  {
    id: "1",
    date: new Date("2024-01-20"),
    type: "filter",
    action: "cleaned",
    item: "Secondary Filter",
    notes: "Removed sediment buildup, filter condition good",
    technician: "John Smith",
    duration: "30 mins",
    cost: 0,
  },
  {
    id: "2",
    date: new Date("2024-01-15"),
    type: "filter",
    action: "replaced",
    item: "Primary Water Filter",
    notes: "Old filter was heavily clogged, replaced with new high-efficiency filter",
    technician: "Sarah Johnson",
    duration: "45 mins",
    cost: 150,
  },
  {
    id: "3",
    date: new Date("2024-01-10"),
    type: "pipes",
    action: "cleaned",
    item: "Inlet Pipes",
    notes: "Cleared debris from inlet pipes, improved water flow",
    technician: "Mike Wilson",
    duration: "1 hour",
    cost: 75,
  },
  {
    id: "4",
    date: new Date("2023-12-01"),
    type: "tank",
    action: "cleaned",
    item: "Main Storage Tank",
    notes: "Deep cleaning of tank interior, sanitized and refilled",
    technician: "David Brown",
    duration: "3 hours",
    cost: 200,
  },
  {
    id: "5",
    date: new Date("2023-11-15"),
    type: "pump",
    action: "repaired",
    item: "Water Pump",
    notes: "Fixed pump motor issue, replaced worn bearings",
    technician: "Lisa Davis",
    duration: "2 hours",
    cost: 300,
  },
]

export default function LogsPage() {
  const [logs] = useState<LogEntry[]>(maintenanceLogs)
  const [filterType, setFilterType] = useState<string>("all")

  const filteredLogs = filterType === "all" ? logs : logs.filter((log) => log.type === filterType)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "filter":
        return <Filter className="w-4 h-4" />
      case "tank":
        return <div className="w-4 h-4 border-2 border-current rounded" />
      case "pipes":
        return <div className="w-4 h-4 border-2 border-current rounded-full" />
      case "pump":
        return <Wrench className="w-4 h-4" />
      default:
        return <CheckCircle className="w-4 h-4" />
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case "cleaned":
        return "bg-secondary/10 text-secondary"
      case "repaired":
        return "bg-accent/10 text-accent"
      case "replaced":
        return "bg-primary/10 text-primary"
      case "inspected":
        return "bg-muted/10 text-muted-foreground"
      default:
        return "bg-muted/10 text-muted-foreground"
    }
  }

  const totalCost = logs.reduce((sum, log) => sum + (log.cost || 0), 0)

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
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Maintenance Logs & History</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-primary">Total Entries</p>
                  <p className="text-2xl font-bold text-foreground">{logs.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-secondary/5 border-secondary/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-secondary" />
                <div>
                  <p className="text-sm font-medium text-secondary">This Month</p>
                  <p className="text-2xl font-bold text-foreground">
                    {logs.filter((log) => log.date.getMonth() === new Date().getMonth()).length}
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
                  <p className="text-sm font-medium text-accent">Avg Duration</p>
                  <p className="text-2xl font-bold text-foreground">1.2h</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-destructive/5 border-destructive/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 text-destructive">₹</div>
                <div>
                  <p className="text-sm font-medium text-destructive">Total Cost</p>
                  <p className="text-2xl font-bold text-foreground">₹{totalCost}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Logs</CardTitle>
            <CardDescription>Filter maintenance history by component type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={filterType === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("all")}
                className={filterType === "all" ? "bg-primary" : ""}
              >
                All ({logs.length})
              </Button>
              <Button
                variant={filterType === "filter" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("filter")}
                className={filterType === "filter" ? "bg-secondary" : ""}
              >
                <Filter className="w-3 h-3 mr-1" />
                Filters ({logs.filter((log) => log.type === "filter").length})
              </Button>
              <Button
                variant={filterType === "tank" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("tank")}
                className={filterType === "tank" ? "bg-accent" : ""}
              >
                Tanks ({logs.filter((log) => log.type === "tank").length})
              </Button>
              <Button
                variant={filterType === "pipes" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("pipes")}
              >
                Pipes ({logs.filter((log) => log.type === "pipes").length})
              </Button>
              <Button
                variant={filterType === "pump" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("pump")}
              >
                <Wrench className="w-3 h-3 mr-1" />
                Pumps ({logs.filter((log) => log.type === "pump").length})
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Maintenance Timeline</h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

            {filteredLogs.map((log, index) => (
              <div key={log.id} className="relative flex items-start space-x-4 pb-8">
                {/* Timeline Dot */}
                <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-card border-2 border-primary rounded-full">
                  {getTypeIcon(log.type)}
                </div>

                {/* Log Card */}
                <Card className="flex-1">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-foreground">{log.item}</h3>
                          <Badge variant="outline" className={getActionColor(log.action)}>
                            {log.action}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{log.notes}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <User className="w-3 h-3" />
                            <span>{log.technician}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{log.duration}</span>
                          </div>
                          {log.cost && log.cost > 0 && (
                            <div className="flex items-center space-x-1">
                              <span>₹{log.cost}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">{log.date.toLocaleDateString()}</p>
                        <p className="text-xs text-muted-foreground">{log.date.toLocaleTimeString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
