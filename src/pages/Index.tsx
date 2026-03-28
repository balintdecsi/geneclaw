import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Mic } from "lucide-react";
import OpenClawLogo from "@/components/OpenClawLogo";
import TelegramChat from "@/components/TelegramChat";
import VoiceAgent from "@/components/VoiceAgent";

type Mode = "chat" | "voice";

const Index = () => {
  const [mode, setMode] = useState<Mode>("chat");

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <OpenClawLogo size={36} />
          <span className="font-mono text-lg tracking-tight">
            <span className="text-primary text-glow">Gene</span>
            <span className="text-foreground">Claw</span>
          </span>
        </div>
        <div className="flex items-center gap-1 bg-secondary rounded-full p-1">
          <button
            onClick={() => setMode("chat")}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-mono transition-all ${
              mode === "chat"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Chat
          </button>
          <button
            onClick={() => setMode("voice")}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-mono transition-all ${
              mode === "voice"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Mic className="w-4 h-4" />
            Voice
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-6">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-lg"
        >
          {mode === "chat" ? (
            <div className="space-y-4">
              <div className="text-center space-y-1">
                <h1 className="text-2xl font-mono text-foreground">
                  Chat with <span className="text-primary text-glow">OpenClaw</span>
                </h1>
                <p className="text-sm text-muted-foreground">
                  Powered by Telegram • Ask anything
                </p>
              </div>
              <TelegramChat />
            </div>
          ) : (
            <div className="space-y-8">
              <div className="text-center space-y-1">
                <h1 className="text-2xl font-mono text-foreground">
                  Talk to <span className="text-primary text-glow">OpenClaw</span>
                </h1>
                <p className="text-sm text-muted-foreground">
                  Powered by ElevenLabs • Real-time voice
                </p>
              </div>
              <VoiceAgent />
            </div>
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-4 border-t border-border/50">
        <p className="text-xs font-mono text-muted-foreground">
          GeneClaw © {new Date().getFullYear()} • OpenClaw Agent
        </p>
      </footer>
    </div>
  );
};

export default Index;
