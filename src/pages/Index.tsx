import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Mic, User, Dna } from "lucide-react";
import geneClawLogo from "@/assets/geneclaw-logo.png";
import geneClawTitle from "@/assets/geneclaw-title.png";
import TelegramChat from "@/components/TelegramChat";
import VoiceAgent from "@/components/VoiceAgent";
import RecentReports from "@/components/RecentReports";
import SymptomsMenu from "@/components/SymptomsMenu";

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
      <header className="relative z-10 flex items-center justify-between px-6 py-3 border-b border-border/50">
        <div className="flex items-center gap-3">
          <img src={geneClawLogo} alt="GeneClaw" className="h-10 w-10 object-contain" />
          <img src={geneClawTitle} alt="GeneClaw" className="h-8 object-contain" />
        </div>

        {/* User persona */}
        <div className="flex items-center gap-4">
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
          <div className="flex items-center gap-2 pl-3 border-l border-border/50">
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-mono text-foreground leading-none">Sara</p>
              <p className="text-[10px] text-muted-foreground font-mono">Patient Demo</p>
            </div>
          </div>
        </div>
      </header>

      {/* Welcome banner */}
      <div className="relative z-10 px-6 pt-5 pb-2">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <Dna className="w-5 h-5 text-primary" />
          <div>
            <h1 className="text-lg font-mono text-foreground">
              Welcome back, <span className="text-primary text-glow">Sara</span>
            </h1>
            <p className="text-xs text-muted-foreground font-mono">
              Your genetic health dashboard • Last updated Mar 22, 2026
            </p>
          </div>
        </motion.div>
      </div>

      {/* Main content */}
      <main className="relative z-10 flex-1 px-6 py-4 overflow-y-auto">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Left column — Reports & Symptoms */}
          <div className="lg:col-span-3 space-y-4">
            <RecentReports />
            <SymptomsMenu />
          </div>

          {/* Right column — Chat / Voice */}
          <div className="lg:col-span-2">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              {mode === "chat" ? (
                <div className="space-y-3">
                  <div className="text-center space-y-1">
                    <h2 className="text-base font-mono text-foreground">
                      Ask <span className="text-primary text-glow">GeneClaw</span>
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Powered by Telegram • Genetic AI Assistant
                    </p>
                  </div>
                  <TelegramChat />
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center space-y-1">
                    <h2 className="text-base font-mono text-foreground">
                      Talk to <span className="text-primary text-glow">GeneClaw</span>
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Powered by ElevenLabs • Real-time voice
                    </p>
                  </div>
                  <VoiceAgent />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-3 border-t border-border/50">
        <p className="text-xs font-mono text-muted-foreground">
          GeneClaw © {new Date().getFullYear()} • Genetic Health AI Agent • Hackathon Demo
        </p>
      </footer>
    </div>
  );
};

export default Index;
