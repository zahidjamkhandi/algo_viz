import { useState, useEffect } from 'react';
import type { SortingAlgorithm } from '../algos/sorting/types';
import { ALGORITHM_INFO } from '../algos/sorting/types';
import { useSortingVisualizer } from '../hooks/useSortingVisualizer';
import { BarChart } from '../components/BarChart';
import { AlgorithmSelector } from '../components/AlgorithmSelector';
import { ArrayInput } from '../components/ArrayInput';
import { SpeedControl } from '../components/SpeedControl';
import { AnimationControls } from '../components/AnimationControls';
import { WorkspaceHeader } from '../components/WorkspaceHeader/WorkspaceHeader';
import './SortingVisualizer.scss';

const DEFAULT_ARRAY = [64, 34, 25, 12, 22, 11, 90, 88, 45, 50, 33, 17, 78];

export function SortingVisualizer() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<SortingAlgorithm>('bubble');

  const {
    array,
    activeIndices,
    pivotIndex,
    isSorting,
    isPaused,
    animationSpeed,
    setArray,
    setAnimationSpeed,
    startSorting,
    resetVisualizer,
    togglePause,
  } = useSortingVisualizer(DEFAULT_ARRAY);

  const handleArraySubmit = (newArray: number[]) => {
    setArray(newArray);
  };

  const handleStartSorting = () => {
    startSorting(selectedAlgorithm);
  };

  // Keyboard shortcut: Spacebar to toggle pause/resume
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Only handle spacebar when sorting is active
      if (event.code === 'Space' && isSorting) {
        event.preventDefault(); // Prevent page scroll
        togglePause();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isSorting, togglePause]);

  const algorithmInfo = ALGORITHM_INFO[selectedAlgorithm];

  return (
    <div className="sorting-visualizer">
      <WorkspaceHeader title="Sorting Visualizer" />
      <div className="visualizer-container">
        <header className="visualizer-header">
          <h1 className="visualizer-title">
            Sorting <span className="nvidia-accent">Visualizer</span>
          </h1>
          <p className="visualizer-subtitle">
            Real-time algorithm execution tracking with synchronized animations
          </p>
        </header>

        <div className="controls-section">
          <div className="control-group">
            <label className="control-label">Dataset Input</label>
            <ArrayInput onSubmit={handleArraySubmit} disabled={isSorting} />
          </div>

          <div className="control-group">
            <label className="control-label">Algorithm Selection</label>
            <AlgorithmSelector
              selected={selectedAlgorithm}
              onSelect={setSelectedAlgorithm}
              disabled={isSorting}
            />
          </div>

          <div className="control-group">
            <label className="control-label">Animation Speed</label>
            <SpeedControl
              speed={animationSpeed}
              onSpeedChange={setAnimationSpeed}
              disabled={isSorting}
            />
          </div>
        </div>

        <div className="algorithm-info">
          <h3 className="info-title">{algorithmInfo.name}</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Time Complexity:</span>
              <span className="info-value">{algorithmInfo.timeComplexity}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Space Complexity:</span>
              <span className="info-value">{algorithmInfo.spaceComplexity}</span>
            </div>
          </div>
          <p className="info-description">{algorithmInfo.description}</p>
        </div>

        <div className="visualization-section">
          <BarChart
            array={array}
            activeIndices={activeIndices}
            pivotIndex={pivotIndex}
          />
          {isPaused && (
            <div className="paused-indicator" role="status" aria-live="polite">
              <span className="paused-text">⏸ Animation Paused</span>
            </div>
          )}
        </div>

        <div className="action-buttons">
          <button
            className="action-button action-button-primary"
            onClick={handleStartSorting}
            disabled={isSorting || array.length === 0}
          >
            {isSorting ? 'Sorting...' : 'Start Sorting'}
          </button>
          <AnimationControls
            isPaused={isPaused}
            isPlaying={isSorting}
            onTogglePause={togglePause}
          />
          <button
            className="action-button action-button-secondary"
            onClick={resetVisualizer}
          >
            Reset
          </button>
        </div>

        <div className="legend-section">
          <h4 className="legend-title">Controls & Legend</h4>
          <div className="keyboard-hint">
            <span className="hint-icon">⌨️</span>
            <span className="hint-text">Press <kbd>Spacebar</kbd> to pause/resume animation</span>
          </div>
          <div className="legend-items">
            <div className="legend-item">
              <div className="legend-color legend-color-default"></div>
              <span className="legend-text">Default</span>
            </div>
            <div className="legend-item">
              <div className="legend-color legend-color-compare"></div>
              <span className="legend-text">Comparing</span>
            </div>
            <div className="legend-item">
              <div className="legend-color legend-color-swap"></div>
              <span className="legend-text">Swapping</span>
            </div>
            <div className="legend-item">
              <div className="legend-color legend-color-pivot"></div>
              <span className="legend-text">Pivot</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
