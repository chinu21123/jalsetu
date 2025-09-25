"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Calculator, TrendingUp, Droplets, IndianRupee, PieChart } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Cell,
} from "recharts"

interface ROIData {
  year: number
  cumulativeSavings: number
  investment: number
  netReturn: number
}

export default function ROICalculatorPage() {
  const [installationCost, setInstallationCost] = useState<string>("50000")
  const [waterSavedPerYear, setWaterSavedPerYear] = useState<string>("10000")
  const [waterCostPerLiter, setWaterCostPerLiter] = useState<string>("0.05")
  const [maintenanceCostPerYear, setMaintenanceCostPerYear] = useState<string>("2000")
  const [roiData, setROIData] = useState<ROIData[]>([])
  const [paybackPeriod, setPaybackPeriod] = useState<number>(0)
  const [totalSavings10Years, setTotalSavings10Years] = useState<number>(0)
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    calculateROI()
  }, [installationCost, waterSavedPerYear, waterCostPerLiter, maintenanceCostPerYear])

  const calculateROI = () => {
    const installation = Number.parseFloat(installationCost) || 0
    const waterSaved = Number.parseFloat(waterSavedPerYear) || 0
    const waterCost = Number.parseFloat(waterCostPerLiter) || 0
    const maintenance = Number.parseFloat(maintenanceCostPerYear) || 0

    const annualSavings = waterSaved * waterCost - maintenance
    const data: ROIData[] = []
    let cumulativeSavings = 0
    let payback = 0

    for (let year = 1; year <= 10; year++) {
      cumulativeSavings += annualSavings
      const netReturn = cumulativeSavings - installation

      data.push({
        year,
        cumulativeSavings,
        investment: installation,
        netReturn,
      })

      if (netReturn >= 0 && payback === 0) {
        payback = year + (installation - (cumulativeSavings - annualSavings)) / annualSavings
      }
    }

    setROIData(data)
    setPaybackPeriod(payback)
    setTotalSavings10Years(cumulativeSavings)
  }

  const handleCalculate = () => {
    setShowAnimation(true)
    setTimeout(() => setShowAnimation(false), 2000)
    calculateROI()
  }

  const pieData = [
    { name: "Water Savings", value: totalSavings10Years, color: "#0ea5e9" },
    { name: "Installation Cost", value: Number.parseFloat(installationCost) || 0, color: "#f59e0b" },
    { name: "Maintenance Cost", value: (Number.parseFloat(maintenanceCostPerYear) || 0) * 10, color: "#ef4444" },
  ]

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
            <div className="p-2 bg-accent/20 rounded-full">
              <Calculator className="w-5 h-5 text-accent" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">ROI Calculator</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calculator className="w-5 h-5 text-primary" />
              <span>Investment Calculator</span>
            </CardTitle>
            <CardDescription>Enter your project details to calculate return on investment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="installation-cost">Installation Cost (₹)</Label>
                  <Input
                    id="installation-cost"
                    type="number"
                    value={installationCost}
                    onChange={(e) => setInstallationCost(e.target.value)}
                    placeholder="50000"
                    className="border-primary/20 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="water-saved">Water Saved Per Year (Liters)</Label>
                  <Input
                    id="water-saved"
                    type="number"
                    value={waterSavedPerYear}
                    onChange={(e) => setWaterSavedPerYear(e.target.value)}
                    placeholder="10000"
                    className="border-primary/20 focus:border-primary"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="water-cost">Water Cost Per Liter (₹)</Label>
                  <Input
                    id="water-cost"
                    type="number"
                    step="0.01"
                    value={waterCostPerLiter}
                    onChange={(e) => setWaterCostPerLiter(e.target.value)}
                    placeholder="0.05"
                    className="border-primary/20 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maintenance-cost">Annual Maintenance Cost (₹)</Label>
                  <Input
                    id="maintenance-cost"
                    type="number"
                    value={maintenanceCostPerYear}
                    onChange={(e) => setMaintenanceCostPerYear(e.target.value)}
                    placeholder="2000"
                    className="border-primary/20 focus:border-primary"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Button
                onClick={handleCalculate}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                size="lg"
              >
                <Calculator className="w-4 h-4 mr-2" />
                Calculate ROI
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <IndianRupee className="w-5 h-5 text-primary" />
                  {showAnimation && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-ping" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-primary">Payback Period</p>
                  <p className="text-2xl font-bold text-foreground">
                    {paybackPeriod > 0 ? `${paybackPeriod.toFixed(1)} years` : "N/A"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-secondary/5 border-secondary/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-secondary" />
                <div>
                  <p className="text-sm font-medium text-secondary">10-Year Savings</p>
                  <p className="text-2xl font-bold text-foreground">₹{totalSavings10Years.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-accent/5 border-accent/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Droplets className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-sm font-medium text-accent">Annual Water Savings</p>
                  <p className="text-2xl font-bold text-foreground">
                    {Number.parseInt(waterSavedPerYear).toLocaleString()}L
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-destructive/5 border-destructive/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <IndianRupee className="w-5 h-5 text-destructive" />
                  {showAnimation &&
                    [...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute -top-2 -right-2 w-2 h-2 bg-accent rounded-full animate-bounce"
                        style={{
                          animationDelay: `${i * 0.2}s`,
                          animationDuration: "1s",
                        }}
                      />
                    ))}
                </div>
                <div>
                  <p className="text-sm font-medium text-destructive">Net ROI (10 years)</p>
                  <p className="text-2xl font-bold text-foreground">
                    {(
                      ((totalSavings10Years - Number.parseFloat(installationCost)) /
                        Number.parseFloat(installationCost)) *
                      100
                    ).toFixed(1)}
                    %
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ROI Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-secondary" />
              <span>ROI Analysis Over Time</span>
            </CardTitle>
            <CardDescription>Cumulative savings vs initial investment over 10 years</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={roiData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number, name: string) => [
                      `₹${value.toLocaleString()}`,
                      name === "cumulativeSavings"
                        ? "Cumulative Savings"
                        : name === "investment"
                          ? "Initial Investment"
                          : "Net Return",
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey="cumulativeSavings"
                    stroke="hsl(var(--secondary))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--secondary))", strokeWidth: 2, r: 4 }}
                    name="Cumulative Savings"
                  />
                  <Line
                    type="monotone"
                    dataKey="investment"
                    stroke="hsl(var(--accent))"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    name="Initial Investment"
                  />
                  <Line
                    type="monotone"
                    dataKey="netReturn"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                    name="Net Return"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Cost Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="w-5 h-5 text-accent" />
                <span>Cost Breakdown</span>
              </CardTitle>
              <CardDescription>10-year cost and savings analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`₹${value.toLocaleString()}`, ""]}
                    />
                    <RechartsPieChart data={pieData}>
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </RechartsPieChart>
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {pieData.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                      <span className="text-sm text-muted-foreground">{entry.name}</span>
                    </div>
                    <span className="text-sm font-medium text-foreground">₹{entry.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
              <CardDescription>Important findings from your ROI analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-secondary/10 rounded-lg">
                  <h4 className="font-semibold text-secondary mb-2">Break-even Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    {paybackPeriod > 0
                      ? `You will recover your investment in ${paybackPeriod.toFixed(1)} years.`
                      : "Based on current inputs, the payback period cannot be determined."}
                  </p>
                </div>

                <div className="p-4 bg-primary/10 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Environmental Impact</h4>
                  <p className="text-sm text-muted-foreground">
                    You will save {(Number.parseInt(waterSavedPerYear) * 10).toLocaleString()} liters of water over 10
                    years.
                  </p>
                </div>

                <div className="p-4 bg-accent/10 rounded-lg">
                  <h4 className="font-semibold text-accent mb-2">Financial Benefit</h4>
                  <p className="text-sm text-muted-foreground">
                    Total net savings of ₹{(totalSavings10Years - Number.parseFloat(installationCost)).toLocaleString()}{" "}
                    over 10 years.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
