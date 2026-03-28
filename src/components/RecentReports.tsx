import { motion } from "framer-motion";
import { FileText, ChevronRight, TrendingUp, TrendingDown, Minus } from "lucide-react";

type Report = {
  id: string;
  title: string;
  date: string;
  status: "normal" | "attention" | "critical";
  summary: string;
  trend: "up" | "down" | "stable";
};

const reports: Report[] = [
  {
    id: "1",
    title: "BRCA1/BRCA2 Panel",
    date: "Mar 22, 2026",
    status: "normal",
    summary: "No pathogenic variants detected. Low hereditary risk.",
    trend: "stable",
  },
  {
    id: "2",
    title: "Pharmacogenomics Report",
    date: "Mar 18, 2026",
    status: "attention",
    summary: "CYP2D6 poor metabolizer — adjust SSRI dosing.",
    trend: "up",
  },
  {
    id: "3",
    title: "Cardiovascular Risk Panel",
    date: "Mar 10, 2026",
    status: "normal",
    summary: "APOE ε3/ε3 genotype. Standard cardiovascular risk.",
    trend: "stable",
  },
  {
    id: "4",
    title: "Nutrigenomics Analysis",
    date: "Feb 28, 2026",
    status: "attention",
    summary: "MTHFR C677T variant — folate supplementation advised.",
    trend: "down",
  },
];

const statusColors = {
  normal: "bg-primary/20 text-primary",
  attention: "bg-yellow-500/20 text-yellow-400",
  critical: "bg-destructive/20 text-destructive",
};

const TrendIcon = ({ trend }: { trend: Report["trend"] }) => {
  if (trend === "up") return <TrendingUp className="w-3.5 h-3.5 text-yellow-400" />;
  if (trend === "down") return <TrendingDown className="w-3.5 h-3.5 text-primary" />;
  return <Minus className="w-3.5 h-3.5 text-muted-foreground" />;
};

const RecentReports = () => {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/50">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          <span className="text-sm font-mono text-foreground">Recent Reports</span>
        </div>
        <span className="text-xs text-muted-foreground font-mono">4 reports</span>
      </div>
      <div className="divide-y divide-border">
        {reports.map((report, i) => (
          <motion.button
            key={report.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary/30 transition-colors text-left group"
          >
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
              report.status === "normal" ? "bg-primary" : report.status === "attention" ? "bg-yellow-400" : "bg-destructive"
            }`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono text-foreground truncate">{report.title}</span>
                <TrendIcon trend={report.trend} />
              </div>
              <p className="text-xs text-muted-foreground truncate mt-0.5">{report.summary}</p>
            </div>
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <span className="text-[10px] text-muted-foreground font-mono">{report.date}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${statusColors[report.status]}`}>
                {report.status}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default RecentReports;
