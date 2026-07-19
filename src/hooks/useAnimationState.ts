import { useState, useRef, useCallback } from 'react';
import type { AnimationState } from '../types/animation.types';

interface UseAnimationStateReturn {
  animationState: AnimationState;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  setCurrentStep: (step: number) => void;
  setTotalSteps: (total: number) => void;
  clearPendingTimeouts: () => void;
  addTimeout: (id: number) => void;
}

/**
 * Custom hook for managing animation pause/resume state
 * Provides state management for controlling animation playback
 */
export function useAnimationState(): UseAnimationStateReturn {
  const [animationState, setAnimationState] = useState<AnimationState>({
    isPlaying: false,
    isPaused: false,
    currentStep: 0,
    totalSteps: 0,
  });

  const timeoutIdsRef = useRef<number[]>([]);

  const pause = useCallback(() => {
    setAnimationState((prev) => ({
      ...prev,
      isPlaying: false,
      isPaused: true,
    }));
  }, []);

  const resume = useCallback(() => {
    setAnimationState((prev) => ({
      ...prev,
      isPlaying: true,
      isPaused: false,
    }));
  }, []);

  const reset = useCallback(() => {
    setAnimationState({
      isPlaying: false,
      isPaused: false,
      currentStep: 0,
      totalSteps: 0,
    });
  }, []);

  const setCurrentStep = useCallback((step: number) => {
    setAnimationState((prev) => ({
      ...prev,
      currentStep: step,
    }));
  }, []);

  const setTotalSteps = useCallback((total: number) => {
    setAnimationState((prev) => ({
      ...prev,
      totalSteps: total,
    }));
  }, []);

  const clearPendingTimeouts = useCallback(() => {
    timeoutIdsRef.current.forEach((id) => clearTimeout(id));
    timeoutIdsRef.current = [];
  }, []);

  const addTimeout = useCallback((id: number) => {
    timeoutIdsRef.current.push(id);
  }, []);

  return {
    animationState,
    pause,
    resume,
    reset,
    setCurrentStep,
    setTotalSteps,
    clearPendingTimeouts,
    addTimeout,
  };
}
