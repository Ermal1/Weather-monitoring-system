'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Loader2, Send, Bot, User, AlertCircle, Lightbulb, Sparkles } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AIResponse, ChatMessage } from "@/types"

export function AIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "👋 Hi! I'm your AI assistant. I can analyze weather data, provide weather forecasts, and answer questions about weather conditions in your city. What would you like to know?",
      timestamp: new Date(),
      type: 'question'
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [typingMessage, setTypingMessage] = useState('')
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const quickQuestions = [
    "What's the current weather like?",
    "Will it rain today?",
    "Which cities have the best weather?",
    "What's the temperature forecast?",
    "Give me weather recommendations"
  ]

  const typeMessage = async (fullMessage: string, messageType: string) => {
    const words = fullMessage.split(' ')
    let currentText = ''
    const typingSpeed = 50 

    for (let i = 0; i < words.length; i++) {
      const word = words[i]
      currentText += (i > 0 ? ' ' : '') + word
      setTypingMessage(currentText)

      await new Promise(resolve => setTimeout(resolve, typingSpeed))
    }

    const assistantMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: fullMessage,
      timestamp: new Date(),
      type: messageType as any
    }

    setMessages(prev => [...prev, assistantMessage])
    setTypingMessage('')
    setIsTyping(false)
  }

  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollAreaRef.current) {
        const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
        if (scrollContainer) {
          scrollContainer.scrollTop = scrollContainer.scrollHeight
        }
      }
    }
    
    setTimeout(scrollToBottom, 50)
    setTimeout(scrollToBottom, 150)
    setTimeout(scrollToBottom, 300)
  }, [messages, isTyping, typingMessage])

  const handleSend = async (messageText?: string) => {
    const text = messageText || input.trim()
    if (!text || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setIsTyping(true) 

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          conversationHistory: messages.slice(-5)
        }),
      })

      const data: AIResponse = await response.json()

      if (data.success && data.response) {
        const messageType = text.toLowerCase().includes('recommend') || text.toLowerCase().includes('health') ? 'insight' : 'analysis'

        setTimeout(() => {
          typeMessage(data.response || '', messageType)
        }, 800)
      } else {
        throw new Error(data.error || 'Failed to get AI response')
      }
    } catch (error) {
      setIsTyping(false)
      setTypingMessage('')
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I encountered an error while processing your request. Please try again or check if the AI service is properly configured.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const getMessageIcon = (message: ChatMessage) => {
    if (message.role === 'user') return <User className="w-4 h-4 text-white" />
    
    switch (message.type) {
      case 'insight':
        return <Lightbulb className="w-4 h-4 text-amber-400" />
      case 'analysis':
        return <AlertCircle className="w-4 h-4 text-cyan-400" />
      default:
        return <Bot className="w-4 h-4 text-emerald-400" />
    }
  }

  const getMessageStyle = (message: ChatMessage) => {
    if (message.role === 'user') {
      return "bg-gradient-to-r from-emerald-500 to-teal-500 text-white ml-12 border-emerald-400/30"
    }
    
    switch (message.type) {
      case 'insight':
        return "bg-gradient-to-br from-amber-900/40 to-yellow-900/40 border-amber-500/40 text-amber-100 backdrop-blur-sm"
      case 'analysis':
        return "bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border-cyan-500/40 text-cyan-100 backdrop-blur-sm"
      default:
        return "bg-gradient-to-br from-slate-800/60 to-slate-700/60 border-slate-600/40 text-slate-200 backdrop-blur-sm"
    }
  }

  return (
    <Card className="min-h-[600px] flex flex-col bg-slate-900/80 backdrop-blur-xl border-emerald-500/30 shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-white">
          <Sparkles className="w-5 h-5" />
          AI Weather Assistant
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
            Powered by DeepSeek
          </Badge>
        </CardTitle>
        <CardDescription className="text-emerald-100">
          Real-time weather analysis and personalized weather forecasts
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] rounded-lg p-3 border ${getMessageStyle(message)}`}>
                  <div className="flex items-start gap-2">
                    {getMessageIcon(message)}
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                      <p className="text-xs text-slate-400 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 border bg-gradient-to-br from-slate-800/60 to-slate-700/60 border-slate-600/40 backdrop-blur-sm">
                  <div className="flex items-start gap-2">
                    <Bot className="w-4 h-4 text-emerald-400" />
                    <div className="flex-1">
                      {typingMessage ? (
                        <>
                          <p className="text-sm whitespace-pre-wrap break-words text-slate-200">{typingMessage}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </>
                      ) : (
                        <>
                          <p className="text-sm text-slate-300 italic">Thinking...</p>
                          <div className="flex items-center gap-1 mt-1">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </ScrollArea>

        <div className="p-4 border-t border-emerald-500/20 bg-slate-800/40 backdrop-blur-sm">
          <p className="text-sm text-emerald-200 mb-2 font-medium">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs bg-slate-700/50 text-slate-200 border-emerald-500/30 hover:bg-emerald-500/20 hover:text-emerald-200 hover:border-emerald-400/50"
                onClick={() => handleSend(question)}
                disabled={isLoading}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-emerald-500/20 bg-slate-800/40 backdrop-blur-sm">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about weather, forecasts, or meteorological data..."
              disabled={isLoading}
              className="flex-1 bg-slate-700/50 !text-slate-200 border-emerald-500/30 placeholder:text-slate-400 focus:border-emerald-400/50 focus:ring-emerald-500/20 focus-visible:ring-emerald-500/20 focus-visible:ring-offset-0"
              style={{ color: '#e2e8f0' }}
            />
            <Button 
              onClick={() => handleSend()} 
              disabled={isLoading || !input.trim()}
              size="icon"
              className="bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-400/30 shadow-lg shadow-emerald-500/20"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>

        </div>
      </CardContent>
    </Card>
  )
}