"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Bot, Send, Lightbulb, Cloud, Droplets, Filter, Calendar, User } from "lucide-react"
import AquaBotWidget from "@/components/aquabot-widget"

interface ChatMessage {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  category?: "tank-sizing" | "maintenance" | "seasonal" | "general"
}

interface AIRecommendation {
  id: string
  title: string
  description: string
  category: "tank-sizing" | "maintenance" | "seasonal" | "optimization"
  priority: "high" | "medium" | "low"
  icon: React.ComponentType<{ className?: string }>
  action?: string
}

const aiRecommendations: AIRecommendation[] = [
  {
    id: "1",
    title: "Optimal Tank Size Recommendation",
    description: "Based on your 1,200 sq ft rooftop and local rainfall data, we recommend a 5,000L tank capacity.",
    category: "tank-sizing",
    priority: "high",
    icon: Droplets,
    action: "View Calculation",
  },
  {
    id: "2",
    title: "Pre-Monsoon Filter Cleaning",
    description: "Monsoon season starts in 2 weeks. Clean your filters now to maximize water collection efficiency.",
    category: "seasonal",
    priority: "high",
    icon: Filter,
    action: "Schedule Cleaning",
  },
  {
    id: "3",
    title: "Tank Overflow Prevention",
    description: "Your tank is at 85% capacity. Consider using stored water for gardening before the next rainfall.",
    category: "optimization",
    priority: "medium",
    icon: Cloud,
    action: "View Usage Tips",
  },
  {
    id: "4",
    title: "Quarterly Maintenance Due",
    description: "It's been 3 months since your last system check. Schedule a maintenance inspection.",
    category: "maintenance",
    priority: "medium",
    icon: Calendar,
    action: "Book Service",
  },
]

const sampleAIResponses = [
  {
    question: "What tank size do I need?",
    response:
      "Based on your rooftop area of 1,200 sq ft and average annual rainfall of 800mm in your region, I recommend a 5,000L tank. This will capture approximately 80% of available rainwater while accounting for first-flush diverters and evaporation losses.",
    category: "tank-sizing" as const,
  },
  {
    question: "When should I clean my filters?",
    response:
      "Clean your filters before monsoon season (typically May-June), after heavy dust storms, and every 2-3 months during regular use. Pre-monsoon cleaning is crucial as it can improve water collection efficiency by up to 40%.",
    category: "maintenance" as const,
  },
  {
    question: "How can I save more water?",
    response:
      "Here are AI-optimized water saving tips: 1) Install a first-flush diverter to improve quality, 2) Use stored rainwater for gardening and cleaning, 3) Monitor tank levels to prevent overflow, 4) Consider connecting multiple downspouts to maximize collection.",
    category: "optimization" as const,
  },
  {
    question: "What maintenance is needed?",
    response:
      "Regular maintenance includes: Monthly tank level checks, quarterly filter cleaning, bi-annual pipe inspection, and annual professional system audit. I can send you personalized reminders based on your usage patterns.",
    category: "maintenance" as const,
  },
]

export default function AITipsPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hello! I'm AquaBot, your AI assistant for rainwater harvesting. I can help you optimize your system, suggest maintenance schedules, and provide personalized recommendations. What would you like to know?",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const matchingResponse = sampleAIResponses.find(
        (response) => inputMessage.toLowerCase().includes(response.question.toLowerCase().split(" ")[2]), // Simple matching
      )

      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content:
          matchingResponse?.response ||
          "That's a great question! Based on your system data and local conditions, I recommend consulting our detailed guides or scheduling a professional assessment. Is there a specific aspect of rainwater harvesting you'd like me to focus on?",
        timestamp: new Date(),
        category: matchingResponse?.category || "general",
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question)
    setTimeout(() => handleSendMessage(), 100)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "tank-sizing":
        return "bg-primary/10 text-primary"
      case "maintenance":
        return "bg-secondary/10 text-secondary"
      case "seasonal":
        return "bg-accent/10 text-accent"
      case "optimization":
        return "bg-destructive/10 text-destructive"
      default:
        return "bg-muted/10 text-muted-foreground"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive text-destructive-foreground"
      case "medium":
        return "bg-accent text-accent-foreground"
      case "low":
        return "bg-secondary text-secondary-foreground"
      default:
        return "bg-muted text-muted-foreground"
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
            <div className="p-2 bg-primary/20 rounded-full">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">AquaBot - Smart AI Recommendations</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* AI Recommendations Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aiRecommendations.map((recommendation) => {
            const IconComponent = recommendation.icon
            return (
              <Card key={recommendation.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${getCategoryColor(recommendation.category)}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">{recommendation.title}</h3>
                        <Badge variant="outline" className={getPriorityColor(recommendation.priority)}>
                          {recommendation.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{recommendation.description}</p>
                      {recommendation.action && (
                        <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                          {recommendation.action}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* AI Chatbot Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="w-5 h-5 text-primary" />
                  <span>AquaBot Chat</span>
                </CardTitle>
                <CardDescription>Ask me anything about rainwater harvesting optimization</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.type === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          {message.type === "ai" && <Bot className="w-4 h-4 mt-0.5 text-primary" />}
                          {message.type === "user" && <User className="w-4 h-4 mt-0.5" />}
                          <div className="flex-1">
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-muted text-muted-foreground p-3 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Bot className="w-4 h-4 text-primary" />
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                            <div
                              className="w-2 h-2 bg-primary rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            />
                            <div
                              className="w-2 h-2 bg-primary rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Ask about tank sizing, maintenance, or optimization..."
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isTyping}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Tips */}
          <div className="space-y-6">
            {/* Quick Questions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Questions</CardTitle>
                <CardDescription>Click to ask common questions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {sampleAIResponses.map((sample, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left h-auto p-3 bg-transparent"
                    onClick={() => handleQuickQuestion(sample.question)}
                  >
                    <Lightbulb className="w-4 h-4 mr-2 text-accent" />
                    <span className="text-sm">{sample.question}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Seasonal Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-secondary" />
                  <span>Seasonal Tips</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <h4 className="font-semibold text-foreground text-sm">Pre-Monsoon (May-June)</h4>
                  <p className="text-xs text-foreground mt-1">
                    Clean filters, check pipes, and ensure proper drainage to maximize collection efficiency.
                  </p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <h4 className="font-semibold text-foreground text-sm">Monsoon (July-September)</h4>
                  <p className="text-xs text-foreground mt-1">
                    Monitor tank levels daily, use first-flush diverters, and check for overflow issues.
                  </p>
                </div>
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <h4 className="font-semibold text-foreground text-sm">Post-Monsoon (October-December)</h4>
                  <p className="text-xs text-foreground mt-1">
                    Optimize water usage, plan maintenance, and prepare for the dry season ahead.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Bot className="w-5 h-5 text-primary" />
                  <span>AquaBot Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">92%</div>
                  <div className="text-sm text-muted-foreground">System Efficiency</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">₹12,450</div>
                  <div className="text-sm text-muted-foreground">Annual Savings</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">15,000L</div>
                  <div className="text-sm text-muted-foreground">Water Saved This Year</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <AquaBotWidget />
    </div>
  )
}
