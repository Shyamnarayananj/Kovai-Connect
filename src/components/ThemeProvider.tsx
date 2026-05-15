import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type Ctx = { theme: Theme; toggle: () => void; setTheme: (t: Theme) => void };

const ThemeContext = createContext<Ctx | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Default to "light" on both server and initial client render to avoid
  // hydration mismatch. We sync from <html> class in an effect.
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const initial = document.documentElement.classList.contains("dark") ? "dark" : "light";
    setThemeState(initial);
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    const root = document.documentElement;
    root.classList.toggle("dark", t === "dark");
    try {
      localStorage.setItem("kovai-theme", t);
    } catch {}
  };

  const toggle = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <ThemeContext.Provider value={{ theme, toggle, setTheme }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}

// Inline script that runs before hydration to set the dark class from
// localStorage / system preference. Prevents flash and SSR mismatch on
// the <html> element.
export const themeInitScript = `
(function(){try{
  var t = localStorage.getItem('kovai-theme');
  if(!t){ t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; }
  if(t==='dark'){ document.documentElement.classList.add('dark'); }
}catch(e){}})();
`;
