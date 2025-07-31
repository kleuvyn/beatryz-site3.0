"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { MessageCircleIcon } from "lucide-react"

export function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Olá! Como posso te ajudar?", isUser: false },
  ])
  const [input, setInput] = useState("")

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = { text: input, isUser: true }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    try {
      const res = await fetch("http://localhost:3001/dialogflow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      })

      const data = await res.json()
      const botReply = data.reply || "Desculpe, não entendi. 😕"

      setMessages((prev) => [...prev, { text: botReply, isUser: false }])
    } catch (err) {
      setMessages((prev) => [...prev, { text: "Erro ao conectar com o servidor 😓", isUser: false }])
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend()
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-purple-700 hover:bg-purple-800"
          size="icon"
          aria-label="Abrir chat"
        >
          <MessageCircleIcon className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col h-[80vh] sm:h-full">
        <SheetHeader className="p-4 border-b bg-purple-700 text-white">
          <SheetTitle className="flex items-center gap-2 text-white">
            <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
              <MessageCircleIcon className="h-4 w-4" />
            </div>
            Chat Kleuvyn
          </SheetTitle>
        </SheetHeader>

        {/* Chat area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-white text-black">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-md max-w-xs ${
                msg.isUser ? "bg-purple-100 self-end text-right" : "bg-gray-100 self-start"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input area */}
        <div className="p-4 border-t bg-gray-100">
          <input
            type="text"
            placeholder="Digite sua mensagem..."
            className="w-full p-2 rounded border border-gray-300"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
