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
  animationSpeed: number;
  setArray: (arr: number[]) => void;
  setAnimationSpeed: (speed: number) => void;
  startSorting: (algorithm: SortingAlgorithm) => void;
  resetVisualizer: () => void;
}

const ANIMATION_DELAY_MS = 40;

export function useSortingVisualizer(initialArray: number[] = []): UseSortingVisualizerReturn {
  const [array, setArray] = useState<number[]>(initialArray);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [pivotIndex, setPivotIndex] = useState<number | null>(null);
  const [isSorting, setIsSorting] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);

  const originalArrayRef = useRef<number[]>(initialArray);
  const timeoutIdsRef = useRef<number[]>([]);

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
  }, [clearAllTimeouts]);

  const setArrayWrapper = useCallback((arr: number[]) => {
    clearAllTimeouts();
    setArray(arr);
    originalArrayRef.current = arr;
    setActiveIndices([]);
    setPivotIndex(null);
    setIsSorting(false);
  }, [clearAllTimeouts]);

  const executeAnimations = useCallback(
    (animations: AnimationStep[]) => {
      const workingArray = [...array];
      const delay = ANIMATION_DELAY_MS / animationSpeed;

      animations.forEach((step, index) => {
        const timeoutId = window.setTimeout(() => {
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

          // Clear highlights after last animation
          if (index === animations.length - 1) {
            setTimeout(() => {
              setActiveIndices([]);
              setPivotIndex(null);
              setIsSorting(false);
            }, delay);
          }
        }, index * delay);

        timeoutIdsRef.current.push(timeoutId);
      });
    },
    [array, animationSpeed]
  );

  const startSorting = useCallback(
    (algorithm: SortingAlgorithm) => {
      if (isSorting || array.length === 0) return;

      clearAllTimeouts();
      setIsSorting(true);

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

      executeAnimations(animations);
    },
    [array, isSorting, clearAllTimeouts, executeAnimations]
  );

  return {
    array,
    activeIndices,
    pivotIndex,
    isSorting,
    animationSpeed,
    setArray: setArrayWrapper,
    setAnimationSpeed,
    startSorting,
    resetVisualizer,
  };
}
