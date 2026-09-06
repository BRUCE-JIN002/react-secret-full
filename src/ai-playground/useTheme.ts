import { useEffect, useState } from 'react';
export type StudioTheme = 'light' | 'dark';
function initialTheme(): StudioTheme {
  try {
    if (window.parent !== window) return window.parent.document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  } catch { /* Standalone or cross-origin embed: follow the system until the host responds. */ }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
export function useTheme() {
  const [theme, setTheme] = useState<StudioTheme>(initialTheme);
  useEffect(() => {
    function receive(event: MessageEvent) {
      if (event.source !== window.parent || event.origin !== window.location.origin || event.data?.type !== 'react-secret-theme') return;
      if (event.data.theme === 'light' || event.data.theme === 'dark') setTheme(event.data.theme);
    }
    const system = window.matchMedia('(prefers-color-scheme: dark)');
    const followSystem = (event: MediaQueryListEvent) => { if (window.parent === window) setTheme(event.matches ? 'dark' : 'light'); };
    window.addEventListener('message', receive);
    system.addEventListener('change', followSystem);
    window.parent.postMessage({ type: 'react-secret-theme-ready' }, window.location.origin);
    return () => { window.removeEventListener('message', receive); system.removeEventListener('change', followSystem); };
  }, []);
  return theme;
}
