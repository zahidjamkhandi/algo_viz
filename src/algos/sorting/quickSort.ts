import type { AnimationStep } from './types';

/**
 * Quick Sort Algorithm
 * Time Complexity: O(n log n) average, O(n²) worst case
 * Space Complexity: O(log n)
 * 
 * Generates animation steps for quick sort visualization
 */
export function quickSort(inputArray: ReadonlyArray<number>): AnimationStep[] {
  const animations: AnimationStep[] = [];
  const array = [...inputArray];

  function partition(low: number, high: number): number {
    const pivot = array[high];
    
    // Mark pivot
    animations.push({
      type: 'pivot',
      indices: [high],
    });

    let i = low - 1;

    for (let j = low; j < high; j++) {
      // Compare with pivot
      animations.push({
        type: 'compare',
        indices: [j, high],
      });

      if (array[j] < pivot) {
        i++;
        
        if (i !== j) {
          // Swap elements
          animations.push({
            type: 'swap',
            indices: [i, j],
          });

          [array[i], array[j]] = [array[j], array[i]];
        }
      }
    }

    // Place pivot in correct position
    animations.push({
      type: 'swap',
      indices: [i + 1, high],
    });

    [array[i + 1], array[high]] = [array[high], array[i + 1]];

    return i + 1;
  }

  function quickSortHelper(low: number, high: number): void {
    if (low < high) {
      const pivotIndex = partition(low, high);
      quickSortHelper(low, pivotIndex - 1);
      quickSortHelper(pivotIndex + 1, high);
    }
  }

  quickSortHelper(0, array.length - 1);
  return animations;
}
