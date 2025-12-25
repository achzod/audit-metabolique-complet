'use client';

import { motion } from 'framer-motion';

interface HeatmapCell {
  label: string;
  value: number; // 0-100
  category?: string;
}

interface Props {
  data: HeatmapCell[];
  columns?: number;
  cellSize?: number;
  showValues?: boolean;
  animated?: boolean;
}

export default function Heatmap({
  data,
  columns = 5,
  cellSize = 80,
  showValues = true,
  animated = true,
}: Props) {
  // Get color based on value
  const getColor = (value: number) => {
    if (value >= 86) return '#00F5D4'; // Cyan - Optimal
    if (value >= 61) return '#10B981'; // Green - Good
    if (value >= 41) return '#F59E0B'; // Orange - Average
    return '#EF4444'; // Red - Poor
  };

  // Get background opacity based on value
  const getOpacity = (value: number) => {
    return 0.3 + (value / 100) * 0.7; // Range from 0.3 to 1.0
  };

  // Group data by category if available
  const groupedData = data.reduce((acc, cell) => {
    const category = cell.category || 'Autres';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(cell);
    return acc;
  }, {} as Record<string, HeatmapCell[]>);

  return (
    <div className="space-y-8">
      {Object.entries(groupedData).map(([category, cells]) => (
        <div key={category}>
          {/* Category Header */}
          <h3 className="text-xl font-semibold mb-4 text-cyan-400">
            {category}
          </h3>

          {/* Heatmap Grid */}
          <div
            className="grid gap-3"
            style={{
              gridTemplateColumns: `repeat(${columns}, ${cellSize}px)`,
            }}
          >
            {cells.map((cell, index) => {
              const color = getColor(cell.value);
              const opacity = getOpacity(cell.value);

              return animated ? (
                <motion.div
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                    ease: 'easeOut',
                  }}
                  className="relative rounded-lg overflow-hidden cursor-pointer group"
                  style={{
                    width: cellSize,
                    height: cellSize,
                    backgroundColor: `${color}${Math.round(opacity * 255)
                      .toString(16)
                      .padStart(2, '0')}`,
                  }}
                  whileHover={{ scale: 1.1, zIndex: 10 }}
                >
                  {/* Value */}
                  {showValues && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {cell.value}
                      </span>
                    </div>
                  )}

                  {/* Tooltip on Hover */}
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                    <p className="text-xs text-white text-center leading-tight">
                      {cell.label}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div
                  key={index}
                  className="relative rounded-lg overflow-hidden cursor-pointer group"
                  style={{
                    width: cellSize,
                    height: cellSize,
                    backgroundColor: `${color}${Math.round(opacity * 255)
                      .toString(16)
                      .padStart(2, '0')}`,
                  }}
                >
                  {/* Value */}
                  {showValues && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {cell.value}
                      </span>
                    </div>
                  )}

                  {/* Tooltip on Hover */}
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                    <p className="text-xs text-white text-center leading-tight">
                      {cell.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Legend */}
      <div className="flex items-center justify-center gap-8 mt-8 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#EF4444' }} />
          <span>0-40 (Ralenti)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#F59E0B' }} />
          <span>41-60 (Moyen)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#10B981' }} />
          <span>61-85 (Bon)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#00F5D4' }} />
          <span>86-100 (Optimal)</span>
        </div>
      </div>
    </div>
  );
}
