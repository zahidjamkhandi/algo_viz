import type { AnimationStep } from './types';

/**
 * Merge Sort Algorithm
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 * 
 * Generates animation steps for merge sort visualization
 */
export function mergeSort(inputArray: ReadonlyArray<number>): AnimationStep[] {
  const animations: AnimationStep[] = [];
  const array = [...inputArray];
  const auxiliary = [...array];

  function merge(left: number, mid: number, right: number): void {
    let i = left;
    let j = mid + 1;
    let k = left;

    // Copy to auxiliary array
    for (let idx = left; idx <= right; idx++) {
      auxiliary[idx] = array[idx];
    }

    while (i <= mid && j <= right) {
      // Compare elements from both halves
      animations.push({
        type: 'compare',
        indices: [i, j],
      });

      if (auxiliary[i] <= auxiliary[j]) {
        // Overwrite with smaller element
        animations.push({
          type: 'overwrite',
          indices: [k],
          value: auxiliary[i],
        });

        array[k] = auxiliary[i];
        i++;
      } else {
        animations.push({
          type: 'overwrite',
          indices: [k],
          value: auxiliary[j],
        });

        array[k] = auxiliary[j];
        j++;
      }
      k++;
    }

    // Copy remaining elements from left half
    while (i <= mid) {
      animations.push({
        type: 'overwrite',
        indices: [k],
        value: auxiliary[i],
      });

      array[k] = auxiliary[i];
      i++;
      k++;
    }

    // Copy remaining elements from right half
    while (j <= right) {
      animations.push({
        type: 'overwrite',
        indices: [k],
        value: auxiliary[j],
      });

      array[k] = auxiliary[j];
      j++;
      k++;
    }
  }

  function mergeSortHelper(left: number, right: number): void {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      mergeSortHelper(left, mid);
      mergeSortHelper(mid + 1, right);
      merge(left, mid, right);
    }
  }

  mergeSortHelper(0, array.length - 1);
  return animations;
}
