"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageSquare, Minus, Square } from "lucide-react";

const RASA_API_BASE_URL = process.env.NEXT_PUBLIC_RASA_API_URL;

const RASA_ENDPOINT = 
  RASA_API_BASE_URL 
    ? `${RASA_API_BASE_URL}/webhooks/rest/webhook` 
    : "http://localhost:5005/webhooks/rest/webhook";


const terminalBg = "bg-gray-50";
const terminalTextPrimary = "text-gray-900";
const terminalTextSecondary = "text-gray-600";
const terminalHighlight = "text-blue-600";
const terminalFont = "font-mono";
const terminalBorder = "border border-gray-300";
const cursorColor = "text-blue-500";
const userTextColor = "text-blue-800";
const headerBg = "bg-gray-200";
const headerButtonColor = "text-gray-600";
const headerBorder = "border-b border-gray-300";

const TypingMessage = ({ fullText, typingSpeed = 30, onFinish }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (!fullText) return;
    setDisplayedText("");
    setIsFinished(false);
    let i = 0;

    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayedText((prev) => prev + fullText.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
        setIsFinished(true);
        if (onFinish) onFinish();
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [fullText, typingSpeed, onFinish]);

  return (
    <span className={terminalTextPrimary}>
      {displayedText}
      {!isFinished && <span className={`animate-blink ${cursorColor}`}>|</span>}
    </span>
  );
};

export function ChatbotButton() {
  const initialMessages = useMemo(
    () => [
      { text: ">>> Acesso Ilegal Detectado. Iniciando Protocolo de Rastreamento...", isUser: false },
      { text: ">>> Bypass de Segurança - [OK].", isUser: false },
      { text: ">>> Carregando Perfil: ROOT@KLEUVYN_MASTER...", isUser: false },
      { text: "Sistema Online. Bem-vindo(a).", isUser: false },
    ],
    []
  );

  const [messages, setMessages] = useState([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isBooting, setIsBooting] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const bootFinished = messages.length === initialMessages.length && !isBooting && isOpen;

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    if (bootFinished && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 50);
    }
  }, [messages, bootFinished]);

  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
      setIsBooting(false);
      return;
    }
    setMessages([]);
    setIsBooting(true);

    if (initialMessages.length > 0) {
      setMessages([initialMessages[0]]);
    }

    return () => setIsBooting(false);
  }, [isOpen, initialMessages]);

  const handleTypingFinish = () => {
    const nextIndex = messages.length;
    if (nextIndex < initialMessages.length) {
      setTimeout(() => {
        setMessages((prev) => [...prev, initialMessages[nextIndex]]);
        if (nextIndex + 1 === initialMessages.length) {
          setIsBooting(false);
        }
      }, 300);
    }
  };

  const handleCommand = async (command) => {
    const userMessage = { text: `> ${command}`, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setCurrentInput("");

    await new Promise((resolve) => setTimeout(resolve, 50));
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;

    try {
      const res = await fetch(RASA_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender: "web_terminal_user", message: command }),
      });
      const rasaResponse = await res.json();

      if (rasaResponse?.length > 0) {
        rasaResponse.forEach((reply) => {
          if (reply.text)
            setMessages((prev) => [...prev, { text: reply.text, isUser: false }]);
        });
      } else {
        setMessages((prev) => [
          ...prev,
          { text: "[SYSTEM] Comando processado, mas sem resposta clara.", isUser: false },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { text: "[ERROR] Falha de comunicação com o servidor.", isUser: false },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && currentInput.trim()) {
      handleCommand(currentInput.trim());
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className={`fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg ${terminalBg} hover:bg-gray-100 ${terminalBorder} ${terminalTextPrimary} z-50`}
          size="icon"
          aria-label="Abrir Terminal"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </DialogTrigger>

      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
        tabIndex={-1}
        className={`
          fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          w-[90vw] max-w-4xl p-0 flex flex-col h-[60vh]
          rounded-lg ${terminalBg} ${terminalFont} ${terminalBorder} shadow-lg
        `}
      >
        <div className={`flex items-center justify-between px-4 py-2 ${headerBg} ${headerBorder} rounded-t-lg`}>
          <div className="flex space-x-2 items-center">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
          </div>

          <span className={`text-sm ${terminalTextSecondary} text-center flex-1`}>
            Terminal chat-kleuvyn
          </span>

          <div className="flex space-x-2 items-center">
            <Minus className={`h-4 w-4 ${headerButtonColor}`} />
            <Square className={`h-4 w-4 ${headerButtonColor}`} />
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 text-sm sm:text-base whitespace-pre-wrap"
          onClick={() => bootFinished && inputRef.current?.focus()}
        >
          {messages.map((msg, idx) => (
            <div key={idx} className={msg.isUser ? userTextColor : terminalTextPrimary}>
              {isBooting && idx === messages.length - 1 ? (
                <TypingMessage fullText={msg.text} onFinish={handleTypingFinish} />
              ) : msg.text.startsWith(">>>") ||
                msg.text.startsWith("[SYSTEM]") ||
                msg.text.startsWith("[ERROR]") ? (
                <span className={terminalTextSecondary}>{msg.text}</span>
              ) : msg.isUser ? (
                <span className={userTextColor}>{msg.text}</span>
              ) : (
                <span className={terminalHighlight}>{msg.text}</span>
              )}
            </div>
          ))}

          {bootFinished && (
            <div className="flex items-center mt-1">
              <span className={`${terminalTextPrimary} mr-1`}>user@system:~$</span>
              <input
                ref={inputRef}
                type="text"
                className={`flex-1 bg-transparent outline-none border-none ${userTextColor} caret-blue-500`}
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder=""
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
