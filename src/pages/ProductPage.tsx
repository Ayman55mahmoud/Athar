import { useState, useEffect } from 'react';
import { ArrowLeft, Minus, Plus, ShoppingBag } from 'lucide-react';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import QuickOrderModal from '@/components/QuickOrderModal';
import type { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useLang } from '@/context/LangContext';
import {
  getFinalPrice,
  getDiscountAmount,
  formatPrice,
  hasDiscount,
} from '@/utils/pricing';
import { buildWhatsAppMessage, openWhatsApp } from '@/utils/whatsapp';

interface ProductPageProps {
  product: Product;
  onBack: () => void;
}

export default function ProductPage({ product, onBack }: ProductPageProps) {
  const { addToCart, openCart } = useCart();
  const { lang, t } = useLang();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);

  useEffect(() => {
    setSelectedImage(0);
    setSelectedSize(product.sizes[0] || '');
    setSelectedColor(product.colors[0] || '');
    setQuantity(1);
    setAdded(false);
  }, [product]);

  const finalPrice = getFinalPrice(product);
  const discountAmount = getDiscountAmount(product);
  const onSale = hasDiscount(product);

  const displayName = lang === 'ar' && product.nameAr ? product.nameAr : product.name;
  const displayDesc = lang === 'ar' && product.descriptionAr ? product.descriptionAr : product.description;
  const displayCategory = lang === 'ar' ? translateCategory(product.category) : product.category;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleOrderNow = () => {
    setShowOrderModal(true);
  };

  const handleDirectWhatsApp = () => {
    setShowOrderModal(true);
  };

  return (
    <div className="pt-20 lg:pt-24 pb-16">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-stone hover:text-ink transition-colors mb-6 lg:mb-8"
        >
          <ArrowLeft size={16} strokeWidth={1.5} className="rtl:rotate-180" />
          {t('backToShop')}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[3/4] overflow-hidden bg-paper-dark rounded-sm">
              {!product.available && (
                <div className="absolute inset-0 z-10 bg-ink/50 flex items-center justify-center">
                  <span className="text-paper text-lg font-medium tracking-wide">{t('unavailable')}</span>
                </div>
              )}
              {onSale && (
                <span className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-ink text-paper text-sm font-medium tracking-wide rounded-sm">
                  -{product.discount}%
                </span>
              )}
              <img
                src={product.images[selectedImage]}
                alt={displayName}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-24 overflow-hidden rounded-sm border-2 transition-colors ${
                      selectedImage === idx ? 'border-ink' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt={`${displayName} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="lg:pt-4">
            <p className="text-xs uppercase tracking-extra-wide text-stone mb-2">{displayCategory}</p>
            <h1 className="font-serif text-3xl lg:text-4xl tracking-wide text-ink mb-2">{displayName}</h1>
            {lang === 'en' && product.nameAr && (
              <p className="font-arabic text-lg text-stone mb-4" dir="rtl">{product.nameAr}</p>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              {onSale && (
                <span className="text-lg text-stone line-through">{formatPrice(product.price)}</span>
              )}
              <span className="text-2xl font-semibold text-ink">{formatPrice(finalPrice)}</span>
              {onSale && (
                <span className="text-sm text-ink bg-sand-light px-2 py-0.5 rounded">
                  {t('save')} {formatPrice(discountAmount)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-base text-ink-muted leading-relaxed mb-6 max-w-prose">
              {displayDesc}
            </p>

            {/* Sizes */}
            {product.sizes.length > 0 && (
              <div className="mb-5">
                <p className="text-sm font-medium text-ink mb-2">{t('size')}</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      disabled={!product.available}
                      className={`min-w-[3rem] px-4 py-2.5 text-sm font-medium border rounded-sm transition-all ${
                        selectedSize === size
                          ? 'border-ink bg-ink text-paper'
                          : 'border-line text-ink-soft hover:border-ink'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {product.colors.length > 0 && (
              <div className="mb-5">
                <p className="text-sm font-medium text-ink mb-2">{t('color')}</p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      disabled={!product.available}
                      className={`px-4 py-2.5 text-sm font-medium border rounded-sm transition-all ${
                        selectedColor === color
                          ? 'border-ink bg-ink text-paper'
                          : 'border-line text-ink-soft hover:border-ink'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <p className="text-sm font-medium text-ink mb-2">{t('quantity')}</p>
              <div className="inline-flex items-center border border-line rounded-sm">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={!product.available}
                  className="p-3 text-ink-soft hover:text-ink disabled:opacity-50 transition-colors"
                >
                  <Minus size={16} strokeWidth={1.5} />
                </button>
                <span className="w-12 text-center text-base font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  disabled={!product.available}
                  className="p-3 text-ink-soft hover:text-ink disabled:opacity-50 transition-colors"
                >
                  <Plus size={16} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Actions */}
            {product.available ? (
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 py-4 bg-ink text-paper text-sm font-medium tracking-wide uppercase hover:bg-ink-soft transition-colors rounded-sm"
                >
                  <ShoppingBag size={18} strokeWidth={1.5} />
                  {added ? t('added') : t('addToOrder')}
                </button>
                <button
                  onClick={handleOrderNow}
                  className="flex-1 flex items-center justify-center gap-2 py-4 bg-whatsapp text-white text-sm font-medium tracking-wide uppercase hover:bg-whatsapp-dark transition-colors rounded-sm"
                >
                  <WhatsAppIcon size={18} />
                  {t('orderNow')}
                </button>
              </div>
            ) : (
              <div className="py-4 px-6 bg-paper-dark text-center rounded-sm">
                <p className="text-base font-medium text-stone">{t('unavailable')}</p>
                <p className="text-sm text-stone mt-1">{t('unavailableEn')}</p>
              </div>
            )}


          </div>
        </div>
      </div>

      {showOrderModal && (
        <QuickOrderModal
          product={product}
          size={selectedSize}
          color={selectedColor}
          quantity={quantity}
          onClose={() => setShowOrderModal(false)}
        />
      )}
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
