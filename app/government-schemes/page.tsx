"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  FileText,
  ExternalLink,
  IndianRupee,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface GovernmentScheme {
  id: string
  title: string
  description: string
  subsidy: string
  eligibility: string[]
  benefits: string[]
  applicationDeadline: string
  state: string
  category: "subsidy" | "tax-benefit" | "loan" | "grant"
  amount: string
  applyUrl: string
}

const governmentSchemes: GovernmentScheme[] = [
  {
    id: "1",
    title: "Rainwater Harvesting Subsidy Scheme",
    description:
      "Government subsidy for installing rainwater harvesting systems in residential and commercial buildings",
    subsidy: "Up to 50% of installation cost",
    eligibility: ["Property owners", "Residential buildings", "Commercial establishments"],
    benefits: ["50% subsidy on installation", "Free technical consultation", "Maintenance support for 2 years"],
    applicationDeadline: "March 31, 2024",
    state: "Delhi",
    category: "subsidy",
    amount: "₹25,000 - ₹1,00,000",
    applyUrl: "https://delhi.gov.in/rainwater-harvesting",
  },
  {
    id: "2",
    title: "Water Conservation Tax Benefit",
    description: "Income tax deduction for water conservation infrastructure including rainwater harvesting",
    subsidy: "Tax deduction under Section 80C",
    eligibility: ["Individual taxpayers", "HUF", "Companies implementing water conservation"],
    benefits: ["Tax deduction up to ₹1.5 lakh", "Reduced property tax", "Green building certification"],
    applicationDeadline: "Ongoing",
    state: "All India",
    category: "tax-benefit",
    amount: "Up to ₹1,50,000 deduction",
    applyUrl: "https://incometax.gov.in",
  },
  {
    id: "3",
    title: "Green Building Incentive Program",
    description: "Special incentives for buildings implementing sustainable water management systems",
    subsidy: "Reduced property tax and fast-track approvals",
    eligibility: ["New constructions", "Renovation projects", "Commercial buildings"],
    benefits: ["25% property tax reduction", "Fast-track building approvals", "Green certification"],
    applicationDeadline: "December 31, 2024",
    state: "Maharashtra",
    category: "grant",
    amount: "₹50,000 - ₹2,00,000",
    applyUrl: "https://maharashtra.gov.in/green-building",
  },
  {
    id: "4",
    title: "Rural Water Security Loan Scheme",
    description: "Low-interest loans for rural areas to implement rainwater harvesting and water storage systems",
    subsidy: "3% interest rate subsidy",
    eligibility: ["Rural property owners", "Farmers", "Village panchayats"],
    benefits: ["Low interest rates (5-7%)", "Flexible repayment terms", "Technical assistance"],
    applicationDeadline: "June 30, 2024",
    state: "Karnataka",
    category: "loan",
    amount: "₹1,00,000 - ₹5,00,000",
    applyUrl: "https://karnataka.gov.in/rural-water",
  },
  {
    id: "5",
    title: "Urban Water Management Grant",
    description: "Grants for urban areas to implement community-level rainwater harvesting projects",
    subsidy: "100% funding for community projects",
    eligibility: ["Resident welfare associations", "Housing societies", "Municipal corporations"],
    benefits: ["Complete funding", "Professional installation", "5-year maintenance"],
    applicationDeadline: "September 15, 2024",
    state: "Tamil Nadu",
    category: "grant",
    amount: "₹2,00,000 - ₹10,00,000",
    applyUrl: "https://tn.gov.in/water-management",
  },
]

