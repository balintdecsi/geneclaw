import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const TelegramChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm the OpenClaw agent. Send me a message to get started.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [chatId, setChatId] = useState<string>("");
  const [showChatIdInput, setShowChatIdInput] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isSending) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageText = input;
    setInput("");
    setIsSending(true);

    try {
      const { data, error } = await supabase.functions.invoke("telegram-chat", {
        body: { action: "send", chatId, text: messageText },
      });

      if (error) throw error;

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: "Message sent to OpenClaw agent via Telegram. Awaiting response...",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } catch (err) {
      console.error("Send error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: "Failed to send message. Please check your configuration.",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  if (showChatIdInput) {
    return (
      <div className="flex flex-col h-[480px] rounded-xl border border-border bg-card overflow-hidden items-center justify-center p-8">
        <div className="space-y-4 text-center max-w-sm">
          <MessageSquare className="w-10 h-10 text-primary mx-auto" />
          <h3 className="font-mono text-foreground">Connect to Telegram</h3>
          <p className="text-sm text-muted-foreground">
            Enter your Telegram Chat ID (numeric). Message <span className="text-primary font-mono">@userinfobot</span> on Telegram to find yours.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (chatId.trim() && /^\-?\d+$/.test(chatId.trim())) setShowChatIdInput(false);
            }}
            className="space-y-3"
          >
            <Input
              value={chatId}
              onChange={(e) => setChatId(e.target.value.replace(/[^\d\-]/g, ""))}
              placeholder="e.g. 123456789"
              className="bg-secondary border-border text-foreground placeholder:text-muted-foreground text-center font-mono"
              inputMode="numeric"
            />
            <Button type="submit" disabled={!chatId.trim() || !/^\-?\d+$/.test(chatId.trim())} className="w-full">
              Connect
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[480px] rounded-xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-secondary/50">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-sm font-mono text-foreground">OpenClaw Agent</span>
        <MessageSquare className="w-4 h-4 text-muted-foreground ml-auto" />
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                msg.sender === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-secondary text-secondary-foreground rounded-bl-md"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
        {isSending && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="bg-secondary text-secondary-foreground px-4 py-2.5 rounded-2xl rounded-bl-md text-sm">
              <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity }}>
                sending...
              </motion.span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-border">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
          />
          <Button type="submit" size="icon" disabled={!input.trim() || isSending} className="shrink-0">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TelegramChat;
