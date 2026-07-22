import type { SortingAlgorithm } from '../../algos/sorting/types';
import { ALGORITHM_INFO } from '../../algos/sorting/types';
import './AlgorithmSelector.scss';

interface AlgorithmSelectorProps {
  selected: SortingAlgorithm;
  onSelect: (algorithm: SortingAlgorithm) => void;
  disabled?: boolean;
}

const algorithms: SortingAlgorithm[] = ['bubble', 'insertion', 'quick', 'merge', 'selection', 'heap'];

export function AlgorithmSelector({ selected, onSelect, disabled = false }: AlgorithmSelectorProps) {
  return (
    <div className="algorithm-selector" role="radiogroup" aria-label="Algorithm selection">
      {algorithms.map((algorithm) => (
        <button
          key={algorithm}
          className={`algorithm-button ${selected === algorithm ? 'algorithm-button-active' : ''}`}
          onClick={() => onSelect(algorithm)}
          disabled={disabled}
          role="radio"
          aria-checked={selected === algorithm}
          aria-label={ALGORITHM_INFO[algorithm].name}
        >
          {ALGORITHM_INFO[algorithm].name}
        </button>
      ))}
    </div>
  );
}
