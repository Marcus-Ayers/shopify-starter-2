'use client';
import { createContext, useEffect, useState, useContext } from 'react';

export const ThemeContext = createContext();

export default function ThemeManager({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const darkModeEnabled = window.localStorage.getItem('darkMode') === 'true';
    setDarkMode(darkModeEnabled);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      window.localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      window.localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>{children}</ThemeContext.Provider>
  );
}
