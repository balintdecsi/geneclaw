import { motion } from "framer-motion";
import { Activity, Heart, Brain, Pill, Sun, Dna, ChevronRight } from "lucide-react";
import { type LucideIcon } from "lucide-react";

type Symptom = {
  id: string;
  label: string;
  icon: LucideIcon;
  description: string;
  geneticLink: string;
  severity: "low" | "moderate" | "high";
};

const symptoms: Symptom[] = [
  {
    id: "1",
    label: "Fatigue & Low Energy",
    icon: Activity,
    description: "Persistent tiredness despite adequate sleep",
    geneticLink: "MTHFR C677T — impaired folate metabolism",
    severity: "moderate",
  },
  {
    id: "2",
    label: "Mood Fluctuations",
    icon: Brain,
    description: "Mild anxiety & mood variability",
    geneticLink: "CYP2D6 — SSRI metabolism affected",
    severity: "moderate",
  },
  {
    id: "3",
    label: "Heart Palpitations",
    icon: Heart,
    description: "Occasional rapid heartbeat at rest",
    geneticLink: "No genetic risk factor identified",
    severity: "low",
  },
  {
    id: "4",
    label: "Sun Sensitivity",
    icon: Sun,
    description: "Easy sunburn, skin irritation",
    geneticLink: "MC1R variant — fair skin phenotype",
    severity: "low",
  },
  {
    id: "5",
    label: "Medication Response",
    icon: Pill,
    description: "Unusual side effects from common meds",
    geneticLink: "CYP2D6 poor metabolizer status",
    severity: "high",
  },
  {
    id: "6",
    label: "Family History Concerns",
    icon: Dna,
    description: "Breast cancer in maternal lineage",
    geneticLink: "BRCA1/2 negative — reassuring result",
    severity: "low",
  },
];

const severityColors = {
  low: "border-primary/30 hover:border-primary/60",
  moderate: "border-yellow-500/30 hover:border-yellow-500/60",
  high: "border-destructive/30 hover:border-destructive/60",
};

const severityDot = {
  low: "bg-primary",
  moderate: "bg-yellow-400",
  high: "bg-destructive",
};

const SymptomsMenu = () => {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/50">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          <span className="text-sm font-mono text-foreground">Symptom Tracker</span>
        </div>
        <span className="text-xs text-muted-foreground font-mono">Sara's profile</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3">
        {symptoms.map((symptom, i) => {
          const Icon = symptom.icon;
          return (
            <motion.button
              key={symptom.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`flex items-start gap-3 p-3 rounded-lg border bg-secondary/20 transition-all text-left group ${severityColors[symptom.severity]}`}
            >
              <div className="p-1.5 rounded-md bg-secondary flex-shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-mono text-foreground">{symptom.label}</span>
                  <div className={`w-1.5 h-1.5 rounded-full ${severityDot[symptom.severity]}`} />
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-tight">{symptom.description}</p>
                <p className="text-[10px] text-primary/70 mt-1 font-mono truncate">{symptom.geneticLink}</p>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground mt-1 flex-shrink-0" />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default SymptomsMenu;
