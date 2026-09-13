import { useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import type { Page, Product, Category } from '@/types';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Hero from '@/components/Hero';
import { useLang } from '@/context/LangContext';

interface HomePageProps {
  onNavigate: (page: Page) => void;
  onProductClick: (product: Product) => void;
  onSelectCategory: (cat: Category) => void;
}

export default function HomePage({ onNavigate, onProductClick, onSelectCategory }: HomePageProps) {
  const { t } = useLang();
  const newProducts = useMemo(
    () => products.filter((p) => p.available && p.isNew).slice(0, 4),
    [],
  );
  const offerProducts = useMemo(
    () => products.filter((p) => p.available && p.discount > 0).slice(0, 4),
    [],
  );

  return (
    <div>
      <Hero onNavigate={onNavigate} />

      {/* Brand statement */}
      <section className="py-20 lg:py-28 bg-paper">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="font-arabic text-lg text-sand-dark mb-3" dir="rtl">أثر — ATHAR</p>
          <h2 className="font-serif text-3xl lg:text-4xl tracking-wide text-ink mb-4 leading-snug">
            {t('brandStatementTitle')}
          </h2>
          <p className="text-base text-stone leading-relaxed">
            {t('brandStatementDesc')}
          </p>
        </div>
      </section>

      {/* New Arrivals */}
      {newProducts.length > 0 && (
        <section className="py-16 lg:py-20">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="flex items-end justify-between mb-8 lg:mb-10">
              <div>
                <p className="text-xs uppercase tracking-extra-wide text-stone mb-1">{t('justIn')}</p>
                <h2 className="font-serif text-3xl lg:text-4xl tracking-wide text-ink">{t('newArrivalsTitle')}</h2>
              </div>
              <button
                onClick={() => onSelectCategory('New Arrivals')}
                className="group flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-sand-dark transition-colors"
              >
                {t('viewAll')}
                <ArrowRight size={16} className="group-hover:translate-x-1 rtl:rotate-180 transition-transform" strokeWidth={1.5} />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
              {newProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => onProductClick(product)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Offers banner */}
      {offerProducts.length > 0 && (
        <section className="py-16 lg:py-20 bg-ink">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="flex items-end justify-between mb-8 lg:mb-10">
              <div>
                <p className="text-xs uppercase tracking-extra-wide text-sand-light mb-1">{t('limitedTime')}</p>
                <h2 className="font-serif text-3xl lg:text-4xl tracking-wide text-paper">{t('offersTitle')}</h2>
              </div>
              <button
                onClick={() => onSelectCategory('Offers')}
                className="group flex items-center gap-2 text-sm font-medium text-paper/70 hover:text-sand-light transition-colors"
              >
                {t('viewAll')}
                <ArrowRight size={16} className="group-hover:translate-x-1 rtl:rotate-180 transition-transform" strokeWidth={1.5} />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
              {offerProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => onProductClick(product)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Full collection CTA */}
      <section className="py-20 lg:py-28 bg-paper">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl tracking-wide text-ink mb-4">
            {t('fullCollectionTitle')}
          </h2>
          <p className="text-base text-stone leading-relaxed mb-8">
            {t('fullCollectionDesc')}
          </p>
          <button
            onClick={() => onNavigate('shop')}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-ink text-paper text-sm font-medium tracking-extra-wide uppercase hover:bg-ink-soft transition-colors rounded-sm"
          >
            {t('shopAll')}
            <ArrowRight size={16} className="group-hover:translate-x-1 rtl:rotate-180 transition-transform" strokeWidth={1.5} />
          </button>
        </div>
      </section>
    </div>
  );
}
