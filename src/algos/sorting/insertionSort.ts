import type { AnimationStep } from './types';

/**
 * Insertion Sort Algorithm
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 * 
 * Generates animation steps for insertion sort visualization
 */
export function insertionSort(inputArray: ReadonlyArray<number>): AnimationStep[] {
  const animations: AnimationStep[] = [];
  const array = [...inputArray];
  const n = array.length;

  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;

    // Compare current element with sorted portion
    animations.push({
      type: 'compare',
      indices: [i, j],
    });

    while (j >= 0 && array[j] > key) {
      // Shift element to the right
      animations.push({
        type: 'swap',
        indices: [j, j + 1],
      });

      array[j + 1] = array[j];
      j--;

      if (j >= 0) {
        animations.push({
          type: 'compare',
          indices: [j, j + 1],
        });
      }
    }

    array[j + 1] = key;
  }

  return animations;
}
