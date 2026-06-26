import { ContractAnalysis } from "@/types/analysis";

/** Map legacy risk labels to 0–100 when API omits numeric score. */
export function resolveRiskScore(analysis: ContractAnalysis): number {
  if (typeof analysis.riskScore === "number") {
    return Math.min(100, Math.max(0, Math.round(analysis.riskScore)));
  }
  const map = { low: 22, medium: 55, high: 82 } as const;
  return map[analysis.overallRiskScore];
}

type Props = {
  score: number;
  size?: "sm" | "md";
};

export function RiskScoreGauge({ score, size = "md" }: Props) {
  const clamped = Math.min(100, Math.max(0, score));
  const radius = size === "sm" ? 36 : 52;
  const stroke = size === "sm" ? 6 : 8;
  const cx = radius + stroke;
  const cy = radius + stroke;
  const circumference = Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  const color =
    clamped >= 70 ? "#E84545" : clamped >= 40 ? "#F5A623" : "#2EA87E";

  const dim = (radius + stroke) * 2;

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={dim} height={radius + stroke * 2 + 4} viewBox={`0 0 ${dim} ${radius + stroke * 2 + 4}`}>
        <path
          d={`M ${stroke} ${cy} A ${radius} ${radius} 0 0 1 ${dim - stroke} ${cy}`}
          fill="none"
          stroke="#1A2540"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        <path
          d={`M ${stroke} ${cy} A ${radius} ${radius} 0 0 1 ${dim - stroke} ${cy}`}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          className="fill-white font-bold"
          fontSize={size === "sm" ? 14 : 20}
        >
          {clamped}
        </text>
      </svg>
      <span className="text-xs text-pinnacle-muted">Risk score</span>
    </div>
  );
}
