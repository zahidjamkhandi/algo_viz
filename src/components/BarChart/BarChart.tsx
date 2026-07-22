import { useMemo } from 'react';
import './BarChart.scss';

interface BarChartProps {
  array: number[];
  activeIndices: number[];
  pivotIndex: number | null;
}

export function BarChart({ array, activeIndices, pivotIndex }: BarChartProps) {
  const maxValue = useMemo(() => Math.max(...array, 1), [array]);

  const getBarState = (index: number): string => {
    if (pivotIndex === index) return 'pivot';
    if (activeIndices.includes(index)) return 'active';
    return 'default';
  };

  if (array.length === 0) {
    return (
      <div className="bar-chart-empty">
        <p className="empty-message">No data to visualize. Please insert an array.</p>
      </div>
    );
  }

  return (
    <div className="bar-chart" role="img" aria-label="Sorting visualization bar chart">
      <div className="bar-container">
        {array.map((value, index) => {
          const heightPercentage = (value / maxValue) * 100;
          const barState = getBarState(index);

          return (
            <div
              key={`${index}-${value}`}
              className={`bar bar-${barState}`}
              style={{ height: `${heightPercentage}%` }}
              role="presentation"
              aria-label={`Value ${value}, position ${index + 1}`}
            >
              <span className="bar-value">{value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
