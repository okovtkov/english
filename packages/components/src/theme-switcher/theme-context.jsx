'use client';
import { createContext, useContext, useState } from 'react';

const ThemeStateContext = createContext();

export const ThemeStateProvider = ({ children }) => {
  const defaultTheme = getDefaultTheme();
  const [theme, setTheme] = useState(defaultTheme);

  function getDefaultTheme() {
    const localTheme = localStorage.getItem('theme');
    if (localTheme) return localTheme;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
      return 'dark';
    return 'light';
  }

  const updateTheme = (value) => {
    setTheme(value);
    document.body.dataset.theme = value;
    localStorage.setItem('theme', value);
  };

  return (
    <ThemeStateContext.Provider value={{ theme, setTheme: updateTheme }}>
      {children}
    </ThemeStateContext.Provider>
  );
};

export const useThemeState = () => {
  const context = useContext(ThemeStateContext);
  if (!context) {
    throw new Error('useThemeState must be used within an ThemeStateProvider');
  }
  return context;
};
