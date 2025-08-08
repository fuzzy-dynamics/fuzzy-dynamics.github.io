import React, { createContext, useContext, useEffect, useState } from 'react';

/**
 * Enhanced theme context with soft Monokai-inspired dark mode.
 * 
 * Features:
 * - Monokai-inspired dark theme with warm undertones (64 8% 15% background)
 * - Cozy, professional aesthetic that's easy on the eyes
 * - Theme-aware utility methods for conditional styling
 * 
 * Usage:
 * const { theme, toggleTheme, isDark, getThemeClass } = useTheme();
 * const className = getThemeClass('light-class', 'dark-class');
 */

type Theme = 'system' | 'light' | 'dark';

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isDark: boolean;
  isLight: boolean;
  isSystem: boolean;
  getThemeClass: (lightClass: string, darkClass?: string) => string;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
}) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Check localStorage first
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey) as Theme;
      if (stored && (stored === 'system' || stored === 'light' || stored === 'dark')) {
        return stored;
      }
    }
    return defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove previous theme classes
    root.classList.remove('light', 'dark');
    
    // Determine actual theme to apply
    let actualTheme = theme;
    if (theme === 'system') {
      actualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    // Add current theme class
    root.classList.add(actualTheme);
    
    // Store in localStorage
    localStorage.setItem(storageKey, theme);
    
    // Listen for system theme changes if using system preference
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        root.classList.remove('light', 'dark');
        const newTheme = mediaQuery.matches ? 'dark' : 'light';
        root.classList.add(newTheme);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme, storageKey]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState(prev => {
      if (prev === 'system') return 'light';
      if (prev === 'light') return 'dark';
      return 'system';
    });
  };

  // Utility methods for easier theme management
  const getActualTheme = () => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme;
  };
  
  const actualTheme = getActualTheme();
  const isDark = actualTheme === 'dark';
  const isLight = actualTheme === 'light';
  const isSystem = theme === 'system';
  
  const getThemeClass = (lightClass: string, darkClass?: string) => {
    if (!darkClass) return lightClass;
    return isDark ? darkClass : lightClass;
  };

  const value: ThemeContextProps = {
    theme,
    setTheme,
    toggleTheme,
    isDark,
    isLight,
    isSystem,
    getThemeClass,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};