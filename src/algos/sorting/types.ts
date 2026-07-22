/**
 * Animation step types for sorting visualizations
 */
export type AnimationStepType = 'compare' | 'swap' | 'overwrite' | 'pivot';

/**
 * Base animation step interface
 */
interface BaseAnimationStep {
  type: AnimationStepType;
  indices: number[];
}

/**
 * Compare animation step - highlights elements being compared
 */
export interface CompareStep extends BaseAnimationStep {
  type: 'compare';
  indices: [number, number];
}

/**
 * Swap animation step - swaps two elements
 */
export interface SwapStep extends BaseAnimationStep {
  type: 'swap';
  indices: [number, number];
}

/**
 * Overwrite animation step - overwrites element at index with value
 * Used primarily in merge sort
 */
export interface OverwriteStep extends BaseAnimationStep {
  type: 'overwrite';
  indices: [number];
  value: number;
}

/**
 * Pivot animation step - marks pivot element in quick sort
 */
export interface PivotStep extends BaseAnimationStep {
  type: 'pivot';
  indices: [number];
}

/**
 * Discriminated union of all animation step types
 */
export type AnimationStep = CompareStep | SwapStep | OverwriteStep | PivotStep;

/**
 * Supported sorting algorithms
 */
export type SortingAlgorithm = 'bubble' | 'insertion' | 'quick' | 'merge' | 'selection' | 'heap';

/**
 * Algorithm metadata
 */
export interface AlgorithmInfo {
  name: string;
  timeComplexity: string;
  spaceComplexity: string;
  description: string;
}

/**
 * Algorithm registry mapping
 */
export const ALGORITHM_INFO: Record<SortingAlgorithm, AlgorithmInfo> = {
  bubble: {
    name: 'Bubble Sort',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
  },
  insertion: {
    name: 'Insertion Sort',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description: 'Builds the final sorted array one item at a time by inserting elements into their correct position.',
  },
  quick: {
    name: 'Quick Sort',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
    description: 'Divides the array using a pivot element and recursively sorts the sub-arrays.',
  },
  merge: {
    name: 'Merge Sort',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    description: 'Divides the array into halves, recursively sorts them, and merges the sorted halves.',
  },
  selection: {
    name: 'Selection Sort',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description: 'Finds the minimum element in the unsorted portion and swaps it with the first unsorted position.',
  },
  heap: {
    name: 'Heap Sort',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)',
    description: 'Builds a max heap from the array and repeatedly extracts the maximum element to sort.',
  },
};
