import { ArrowRight } from 'lucide-react';
import type { Page } from '@/types';
import { useLang } from '@/context/LangContext';

interface HeroProps {
  onNavigate: (page: Page) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const { lang, t } = useLang();

  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden bg-ink">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://chatgpt.com/s/m_6aa698fb9a80819198e96a85f11f1781"
          alt="ATHAR men's fashion editorial"
          className="w-full h-full object-cover opacity-70"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-4">
        <div className="text-center text-paper max-w-3xl">
          <div className="animate-fade-in-up">
            <p className="font-arabic text-lg sm:text-xl text-sand-light tracking-wider mb-2" dir="rtl">
              أثر
            </p>
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-wide font-light leading-none mb-6">
              ATHAR
            </h1>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.15s', opacity: 0 }}>
            {lang === 'en' ? (
              <p className="text-base sm:text-lg text-paper/80 font-light tracking-wide mb-2">
                Style that leaves an <span className="font-arabic">أثر</span>.
              </p>
            ) : (
              <p className="font-arabic text-base sm:text-lg text-paper/80" dir="rtl">
                ستايل يسيب أثر.
              </p>
            )}
          </div>
          <div className="animate-fade-in-up mt-10" style={{ animationDelay: '0.3s', opacity: 0 }}>
            <button
              onClick={() => onNavigate('shop')}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-paper text-ink text-sm font-medium tracking-extra-wide uppercase hover:bg-sand transition-all duration-300"
            >
              {t('shopCollection')}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform rtl:rotate-180"
                strokeWidth={1.5}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in" style={{ animationDelay: '0.5s', opacity: 0 }}>
        <div className="w-px h-12 bg-paper/30 mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-paper animate-[fadeIn_1.5s_ease-in-out_infinite_alternate]" />
        </div>
      </div>
    </section>
  );
}