export default function GovernmentSchemesPage() {
  const [currentSchemeIndex, setCurrentSchemeIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredSchemes =
    selectedCategory === "all"
      ? governmentSchemes
      : governmentSchemes.filter((scheme) => scheme.category === selectedCategory)

  const currentScheme = filteredSchemes[currentSchemeIndex] || governmentSchemes[0]

  const nextScheme = () => {
    setCurrentSchemeIndex((prev) => (prev + 1) % filteredSchemes.length)
  }

  const prevScheme = () => {
    setCurrentSchemeIndex((prev) => (prev - 1 + filteredSchemes.length) % filteredSchemes.length)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "subsidy":
        return "bg-primary/10 text-primary"
      case "tax-benefit":
        return "bg-secondary/10 text-secondary"
      case "loan":
        return "bg-accent/10 text-accent"
      case "grant":
        return "bg-destructive/10 text-destructive"
      default:
        return "bg-muted/10 text-muted-foreground"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "subsidy":
        return <IndianRupee className="w-4 h-4" />
      case "tax-benefit":
        return <FileText className="w-4 h-4" />
      case "loan":
        return <Calendar className="w-4 h-4" />
      case "grant":
        return <MapPin className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
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
            <div className="p-2 bg-secondary/20 rounded-full">
              <FileText className="w-5 h-5 text-secondary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Government Schemes & Subsidies</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Category Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter by Category</CardTitle>
            <CardDescription>Browse schemes by type to find the best fit for your needs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedCategory("all")
                  setCurrentSchemeIndex(0)
                }}
                className={selectedCategory === "all" ? "bg-primary" : ""}
              >
                All Schemes ({governmentSchemes.length})
              </Button>
              <Button
                variant={selectedCategory === "subsidy" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedCategory("subsidy")
                  setCurrentSchemeIndex(0)
                }}
                className={selectedCategory === "subsidy" ? "bg-primary" : ""}
              >
                <IndianRupee className="w-3 h-3 mr-1" />
                Subsidies ({governmentSchemes.filter((s) => s.category === "subsidy").length})
              </Button>
              <Button
                variant={selectedCategory === "tax-benefit" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedCategory("tax-benefit")
                  setCurrentSchemeIndex(0)
                }}
                className={selectedCategory === "tax-benefit" ? "bg-secondary" : ""}
              >
                <FileText className="w-3 h-3 mr-1" />
                Tax Benefits ({governmentSchemes.filter((s) => s.category === "tax-benefit").length})
              </Button>
              <Button
                variant={selectedCategory === "loan" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedCategory("loan")
                  setCurrentSchemeIndex(0)
                }}
                className={selectedCategory === "loan" ? "bg-accent" : ""}
              >
                <Calendar className="w-3 h-3 mr-1" />
                Loans ({governmentSchemes.filter((s) => s.category === "loan").length})
              </Button>
              <Button
                variant={selectedCategory === "grant" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedCategory("grant")
                  setCurrentSchemeIndex(0)
                }}
              >
                <MapPin className="w-3 h-3 mr-1" />
                Grants ({governmentSchemes.filter((s) => s.category === "grant").length})
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Scheme Carousel */}
        <Card className="overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Featured Schemes</CardTitle>
                <CardDescription>
                  Showing {currentSchemeIndex + 1} of {filteredSchemes.length} schemes
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={prevScheme} disabled={filteredSchemes.length <= 1}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={nextScheme} disabled={filteredSchemes.length <= 1}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Current Scheme */}
              <div className="border rounded-lg p-6 bg-gradient-to-r from-card via-card to-primary/5">
                <div className="flex items-start justify-between mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xl font-bold text-foreground">{currentScheme.title}</h3>
                      <Badge variant="outline" className={getCategoryColor(currentScheme.category)}>
                        {getCategoryIcon(currentScheme.category)}
                        <span className="ml-1 capitalize">{currentScheme.category.replace("-", " ")}</span>
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{currentScheme.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Amount</p>
                    <p className="text-lg font-bold text-primary">{currentScheme.amount}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Eligibility Criteria</h4>
                      <ul className="space-y-1">
                        {currentScheme.eligibility.map((criteria, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-center">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                            {criteria}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Key Benefits</h4>
                      <ul className="space-y-1">
                        {currentScheme.benefits.map((benefit, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-center">
                            <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-2" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-accent/10 rounded-lg">
                        <p className="text-xs text-accent font-medium">Application Deadline</p>
                        <p className="text-sm font-semibold text-foreground">{currentScheme.applicationDeadline}</p>
                      </div>
                      <div className="p-3 bg-secondary/10 rounded-lg">
                        <p className="text-xs text-secondary font-medium">Applicable State</p>
                        <p className="text-sm font-semibold text-foreground">{currentScheme.state}</p>
                      </div>
                    </div>

                    <div className="p-4 bg-primary/10 rounded-lg">
                      <p className="text-sm font-medium text-primary mb-2">Subsidy Details</p>
                      <p className="text-lg font-bold text-foreground">{currentScheme.subsidy}</p>
                    </div>

                    <Button
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={() => window.open(currentScheme.applyUrl, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Apply Now
                    </Button>
                  </div>
                </div>
              </div>

              {/* Scheme Indicators */}
              <div className="flex justify-center space-x-2">
                {filteredSchemes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSchemeIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentSchemeIndex ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => (window.location.href = "/roi-calculator")}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <IndianRupee className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">ROI Calculator</h3>
              <p className="text-sm text-muted-foreground">Calculate your return on investment</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Document Checklist</h3>
              <p className="text-sm text-muted-foreground">Required documents for applications</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Application Status</h3>
              <p className="text-sm text-muted-foreground">Track your application progress</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
