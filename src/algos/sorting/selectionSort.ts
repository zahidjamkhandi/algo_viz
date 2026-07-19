import type { AnimationStep } from './types';

/**
 * Selection Sort Algorithm
 * Time Complexity: O(n²) for all cases
 * Space Complexity: O(1) - in-place sorting
 *
 * Generates animation steps for selection sort visualization
 * Approach: Find minimum element in unsorted portion and swap with first unsorted position
 */
export function selectionSort(inputArray: ReadonlyArray<number>): AnimationStep[] {
  const animations: AnimationStep[] = [];
  const array = [...inputArray]; // Create mutable copy
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    // Assume the current position has the minimum value
    let minIndex = i;

    // Find the minimum element in the unsorted portion
    for (let j = i + 1; j < n; j++) {
      // Compare current element with minimum
      animations.push({
        type: 'compare',
        indices: [minIndex, j],
      });

      if (array[j] < array[minIndex]) {
        // Update minimum index
        minIndex = j;
      }
    }

    // Swap minimum element with first unsorted position if needed
    if (minIndex !== i) {
      animations.push({
        type: 'swap',
        indices: [i, minIndex],
      });

      // Perform actual swap in working array
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
  }

  return animations;
}
