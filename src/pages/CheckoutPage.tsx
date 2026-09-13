import { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { useCart } from '@/context/CartContext';
import { useLang } from '@/context/LangContext';
import type { CustomerInfo } from '@/types';
import { calculateCartTotals, formatPrice, getFinalPrice } from '@/utils/pricing';
import { buildWhatsAppMessage, openWhatsApp } from '@/utils/whatsapp';
import { generateOrderNumber, getOrderDate } from '@/utils/order';

interface CheckoutPageProps {
  onBack: () => void;
}

export default function CheckoutPage({ onBack }: CheckoutPageProps) {
  const { items, clearCart } = useCart();
  const { lang, t } = useLang();
  const totals = calculateCartTotals(items);

  const [customer, setCustomer] = useState<CustomerInfo>({
    name: '',
    phone: '',
    address: '',
    city: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmed, setConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [orderDate, setOrderDate] = useState('');

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!customer.name.trim()) newErrors.name = t('nameRequired');
    if (!customer.phone.trim()) newErrors.phone = t('phoneRequired');
    else if (!/^[0-9+\s-]{8,}$/.test(customer.phone.trim())) newErrors.phone = t('phoneInvalid');
    if (!customer.address.trim()) newErrors.address = t('addressRequired');
    if (!customer.city.trim()) newErrors.city = t('cityRequired');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = () => {
    if (!validate()) return;
    const num = generateOrderNumber();
    const date = getOrderDate();
    setOrderNumber(num);
    setOrderDate(date);
    setConfirmed(true);
  };

  const handleSendWhatsApp = () => {
    const message = buildWhatsAppMessage(items, customer);
    openWhatsApp(message);
    clearCart();
  };

  if (items.length === 0 && !confirmed) {
    return (
      <div className="pt-24 lg:pt-28 pb-16">
        <div className="max-w-2xl mx-auto px-4 text-center py-20">
          <p className="text-stone text-lg mb-4">{t('cartEmpty')}</p>
          <button
            onClick={onBack}
            className="text-ink underline underline-offset-4 hover:text-sand-dark transition-colors"
          >
            {t('backToShopShort')}
          </button>
        </div>
      </div>
    );
  }

  if (confirmed) {
    return (
      <div className="pt-24 lg:pt-28 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {/* Success header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-whatsapp rounded-full mb-4">
              <Check size={28} strokeWidth={2} className="text-white" />
            </div>
            <h1 className="font-serif text-3xl tracking-wide text-ink mb-2">{t('orderConfirmed')}</h1>
            <p className="text-sm text-stone">
              {t('order')} <span className="font-semibold text-ink">{orderNumber}</span> · {orderDate}
            </p>
          </div>

          {/* Invoice */}
          <div className="bg-paper-dark/50 border border-line rounded-sm p-6 sm:p-8 mb-6">
            {/* Invoice header */}
            <div className="flex items-center justify-between pb-4 border-b border-line">
              <div className="flex flex-col leading-none">
                <span className="font-serif text-2xl tracking-wide text-ink">ATHAR</span>
                <span className="font-arabic text-sm text-stone tracking-wider mt-0.5">أثر</span>
              </div>
              <div className="text-right">
                <p className="text-xs text-stone">{t('order')}</p>
                <p className="text-sm font-semibold text-ink">{orderNumber}</p>
                <p className="text-xs text-stone mt-1">{orderDate}</p>
              </div>
            </div>

            {/* Items */}
            <div className="py-4 space-y-4">
              {items.map((item) => {
                const finalPrice = getFinalPrice(item.product);
                const lineOriginal = item.product.price * item.quantity;
                const lineFinal = finalPrice * item.quantity;
                const name = lang === 'ar' && item.product.nameAr ? item.product.nameAr : item.product.name;
                return (
                  <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-4">
                    <div className="w-16 h-20 flex-shrink-0 overflow-hidden bg-paper-dark rounded-sm">
                      <img
                        src={item.product.images[0]}
                        alt={name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-ink">{name}</h3>
                      <p className="text-xs text-stone mt-0.5">
                        {t('size')}: {item.size} · {t('color')}: {item.color} · {t('quantity')}: {item.quantity}
                      </p>
                      <div className="flex items-baseline gap-2 mt-1">
                        {item.product.discount > 0 && (
                          <span className="text-xs text-stone line-through">
                            {formatPrice(lineOriginal)}
                          </span>
                        )}
                        <span className="text-sm font-semibold text-ink">
                          {formatPrice(lineFinal)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Totals */}
            <div className="pt-4 border-t border-line space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-stone">{t('subtotal')}</span>
                <span className="text-stone">{formatPrice(totals.originalSubtotal)}</span>
              </div>
              {totals.discountTotal > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-stone">{t('totalDiscount')}</span>
                  <span className="text-sand-dark">-{formatPrice(totals.discountTotal)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-semibold pt-2 border-t border-line">
                <span>{t('TOTAL')}</span>
                <span>{formatPrice(totals.finalTotal)}</span>
              </div>
            </div>

            {/* Customer info */}
            <div className="pt-4 mt-4 border-t border-line">
              <p className="text-xs uppercase tracking-extra-wide text-stone mb-2">{t('customer')}</p>
              <div className="text-sm space-y-1">
                <p><span className="text-stone">{t('name')}:</span> {customer.name}</p>
                <p><span className="text-stone">{t('phone')}:</span> {customer.phone}</p>
                <p><span className="text-stone">{t('address')}:</span> {customer.address}</p>
                <p><span className="text-stone">{t('city')}:</span> {customer.city}</p>
                {customer.notes && <p><span className="text-stone">{t('notes')}:</span> {customer.notes}</p>}
              </div>
            </div>
          </div>

          {/* WhatsApp button */}
          <button
            onClick={handleSendWhatsApp}
            className="w-full flex items-center justify-center gap-3 py-4 bg-whatsapp text-white text-sm font-medium tracking-wide uppercase hover:bg-whatsapp-dark transition-colors rounded-sm"
          >
            <WhatsAppIcon size={20} />
            {t('sendOrderWhatsapp')}
          </button>
          <button
            onClick={onBack}
            className="w-full mt-3 text-center text-sm text-stone hover:text-ink transition-colors"
          >
            {t('continueShopping')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 lg:pt-28 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-stone hover:text-ink transition-colors mb-6"
        >
          <ArrowLeft size={16} strokeWidth={1.5} className="rtl:rotate-180" />
          {t('back')}
        </button>

        <h1 className="font-serif text-3xl lg:text-4xl tracking-wide text-ink mb-8">{t('checkout')}</h1>

        {/* Order summary */}
        <div className="bg-paper-dark/50 border border-line rounded-sm p-5 mb-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink mb-3">{t('orderSummary')}</h2>
          <div className="space-y-2">
            {items.map((item) => {
              const finalPrice = getFinalPrice(item.product);
              const name = lang === 'ar' && item.product.nameAr ? item.product.nameAr : item.product.name;
              return (
                <div
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  className="flex justify-between text-sm"
                >
                  <span className="text-ink-soft">
                    {name} ({item.size}, {item.color}) × {item.quantity}
                  </span>
                  <span className="text-ink font-medium">{formatPrice(finalPrice * item.quantity)}</span>
                </div>
              );
            })}
          </div>
          <div className="pt-3 mt-3 border-t border-line space-y-1">
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
            <div className="flex justify-between text-base font-semibold pt-1">
              <span>{t('total')}</span>
              <span>{formatPrice(totals.finalTotal)}</span>
            </div>
          </div>
        </div>

        {/* Customer form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              {t('fullName')} <span className="text-sand-dark">*</span>
            </label>
            <input
              type="text"
              value={customer.name}
              onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
              placeholder="Ahmed Mohamed"
              className={`w-full px-4 py-3 bg-paper border rounded-sm text-ink placeholder:text-stone/60 focus:outline-none transition-colors ${
                errors.name ? 'border-sand-dark' : 'border-line focus:border-ink'
              }`}
            />
            {errors.name && <p className="text-xs text-sand-dark mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              {t('phoneNumber')} <span className="text-sand-dark">*</span>
            </label>
            <input
              type="tel"
              value={customer.phone}
              onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
              placeholder="01XXXXXXXXX"
              className={`w-full px-4 py-3 bg-paper border rounded-sm text-ink placeholder:text-stone/60 focus:outline-none transition-colors ${
                errors.phone ? 'border-sand-dark' : 'border-line focus:border-ink'
              }`}
            />
            {errors.phone && <p className="text-xs text-sand-dark mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              {t('address')} <span className="text-sand-dark">*</span>
            </label>
            <input
              type="text"
              value={customer.address}
              onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
              placeholder={lang === 'ar' ? 'شارع، مبنى، شقة' : 'Street, building, apartment'}
              className={`w-full px-4 py-3 bg-paper border rounded-sm text-ink placeholder:text-stone/60 focus:outline-none transition-colors ${
                errors.address ? 'border-sand-dark' : 'border-line focus:border-ink'
              }`}
            />
            {errors.address && <p className="text-xs text-sand-dark mt-1">{errors.address}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              {t('city')} <span className="text-sand-dark">*</span>
            </label>
            <input
              type="text"
              value={customer.city}
              onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
              placeholder={lang === 'ar' ? 'القاهرة' : 'Cairo'}
              className={`w-full px-4 py-3 bg-paper border rounded-sm text-ink placeholder:text-stone/60 focus:outline-none transition-colors ${
                errors.city ? 'border-sand-dark' : 'border-line focus:border-ink'
              }`}
            />
            {errors.city && <p className="text-xs text-sand-dark mt-1">{errors.city}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              {t('notes')} <span className="text-stone text-xs">({t('optional')})</span>
            </label>
            <textarea
              value={customer.notes}
              onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
              placeholder={lang === 'ar' ? 'أي معلومات إضافية...' : 'Any additional information...'}
              rows={3}
              className="w-full px-4 py-3 bg-paper border border-line rounded-sm text-ink placeholder:text-stone/60 focus:outline-none focus:border-ink transition-colors resize-none"
            />
          </div>
        </div>

        {/* Confirm */}
        <button
          onClick={handleConfirm}
          className="w-full mt-6 py-4 bg-whatsapp text-white text-sm font-medium tracking-wide uppercase hover:bg-whatsapp-dark transition-colors rounded-sm"
        >
          {t('confirmOrder')}
        </button>
      </div>
    </div>
  );
}
