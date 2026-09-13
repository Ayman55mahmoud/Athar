import type { Page } from '@/types';
import { useLang } from '@/context/LangContext';

interface AboutPageProps {
  onNavigate: (page: Page) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  const { t } = useLang();

  const values = [
    { title: t('valueQuality'), desc: t('valueQualityDesc') },
    { title: t('valueMinimal'), desc: t('valueMinimalDesc') },
    { title: t('valueEssential'), desc: t('valueEssentialDesc') },
  ];

  return (
    <div className="pt-24 lg:pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-arabic text-2xl text-sand-dark mb-2" dir="rtl">أثر</p>
          <h1 className="font-serif text-4xl lg:text-5xl tracking-wide text-ink mb-4">
            {t('aboutAtharTitle')}
          </h1>
          <p className="text-lg text-stone font-light leading-relaxed max-w-2xl mx-auto">
            {t('aboutAtharDesc')}
          </p>
        </div>

        {/* Image */}
        <div className="aspect-[16/9] overflow-hidden rounded-sm mb-12">
          <img
            src="https://images.pexels.com/photos/5035794/pexels-photo-5035794.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="ATHAR brand editorial"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="prose max-w-none space-y-6 text-ink-muted leading-relaxed">
          <p>{t('aboutP1')}</p>
          <p>{t('aboutP2')}</p>
          <p className="font-serif text-xl text-ink italic">
            {t('aboutQuote')}
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
          {values.map((value) => (
            <div key={value.title} className="text-center p-6 border border-line rounded-sm bg-paper-dark/30">
              <h3 className="font-serif text-xl tracking-wide text-ink mb-2">{value.title}</h3>
              <p className="text-sm text-stone leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => onNavigate('shop')}
            className="inline-block px-8 py-4 bg-ink text-paper text-sm font-medium tracking-wide uppercase hover:bg-ink-soft transition-colors rounded-sm"
          >
            {t('exploreCollection')}
          </button>
        </div>
      </div>
    </div>
  );
}
