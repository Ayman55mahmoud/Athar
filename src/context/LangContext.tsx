import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { Lang, TranslationKey } from '@/data/translations';
import { translations } from '@/data/translations';

interface LangContextValue {
  lang: Lang;
  dir: 'ltr' | 'rtl';
  t: (key: TranslationKey) => string;
  toggleLang: () => void;
  setLang: (lang: Lang) => void;
}

const LangContext = createContext<LangContextValue | undefined>(undefined);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'en';
    return (localStorage.getItem('athar_lang') as Lang) || 'en';
  });

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    localStorage.setItem('athar_lang', lang);
  }, [lang, dir]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggleLang = useCallback(() => {
    setLangState((prev) => (prev === 'en' ? 'ar' : 'en'));
  }, []);

  const t = useCallback(
    (key: TranslationKey): string => translations[lang][key],
    [lang],
  );

  return (
    <LangContext.Provider value={{ lang, dir, t, toggleLang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LangContext);
  if (!context) throw new Error('useLang must be used within LangProvider');
  return context;
}
