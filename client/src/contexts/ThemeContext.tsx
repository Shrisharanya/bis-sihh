import React, { createContext, useContext, useEffect } from "react";

type Theme = "dark";
interface ThemeContextType { theme: Theme; switchable: false; }
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
interface ThemeProviderProps { children: React.ReactNode; defaultTheme?: Theme; switchable?: false; }
export function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => { document.documentElement.classList.add("dark"); localStorage.removeItem("theme"); }, []);
  return <ThemeContext.Provider value={{ theme: "dark", switchable: false }}>{children}</ThemeContext.Provider>;
}
export function useTheme() { const context = useContext(ThemeContext); if (!context) throw new Error("useTheme must be used within ThemeProvider"); return context; }
