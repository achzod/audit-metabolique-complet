'use client';

import { motion } from 'framer-motion';

interface DataPoint {
  label: string;
  value: number; // 0-100
  color?: string;
}

interface Props {
  data: DataPoint[];
  size?: number;
  showLabels?: boolean;
  animated?: boolean;
}

export default function RadarChart({
  data,
  size = 400,
  showLabels = true,
  animated = true,
}: Props) {
  const center = size / 2;
  const maxRadius = size / 2 - 60; // Leave space for labels
  const numPoints = data.length;
  const angleStep = (2 * Math.PI) / numPoints;

  // Calculate point positions
  const getPointPosition = (index: number, value: number) => {
    const angle = angleStep * index - Math.PI / 2; // Start from top
    const radius = (value / 100) * maxRadius;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    return { x, y };
  };

  // Create path for the data polygon
  const createPath = () => {
    const points = data.map((point, index) =>
      getPointPosition(index, point.value)
    );
    const pathData = points
      .map((point, index) => {
        const command = index === 0 ? 'M' : 'L';
        return `${command} ${point.x} ${point.y}`;
      })
      .join(' ');
    return `${pathData} Z`; // Close the path
  };

  // Create grid circles
  const gridLevels = [20, 40, 60, 80, 100];

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size}>
        {/* Grid Circles */}
        {gridLevels.map((level) => (
          <circle
            key={level}
            cx={center}
            cy={center}
            r={(level / 100) * maxRadius}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
            fill="none"
          />
        ))}

        {/* Axes Lines */}
        {data.map((_, index) => {
          const endPoint = getPointPosition(index, 100);
          return (
            <line
              key={index}
              x1={center}
              y1={center}
              x2={endPoint.x}
              y2={endPoint.y}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
          );
        })}

        {/* Data Polygon */}
        {animated ? (
          <motion.path
            d={createPath()}
            fill="rgba(0,245,212,0.2)"
            stroke="#00F5D4"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: 'easeOut', delay: 0.5 }}
            style={{
              filter: 'drop-shadow(0 0 8px rgba(0,245,212,0.5))',
            }}
          />
        ) : (
          <path
            d={createPath()}
            fill="rgba(0,245,212,0.2)"
            stroke="#00F5D4"
            strokeWidth="2"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(0,245,212,0.5))',
            }}
          />
        )}

        {/* Data Points */}
        {data.map((point, index) => {
          const position = getPointPosition(index, point.value);
          return (
            <g key={index}>
              <circle
                cx={position.x}
                cy={position.y}
                r="5"
                fill={point.color || '#00F5D4'}
                stroke="white"
                strokeWidth="2"
              />
              {animated && (
                <motion.circle
                  cx={position.x}
                  cy={position.y}
                  r="5"
                  fill={point.color || '#00F5D4'}
                  stroke="white"
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                />
              )}
            </g>
          );
        })}

        {/* Labels */}
        {showLabels &&
          data.map((point, index) => {
            const labelPosition = getPointPosition(index, 110); // Position outside
            const angle = angleStep * index - Math.PI / 2;

            // Adjust text anchor based on position
            let textAnchor: 'start' | 'middle' | 'end' = 'middle';
            if (Math.abs(Math.cos(angle)) > 0.5) {
              textAnchor = Math.cos(angle) > 0 ? 'start' : 'end';
            }

            return (
              <text
                key={index}
                x={labelPosition.x}
                y={labelPosition.y}
                textAnchor={textAnchor}
                dominantBaseline="central"
                fontSize="12"
                fill="rgba(255,255,255,0.8)"
                fontWeight="500"
              >
                {point.label}
              </text>
            );
          })}
      </svg>

      {/* Legend */}
      <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
        {data.map((point, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: point.color || '#00F5D4' }}
            />
            <span className="text-gray-300">{point.label}</span>
            <span className="ml-auto font-semibold text-white">
              {point.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
