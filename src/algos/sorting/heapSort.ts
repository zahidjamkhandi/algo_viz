import type { AnimationStep } from './types';

/**
 * Heap Sort Algorithm
 * Time Complexity: O(n log n) for all cases
 * Space Complexity: O(1) - in-place sorting
 *
 * Generates animation steps for heap sort visualization
 * Approach: Build max heap, repeatedly extract maximum element
 */
export function heapSort(inputArray: ReadonlyArray<number>): AnimationStep[] {
  const animations: AnimationStep[] = [];
  const array = [...inputArray]; // Create mutable copy
  const n = array.length;

  // Build max heap (heapify phase)
  // Start from last non-leaf node and move upward
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, n, i, animations);
  }

  // Extract elements from heap one by one (sorting phase)
  for (let i = n - 1; i > 0; i--) {
    // Move current root (maximum) to end
    animations.push({
      type: 'swap',
      indices: [0, i],
    });

    // Perform actual swap in working array
    [array[0], array[i]] = [array[i], array[0]];

    // Heapify the reduced heap
    heapify(array, i, 0, animations);
  }

  return animations;
}

/**
 * Heapify a subtree rooted at index i
 * @param array - The array to heapify
 * @param heapSize - Size of the heap
 * @param rootIndex - Index of the root of the subtree
 * @param animations - Array to store animation steps
 */
function heapify(
  array: number[],
  heapSize: number,
  rootIndex: number,
  animations: AnimationStep[]
): void {
  let largest = rootIndex; // Initialize largest as root
  const leftChild = 2 * rootIndex + 1; // Left child index
  const rightChild = 2 * rootIndex + 2; // Right child index

  // Compare with left child
  if (leftChild < heapSize) {
    animations.push({
      type: 'compare',
      indices: [largest, leftChild],
    });

    if (array[leftChild] > array[largest]) {
      largest = leftChild;
    }
  }

  // Compare with right child
  if (rightChild < heapSize) {
    animations.push({
      type: 'compare',
      indices: [largest, rightChild],
    });

    if (array[rightChild] > array[largest]) {
      largest = rightChild;
    }
  }

  // If largest is not root, swap and continue heapifying
  if (largest !== rootIndex) {
    animations.push({
      type: 'swap',
      indices: [rootIndex, largest],
    });

    // Perform actual swap in working array
    [array[rootIndex], array[largest]] = [array[largest], array[rootIndex]];

    // Recursively heapify the affected subtree
    heapify(array, heapSize, largest, animations);
  }
}
