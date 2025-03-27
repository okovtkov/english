import { createContext, useContext, useState } from 'react';

const ThemeStateContext = createContext();

export const ThemeStateProvider = ({ children, defaultTheme }) => {
  const [theme, setTheme] = useState(defaultTheme);

  const updateTheme = (value) => {
    setTheme(value);
    document.cookie = `theme=${value}; path=/`;
    document.body.dataset.theme = value;
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
