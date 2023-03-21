import * as React from 'react';

export function useLocalStorage(
  key: string,
  initialValue: string
): [string, (value: string) => void] {
  const [storedValue, setStoredValue] = React.useState<string>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    return window.localStorage.getItem(key) || '';
  });

  function setValue(value: string): void {
    setStoredValue(value);
    window.localStorage.setItem(key, value);
  }

  return [storedValue, setValue];
}
