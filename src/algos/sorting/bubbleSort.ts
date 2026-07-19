import type { AnimationStep } from './types';

/**
 * Bubble Sort Algorithm
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 * 
 * Generates animation steps for bubble sort visualization
 */
export function bubbleSort(inputArray: ReadonlyArray<number>): AnimationStep[] {
  const animations: AnimationStep[] = [];
  const array = [...inputArray]; // Create mutable copy
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      animations.push({
        type: 'compare',
        indices: [j, j + 1],
      });

      if (array[j] > array[j + 1]) {
        // Swap elements
        animations.push({
          type: 'swap',
          indices: [j, j + 1],
        });

        // Perform actual swap in working array
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }

  return animations;
}
