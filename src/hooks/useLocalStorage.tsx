import { useState } from "react";

export const useLocalStorage = (
  keyName: string,
  defaultValue: string
): [string, (newValue: string) => void] => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);

      if (value) {
        return value;
      } else {
        window.localStorage.setItem(keyName, defaultValue);
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue: string) => {
    try {
      window.localStorage.setItem(keyName, newValue);
    } catch (err) {
      /* empty */
    }
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};
