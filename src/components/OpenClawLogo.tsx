import { motion } from "framer-motion";

const OpenClawLogo = ({ size = 48 }: { size?: number }) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Outer glow */}
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="clawGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(145, 70%, 45%)" />
          <stop offset="100%" stopColor="hsl(145, 80%, 60%)" />
        </linearGradient>
      </defs>
      
      {/* Claw marks */}
      <g filter="url(#glow)">
        {/* Left claw */}
        <path
          d="M25 20 C20 35, 22 55, 30 75 Q32 80, 35 78 C30 60, 28 40, 35 25 Z"
          fill="url(#clawGrad)"
          opacity="0.9"
        />
        {/* Center claw */}
        <path
          d="M45 15 C42 32, 43 55, 50 78 Q52 83, 55 78 C50 58, 48 35, 52 18 Z"
          fill="url(#clawGrad)"
        />
        {/* Right claw */}
        <path
          d="M65 20 C70 35, 68 55, 60 75 Q58 80, 55 78 C60 60, 62 40, 58 25 Z"
          fill="url(#clawGrad)"
          opacity="0.9"
        />
      </g>
      
      {/* DNA helix hint */}
      <circle cx="38" cy="85" r="3" fill="hsl(145, 70%, 45%)" opacity="0.6" />
      <circle cx="50" cy="88" r="2.5" fill="hsl(145, 70%, 45%)" opacity="0.4" />
      <circle cx="62" cy="85" r="3" fill="hsl(145, 70%, 45%)" opacity="0.6" />
    </motion.svg>
  );
};

export default OpenClawLogo;
