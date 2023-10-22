import React, { createContext, useContext, useState } from 'react';

export const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Default theme is 'light'

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  const backgroundColor = theme === 'light' ? 'white' : 'black'; // Define global background color
  const textColor = theme === 'light' ? 'black' : 'white';

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, backgroundColor, textColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

