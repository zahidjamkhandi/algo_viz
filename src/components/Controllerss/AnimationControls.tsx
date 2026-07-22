import './AnimationControls.scss';

interface AnimationControlsProps {
  isPaused: boolean;
  isPlaying: boolean;
  onTogglePause: () => void;
  disabled?: boolean;
}

/**
 * AnimationControls component - provides pause/resume button for animation playback
 * Uses universally recognized play/pause icons for intuitive control
 */
export function AnimationControls({
  isPaused,
  isPlaying,
  onTogglePause,
  disabled = false,
}: AnimationControlsProps) {
  const isActive = isPlaying || isPaused;
  const buttonLabel = isPaused ? 'Resume animation' : 'Pause animation';
  const ariaPressed = isPaused;

  return (
    <div className="animation-controls">
      <button
        className={`control-button ${isActive ? 'control-button-active' : ''}`}
        onClick={onTogglePause}
        disabled={disabled || !isActive}
        aria-label={buttonLabel}
        aria-pressed={ariaPressed}
        title={buttonLabel}
      >
        {isPaused ? (
          // Play icon (resume)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="control-icon"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        ) : (
          // Pause icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="control-icon"
            aria-hidden="true"
          >
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        )}
      </button>
    </div>
  );
}
