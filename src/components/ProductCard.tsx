import { useState } from 'react';
import type { Product } from '@/types';
import { getFinalPrice, formatPrice, hasDiscount } from '@/utils/pricing';
import { useLang } from '@/context/LangContext';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const { lang, t } = useLang();
  const finalPrice = getFinalPrice(product);
  const onSale = hasDiscount(product);

  const displayName = lang === 'ar' && product.nameAr ? product.nameAr : product.name;
  const displayCategory = lang === 'ar' ? translateCategory(product.category) : product.category;

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-paper-dark rounded-sm">
        {!product.available && (
          <div className="absolute inset-0 z-10 bg-ink/50 flex items-center justify-center">
            <span className="text-paper text-sm font-medium tracking-wide">{t('notAvailable')}</span>
          </div>
        )}
        {onSale && (
          <span className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-ink text-paper text-xs font-medium tracking-wide rounded-sm">
            -{product.discount}%
          </span>
        )}
        {product.isNew && !onSale && (
          <span className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-sand text-ink text-xs font-medium tracking-wide rounded-sm">
            {t('new')}
          </span>
        )}
        <img
          src={product.images[0]}
          alt={displayName}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button className="w-full py-3 bg-paper/95 backdrop-blur-sm text-ink text-sm font-medium tracking-wide uppercase hover:bg-ink hover:text-paper transition-colors rounded-sm">
            {t('viewProduct')}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="mt-4 px-1">
        <p className="text-xs uppercase tracking-extra-wide text-stone mb-1">{displayCategory}</p>
        <h3 className="text-base font-medium text-ink line-clamp-1">{displayName}</h3>
        <div className="mt-2 flex items-baseline gap-2">
          {onSale && (
            <span className="text-sm text-stone line-through">{formatPrice(product.price)}</span>
          )}
          <span className="text-base font-semibold text-ink">
            {formatPrice(finalPrice)}
          </span>
        </div>
      </div>
    </div>
  );
}

function translateCategory(cat: string): string {
  const map: Record<string, string> = {
    'T-Shirts': 'تيشيرتات',
    'Shirts': 'قمصان',
    'Pants': 'بنطلونات',
    'Hoodies': 'هودي',
    'Jackets': 'جاكتات',
    'New Arrivals': 'وصل حديثاً',
    'Offers': 'العروض',
    'All': 'الكل',
  };
  return map[cat] || cat;
}
