import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLang } from '@/context/LangContext';
import { calculateCartTotals, formatPrice, getFinalPrice } from '@/utils/pricing';

interface CartDrawerProps {
  onCheckout: () => void;
}

export default function CartDrawer({ onCheckout }: CartDrawerProps) {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity } = useCart();
  const { lang, t } = useLang();
  const totals = calculateCartTotals(items);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm animate-fade-in"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-paper flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-line">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} strokeWidth={1.5} className="text-ink" />
            <h2 className="text-base font-semibold tracking-wide">{t('yourOrder')}</h2>
            <span className="text-sm text-stone">({items.length})</span>
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-ink hover:text-sand-dark transition-colors"
            aria-label="Close cart"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} strokeWidth={1} className="text-stone mb-4" />
              <p className="text-stone text-lg mb-1">{t('yourCartEmpty')}</p>
              <p className="text-sm text-stone">{t('addProductsToStart')}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                const finalPrice = getFinalPrice(item.product);
                const name = lang === 'ar' && item.product.nameAr ? item.product.nameAr : item.product.name;
                return (
                  <div
                    key={`${item.product.id}-${item.size}-${item.color}`}
                    className="flex gap-4 pb-4 border-b border-line last:border-0"
                  >
                    {/* Image */}
                    <div className="w-20 h-24 flex-shrink-0 overflow-hidden bg-paper-dark rounded-sm">
                      <img
                        src={item.product.images[0]}
                        alt={name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-ink line-clamp-1">{name}</h3>
                      <p className="text-xs text-stone mt-0.5">
                        {t('size')}: {item.size} · {t('color')}: {item.color}
                      </p>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-sm font-semibold text-ink">{formatPrice(finalPrice)}</span>
                        {item.product.discount > 0 && (
                          <span className="text-xs text-stone line-through">
                            {formatPrice(item.product.price)}
                          </span>
                        )}
                      </div>

                      {/* Quantity + Remove */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="inline-flex items-center border border-line rounded-sm">
                          <button
                            onClick={() =>
                              item.quantity > 1
                                ? updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)
                                : removeFromCart(item.product.id, item.size, item.color)
                            }
                            className="p-1.5 text-ink-soft hover:text-ink transition-colors"
                          >
                            {item.quantity > 1 ? (
                              <Minus size={14} strokeWidth={1.5} />
                            ) : (
                              <Trash2 size={14} strokeWidth={1.5} />
                            )}
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                            className="p-1.5 text-ink-soft hover:text-ink transition-colors"
                          >
                            <Plus size={14} strokeWidth={1.5} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                          className="text-xs text-stone hover:text-ink transition-colors"
                        >
                          {t('remove')}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-line px-6 py-5 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-stone">{t('originalSubtotal')}</span>
              <span className="text-stone">{formatPrice(totals.originalSubtotal)}</span>
            </div>
            {totals.discountTotal > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-stone">{t('discount')}</span>
                <span className="text-sand-dark">-{formatPrice(totals.discountTotal)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-semibold pt-2 border-t border-line">
              <span>{t('total')}</span>
              <span>{formatPrice(totals.finalTotal)}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full py-4 bg-whatsapp text-white text-sm font-medium tracking-wide uppercase hover:bg-whatsapp-dark transition-colors rounded-sm mt-2"
            >
              {t('proceedToCheckout')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
