import { useConversation } from "@elevenlabs/react";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const AGENT_ID = "agent_6801kms2bkjqe6xtznzbhcmaz5z2";

const VoiceAgent = () => {
  const [isConnecting, setIsConnecting] = useState(false);

  const conversation = useConversation({
    onConnect: () => console.log("Connected to voice agent"),
    onDisconnect: () => console.log("Disconnected from voice agent"),
    onError: (error) => console.error("Voice agent error:", error),
  });

  const startConversation = useCallback(async () => {
    setIsConnecting(true);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId: AGENT_ID,
        connectionType: "webrtc",
      });
    } catch (error) {
      console.error("Failed to start conversation:", error);
    } finally {
      setIsConnecting(false);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  const isConnected = conversation.status === "connected";

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Pulsing orb */}
      <div className="relative">
        <AnimatePresence>
          {isConnected && (
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/20"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{
                scale: conversation.isSpeaking ? [1, 1.4, 1] : [1, 1.2, 1],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{ duration: conversation.isSpeaking ? 0.8 : 2, repeat: Infinity }}
              style={{ width: 160, height: 160, left: -20, top: -20 }}
            />
          )}
        </AnimatePresence>

        <motion.button
          onClick={isConnected ? stopConversation : startConversation}
          disabled={isConnecting}
          className="relative w-[120px] h-[120px] rounded-full bg-secondary border-2 border-primary/30 flex items-center justify-center transition-all hover:border-primary/60 disabled:opacity-50 glow-green-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isConnecting ? (
            <motion.div
              className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          ) : isConnected ? (
            conversation.isSpeaking ? (
              <Volume2 className="w-10 h-10 text-primary" />
            ) : (
              <Mic className="w-10 h-10 text-primary" />
            )
          ) : (
            <MicOff className="w-10 h-10 text-muted-foreground" />
          )}
        </motion.button>
      </div>

      <div className="text-center space-y-1">
        <p className="text-sm font-mono text-muted-foreground">
          {isConnecting
            ? "Connecting..."
            : isConnected
            ? conversation.isSpeaking
              ? "Agent is speaking..."
              : "Listening..."
            : "Tap to start voice chat"}
        </p>
        {isConnected && (
          <Button
            variant="ghost"
            size="sm"
            onClick={stopConversation}
            className="text-destructive hover:text-destructive/80 text-xs"
          >
            End conversation
          </Button>
        )}
      </div>
    </div>
  );
};

export default VoiceAgent;
