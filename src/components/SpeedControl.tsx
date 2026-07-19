import './SpeedControl.scss';

interface SpeedControlProps {
  speed: number;
  onSpeedChange: (speed: number) => void;
  disabled?: boolean;
}

const SPEED_OPTIONS = [
  { value: 0.25, label: '0.25x' },
  { value: 0.5, label: '0.5x' },
  { value: 1, label: '1x' },
  { value: 2, label: '2x' },
  { value: 4, label: '4x' },
];

export function SpeedControl({ speed, onSpeedChange, disabled = false }: SpeedControlProps) {
  return (
    <div className="speed-control" role="group" aria-label="Animation speed control">
      {SPEED_OPTIONS.map((option) => (
        <button
          key={option.value}
          className={`speed-button ${speed === option.value ? 'speed-button-active' : ''}`}
          onClick={() => onSpeedChange(option.value)}
          disabled={disabled}
          aria-label={`Speed ${option.label}`}
          aria-pressed={speed === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
