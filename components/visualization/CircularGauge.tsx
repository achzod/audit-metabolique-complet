'use client';

import { motion } from 'framer-motion';

interface Props {
  score: number; // 0-100
  size?: number; // diameter in pixels
  strokeWidth?: number;
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
}

export default function CircularGauge({
  score,
  size = 300,
  strokeWidth = 20,
  showLabel = true,
  label,
  animated = true,
}: Props) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const center = size / 2;

  // Color based on score
  const getScoreColor = (s: number) => {
    if (s >= 86) return '#00F5D4'; // Cyan - Optimal
    if (s >= 61) return '#10B981'; // Green - Good
    if (s >= 41) return '#F59E0B'; // Orange - Average
    return '#EF4444'; // Red - Poor
  };

  const getScoreCategory = (s: number) => {
    if (s >= 86) return 'OPTIMAL';
    if (s >= 61) return 'BON';
    if (s >= 41) return 'MOYEN';
    return 'RALENTI';
  };

  const scoreColor = getScoreColor(score);
  const scoreCategory = getScoreCategory(score);

  return (
    <div className="flex flex-col items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress Circle */}
        {animated ? (
          <motion.circle
            cx={center}
            cy={center}
            r={radius}
            stroke={scoreColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ duration: 2, ease: 'easeOut', delay: 0.5 }}
            style={{
              filter: `drop-shadow(0 0 8px ${scoreColor})`,
            }}
          />
        ) : (
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke={scoreColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            style={{
              filter: `drop-shadow(0 0 8px ${scoreColor})`,
            }}
          />
        )}

        {/* Center Text */}
        <text
          x={center}
          y={center}
          textAnchor="middle"
          dominantBaseline="central"
          className="transform rotate-90"
          style={{ transformOrigin: `${center}px ${center}px` }}
        >
          {/* Score Number */}
          <tspan
            x={center}
            y={center - 20}
            fontSize={size / 5}
            fontWeight="700"
            fill={scoreColor}
          >
            {animated ? (
              <motion.tspan
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                {score}
              </motion.tspan>
            ) : (
              score
            )}
          </tspan>

          {/* /100 */}
          <tspan
            x={center}
            y={center + 10}
            fontSize={size / 12}
            fill="rgba(255,255,255,0.6)"
          >
            /100
          </tspan>
        </text>
      </svg>

      {/* Label Below */}
      {showLabel && (
        <div className="mt-4 text-center">
          <p
            className="text-xl font-semibold mb-1"
            style={{ color: scoreColor }}
          >
            {label || scoreCategory}
          </p>
          <p className="text-sm text-gray-400">
            Potentiel +{100 - score} points
          </p>
        </div>
      )}
    </div>
  );
}
