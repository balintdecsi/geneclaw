import { motion } from "framer-motion";
import { MessageSquare, ExternalLink, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const TELEGRAM_BOT_URL = "https://t.me/geneclaw_vienna_bot";

const TelegramChat = () => {
  return (
    <div className="flex flex-col h-[480px] rounded-xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-secondary/50">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-sm font-mono text-foreground">OpenClaw Agent</span>
        <MessageSquare className="w-4 h-4 text-muted-foreground ml-auto" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-6">
        {/* Animated bot icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="w-20 h-20 rounded-full bg-secondary border-2 border-primary/30 flex items-center justify-center glow-green-sm">
            <Send className="w-8 h-8 text-primary" />
          </div>
          <motion.div
            className="absolute -inset-2 rounded-full border border-primary/20"
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        </motion.div>

        <div className="text-center space-y-2 max-w-xs">
          <h3 className="font-mono text-lg text-foreground">
            Chat on Telegram
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Message the <span className="text-primary font-mono">GeneClaw Vienna</span> bot
            directly on Telegram for real-time AI conversations.
          </p>
        </div>

        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button
            asChild
            size="lg"
            className="gap-2 font-mono glow-green"
          >
            <a href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
              Open in Telegram
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </motion.div>

        <p className="text-xs text-muted-foreground/60 font-mono">
          @geneclaw_vienna_bot
        </p>
      </div>
    </div>
  );
};

export default TelegramChat;
