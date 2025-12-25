'use client';

interface Option {
  value: string;
  label: string;
  critical?: boolean;
  good?: boolean;
  tooltip?: string;
}

interface Props {
  name: string;
  value?: string;
  onChange: (value: string) => void;
  options: Option[];
}

export default function RadioGroup({ name, value, onChange, options }: Props) {
  return (
    <div className="space-y-3">
      {options.map((option) => (
        <label
          key={option.value}
          className={`
            flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all
            ${value === option.value
              ? option.critical
                ? 'bg-red-500/20 border-red-500'
                : option.good
                ? 'bg-green-500/20 border-green-500'
                : 'bg-cyan-500/20 border-cyan-500'
              : 'bg-gray-800/30 border-gray-700 hover:border-gray-600'
            }
          `}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            className="w-5 h-5 accent-cyan-500"
          />
          <div className="flex-1">
            <span className={`
              ${value === option.value ? 'font-semibold' : ''}
              ${option.critical && value === option.value ? 'text-red-400' : ''}
              ${option.good && value === option.value ? 'text-green-400' : ''}
            `}>
              {option.label}
            </span>
            {option.tooltip && (
              <p className="text-xs text-gray-400 mt-1">{option.tooltip}</p>
            )}
          </div>
          {option.critical && value === option.value && (
            <span className="text-red-500 text-xl">🚨</span>
          )}
          {option.good && value === option.value && (
            <span className="text-green-500 text-xl">✓</span>
          )}
        </label>
      ))}
    </div>
  );
}
