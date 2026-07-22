import { useState } from 'react';
import type { FormEvent } from 'react';
import './ArrayInput.scss';

interface ArrayInputProps {
  onSubmit: (array: number[]) => void;
  disabled?: boolean;
}

export function ArrayInput({ onSubmit, disabled = false }: ArrayInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!inputValue.trim()) {
      setError('Please enter comma-separated numbers');
      return;
    }

    try {
      const numbers = inputValue
        .split(',')
        .map((str) => str.trim())
        .filter((str) => str !== '')
        .map((str) => {
          const num = Number(str);
          if (isNaN(num)) {
            throw new Error(`Invalid number: ${str}`);
          }
          return num;
        });

      if (numbers.length === 0) {
        setError('Please enter at least one number');
        return;
      }

      if (numbers.length > 100) {
        setError('Maximum 100 numbers allowed');
        return;
      }

      onSubmit(numbers);
      setInputValue('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid input format');
    }
  };

  const handleGenerateRandom = () => {
    const count = 15;
    const randomArray = Array.from({ length: count }, () => Math.floor(Math.random() * 100) + 1);
    onSubmit(randomArray);
    setInputValue('');
    setError('');
  };

  return (
    <div className="array-input">
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          className="input-field"
          placeholder="e.g., 45, 12, 89, 3, 67, 34"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={disabled}
          aria-label="Array input"
          aria-describedby={error ? 'input-error' : undefined}
        />
        <div className="input-buttons">
          <button
            type="submit"
            className="input-button input-button-primary"
            disabled={disabled}
          >
            Insert Array
          </button>
          <button
            type="button"
            className="input-button input-button-secondary"
            onClick={handleGenerateRandom}
            disabled={disabled}
          >
            Generate Random
          </button>
        </div>
      </form>
      {error && (
        <p id="input-error" className="error-message" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
