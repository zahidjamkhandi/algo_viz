import { useState, useRef, useCallback } from 'react';
import type { AnimationStep, SortingAlgorithm } from '../algos/sorting/types';
import { bubbleSort } from '../algos/sorting/bubbleSort';
import { insertionSort } from '../algos/sorting/insertionSort';
import { quickSort } from '../algos/sorting/quickSort';
import { mergeSort } from '../algos/sorting/mergeSort';
import { selectionSort } from '../algos/sorting/selectionSort';
import { heapSort } from '../algos/sorting/heapSort';

interface UseSortingVisualizerReturn {
  array: number[];
  activeIndices: number[];
  pivotIndex: number | null;
  isSorting: boolean;
  isPaused: boolean;
  animationSpeed: number;
  setArray: (arr: number[]) => void;
  setAnimationSpeed: (speed: number) => void;
  startSorting: (algorithm: SortingAlgorithm) => void;
  resetVisualizer: () => void;
  togglePause: () => void;
}

const ANIMATION_DELAY_MS = 400;

export function useSortingVisualizer(initialArray: number[] = []): UseSortingVisualizerReturn {
  const [array, setArray] = useState<number[]>(initialArray);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [pivotIndex, setPivotIndex] = useState<number | null>(null);
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);

  const originalArrayRef = useRef<number[]>(initialArray);
  const timeoutIdsRef = useRef<number[]>([]);
  const animationsRef = useRef<AnimationStep[]>([]);
  const currentStepRef = useRef<number>(0);
  const workingArrayRef = useRef<number[]>([]);

  const clearAllTimeouts = useCallback(() => {
    timeoutIdsRef.current.forEach((id) => clearTimeout(id));
    timeoutIdsRef.current = [];
  }, []);

  const resetVisualizer = useCallback(() => {
    clearAllTimeouts();
    setArray([...originalArrayRef.current]);
    setActiveIndices([]);
    setPivotIndex(null);
    setIsSorting(false);
    setIsPaused(false);
    currentStepRef.current = 0;
    animationsRef.current = [];
    workingArrayRef.current = [];
  }, [clearAllTimeouts]);

  const setArrayWrapper = useCallback((arr: number[]) => {
    clearAllTimeouts();
    setArray(arr);
    originalArrayRef.current = arr;
    setActiveIndices([]);
    setPivotIndex(null);
    setIsSorting(false);
    setIsPaused(false);
    currentStepRef.current = 0;
    animationsRef.current = [];
    workingArrayRef.current = [];
  }, [clearAllTimeouts]);

  const executeAnimationStep = useCallback(
    (step: AnimationStep, workingArray: number[]) => {
      switch (step.type) {
        case 'compare':
          setActiveIndices(step.indices);
          setPivotIndex(null);
          break;

        case 'swap': {
          const [i, j] = step.indices;
          [workingArray[i], workingArray[j]] = [workingArray[j], workingArray[i]];
          setArray([...workingArray]);
          setActiveIndices(step.indices);
          setPivotIndex(null);
          break;
        }

        case 'overwrite': {
          const [i] = step.indices;
          workingArray[i] = step.value;
          setArray([...workingArray]);
          setActiveIndices(step.indices);
          setPivotIndex(null);
          break;
        }

        case 'pivot':
          setPivotIndex(step.indices[0]);
          setActiveIndices([]);
          break;
      }
    },
    []
  );

  const executeAnimations = useCallback(
    (animations: AnimationStep[], startFromStep: number = 0) => {
      const workingArray = startFromStep === 0 ? [...array] : [...workingArrayRef.current];
      workingArrayRef.current = workingArray;
      const delay = ANIMATION_DELAY_MS / animationSpeed;

      for (let index = startFromStep; index < animations.length; index++) {
        const timeoutId = window.setTimeout(() => {
          const step = animations[index];
          currentStepRef.current = index;
          executeAnimationStep(step, workingArray);

          // Clear highlights after last animation
          if (index === animations.length - 1) {
            setTimeout(() => {
              setActiveIndices([]);
              setPivotIndex(null);
              setIsSorting(false);
              setIsPaused(false);
              currentStepRef.current = 0;
              animationsRef.current = [];
              workingArrayRef.current = [];
            }, delay);
          }
        }, (index - startFromStep) * delay);

        timeoutIdsRef.current.push(timeoutId);
      }
    },
    [array, animationSpeed, executeAnimationStep]
  );

  const togglePause = useCallback(() => {
    if (!isSorting) return;

    if (isPaused) {
      // Resume animation from current step
      setIsPaused(false);
      const remainingAnimations = animationsRef.current;
      const nextStep = currentStepRef.current + 1;
      
      // Edge case: If we're at the last step or beyond, complete the animation
      if (nextStep >= remainingAnimations.length) {
        setActiveIndices([]);
        setPivotIndex(null);
        setIsSorting(false);
        setIsPaused(false);
        currentStepRef.current = 0;
        animationsRef.current = [];
        workingArrayRef.current = [];
        return;
      }
      
      if (nextStep < remainingAnimations.length) {
        executeAnimations(remainingAnimations, nextStep);
      }
    } else {
      // Pause animation - clear all pending timeouts
      setIsPaused(true);
      clearAllTimeouts();
    }
  }, [isSorting, isPaused, executeAnimations, clearAllTimeouts]);

  const startSorting = useCallback(
    (algorithm: SortingAlgorithm) => {
      // Edge case: Prevent starting if already sorting or array is empty
      if (isSorting || array.length === 0) return;

      // Edge case: Clear any lingering state from previous runs
      clearAllTimeouts();
      setIsSorting(true);
      setIsPaused(false);
      currentStepRef.current = 0;
      animationsRef.current = [];
      workingArrayRef.current = [];

      let animations: AnimationStep[] = [];

      switch (algorithm) {
        case 'bubble':
          animations = bubbleSort(array);
          break;
        case 'insertion':
          animations = insertionSort(array);
          break;
        case 'quick':
          animations = quickSort(array);
          break;
        case 'merge':
          animations = mergeSort(array);
          break;
        case 'selection':
          animations = selectionSort(array);
          break;
        case 'heap':
          animations = heapSort(array);
          break;
      }

      // Edge case: Handle empty animation sequence
      if (animations.length === 0) {
        setIsSorting(false);
        return;
      }

      animationsRef.current = animations;
      workingArrayRef.current = [...array];
      executeAnimations(animations, 0);
    },
    [array, isSorting, clearAllTimeouts, executeAnimations]
  );

  return {
    array,
    activeIndices,
    pivotIndex,
    isSorting,
    isPaused,
    animationSpeed,
    setArray: setArrayWrapper,
    setAnimationSpeed,
    startSorting,
    resetVisualizer,
    togglePause,
  };
}
