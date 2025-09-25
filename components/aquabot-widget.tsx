"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, X, Bot } from "lucide-react"

function AquaBotWidget() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleChat = () => {
    if (!isOpen) {
      // Redirect to AI tips page instead of opening widget
      window.location.href = "/ai-tips"
    } else {
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={toggleChat}
          className="w-14 h-14 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
          size="lg"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </div>

      {/* Chat Widget (minimal - redirects to full page) */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40">
          <Card className="w-80 shadow-xl border-accent/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">AquaBot</h3>
                  <p className="text-xs text-muted-foreground">Rainwater Harvesting Expert</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Hi! I'm AquaBot, here to help with your rainwater harvesting questions. Click below for the full chat
                experience.
              </p>
              <Button
                onClick={() => (window.location.href = "/ai-tips")}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                size="sm"
              >
                Open Full Chat
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}

export { AquaBotWidget }
export default AquaBotWidget
