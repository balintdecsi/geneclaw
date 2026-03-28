import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, User, Dna, ChevronDown, ChevronUp } from "lucide-react";
import geneClawLogo from "@/assets/geneclaw-logo.png";
import geneClawTitle from "@/assets/geneclaw-title.png";
import TelegramChat from "@/components/TelegramChat";
import VoiceAgent from "@/components/VoiceAgent";
import RecentReports from "@/components/RecentReports";
import SymptomsMenu from "@/components/SymptomsMenu";

const Index = () => {
  const [showSummary, setShowSummary] = useState(false);

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

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowSummary(!showSummary)}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-mono bg-secondary text-muted-foreground hover:text-foreground transition-all"
          >
            {showSummary ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            Reports & Symptoms
          </button>
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

      {/* Collapsible Reports & Symptoms */}
      {showSummary && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="relative z-10 px-6 pb-4"
        >
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            <RecentReports />
            <SymptomsMenu />
          </div>
        </motion.div>
      )}

      {/* Main content — Voice & Chat side by side */}
      <main className="relative z-10 flex-1 px-6 py-4 overflow-y-auto">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Voice Agent */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-3"
          >
            <div className="text-center space-y-1">
              <h2 className="text-base font-mono text-foreground">
                Talk to <span className="text-primary text-glow">GeneClaw</span>
              </h2>
              <p className="text-xs text-muted-foreground">
                Powered by ElevenLabs • Real-time voice
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 flex items-center justify-center min-h-[420px]">
              <VoiceAgent />
            </div>
          </motion.div>

          {/* Telegram Chat */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.1 }}
            className="space-y-3"
          >
            <div className="text-center space-y-1">
              <h2 className="text-base font-mono text-foreground">
                Ask <span className="text-primary text-glow">GeneClaw</span>
              </h2>
              <p className="text-xs text-muted-foreground">
                Powered by Telegram • Genetic AI Assistant
              </p>
            </div>
            <TelegramChat />
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-3 border-t border-border/50 space-y-1">
        <p className="text-xs font-mono text-muted-foreground">
          Made with ❤️ from Vienna • GeneClaw © {new Date().getFullYear()}
        </p>
        <a
          href="https://github.com/ArslanKamchyworthy/GeneClaw"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          GitHub
        </a>
      </footer>
    </div>
  );
};

export default Index;
