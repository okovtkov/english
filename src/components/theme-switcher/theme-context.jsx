import { createContext, useContext, useEffect, useState } from 'react';

const ThemeStateContext = createContext();

export const ThemeStateProvider = ({ children }) => {
  const defaultTheme = localStorage.getItem('theme') || 'light';
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeStateContext.Provider value={{ theme, setTheme }}>{children}</ThemeStateContext.Provider>
  );
};

export const useThemeState = () => {
  const context = useContext(ThemeStateContext);
  if (!context) {
    throw new Error('useThemeState must be used within an ThemeStateProvider');
  }
  return context;
};
