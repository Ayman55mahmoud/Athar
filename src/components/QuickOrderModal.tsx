import { useState } from 'react';
import { X, Check } from 'lucide-react';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import type { Product, CustomerInfo } from '@/types';
import { useLang } from '@/context/LangContext';
import {
  getFinalPrice,
  getDiscountAmount,
  formatPrice,
} from '@/utils/pricing';
import { buildWhatsAppMessage, openWhatsApp } from '@/utils/whatsapp';
import { generateOrderNumber, getOrderDate } from '@/utils/order';

interface QuickOrderModalProps {
  product: Product;
  size: string;
  color: string;
  quantity: number;
  onClose: () => void;
}

export default function QuickOrderModal({
  product,
  size,
  color,
  quantity,
  onClose,
}: QuickOrderModalProps) {
  const { lang, t } = useLang();
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

  const finalPrice = getFinalPrice(product);
  const discountAmount = getDiscountAmount(product);
  const onSale = product.discount > 0;
  const lineOriginal = product.price * quantity;
  const lineFinal = finalPrice * quantity;

  const displayName = lang === 'ar' && product.nameAr ? product.nameAr : product.name;

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!customer.name.trim()) newErrors.name = t('nameRequired');
    if (!customer.phone.trim()) newErrors.phone = t('phoneRequired');
    else if (!/^[0-9+\s-]{8,}$/.test(customer.phone.trim()))
      newErrors.phone = t('phoneInvalid');
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
    const cartItem = {
      id: product.id,
      product,
      size,
      color,
      quantity,
    };
    const message = buildWhatsAppMessage([cartItem], customer);
    openWhatsApp(message);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-paper rounded-sm animate-scale-in">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-paper border-b border-line">
          <h2 className="font-serif text-xl tracking-wide text-ink">
            {confirmed ? t('orderConfirmed') : t('orderNow')}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-ink hover:text-sand-dark transition-colors"
            aria-label="Close"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className="px-6 py-5">
          {confirmed ? (
            <>
              {/* Success check */}
              <div className="text-center mb-5">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-whatsapp rounded-full mb-3">
                  <Check size={26} strokeWidth={2} className="text-white" />
                </div>
                <p className="text-sm text-stone">
                  {t('order')} <span className="font-semibold text-ink">{orderNumber}</span> · {orderDate}
                </p>
              </div>

              {/* Invoice */}
              <div className="border border-line rounded-sm p-4 mb-5 bg-paper-dark/40">
                {/* Product */}
                <div className="flex gap-3 pb-3 border-b border-line">
                  <div className="w-16 h-20 flex-shrink-0 overflow-hidden bg-paper-dark rounded-sm">
                    <img
                      src={product.images[0]}
                      alt={displayName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-ink">{displayName}</h3>
                    <p className="text-xs text-stone mt-0.5">
                      {t('size')}: {size} · {t('color')}: {color} · {t('quantity')}: {quantity}
                    </p>
                    <div className="flex items-baseline gap-2 mt-1">
                      {onSale && (
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

                {/* Totals */}
                <div className="pt-3 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-stone">{t('subtotal')}</span>
                    <span className="text-stone">{formatPrice(lineOriginal)}</span>
                  </div>
                  {onSale && (
                    <div className="flex justify-between text-sm">
                      <span className="text-stone">{t('totalDiscount')}</span>
                      <span className="text-sand-dark">-{formatPrice(discountAmount * quantity)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-semibold pt-1 border-t border-line">
                    <span>{t('TOTAL')}</span>
                    <span>{formatPrice(lineFinal)}</span>
                  </div>
                </div>

                {/* Customer */}
                <div className="pt-3 mt-3 border-t border-line">
                  <p className="text-xs uppercase tracking-extra-wide text-stone mb-1.5">{t('customer')}</p>
                  <div className="text-sm space-y-0.5">
                    <p><span className="text-stone">{t('name')}:</span> {customer.name}</p>
                    <p><span className="text-stone">{t('phone')}:</span> {customer.phone}</p>
                    <p><span className="text-stone">{t('address')}:</span> {customer.address}</p>
                    <p><span className="text-stone">{t('city')}:</span> {customer.city}</p>
                    {customer.notes && <p><span className="text-stone">{t('notes')}:</span> {customer.notes}</p>}
                  </div>
                </div>
              </div>

              {/* WhatsApp send button */}
              <button
                onClick={handleSendWhatsApp}
                className="w-full flex items-center justify-center gap-3 py-4 bg-whatsapp text-white text-sm font-medium tracking-wide uppercase hover:bg-whatsapp-dark transition-colors rounded-sm"
              >
                <WhatsAppIcon size={20} />
                {t('sendOrderWhatsapp')}
              </button>
            </>
          ) : (
            <>
              {/* Product summary */}
              <div className="flex gap-3 pb-4 mb-4 border-b border-line">
                <div className="w-16 h-20 flex-shrink-0 overflow-hidden bg-paper-dark rounded-sm">
                  <img
                    src={product.images[0]}
                    alt={displayName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-ink">{displayName}</h3>
                  <p className="text-xs text-stone mt-0.5">
                    {t('size')}: {size} · {t('color')}: {color} · {t('quantity')}: {quantity}
                  </p>
                  <div className="flex items-baseline gap-2 mt-1">
                    {onSale && (
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

              {/* Customer form */}
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-ink mb-1">
                    {t('fullName')} <span className="text-sand-dark">*</span>
                  </label>
                  <input
                    type="text"
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    placeholder="Ahmed Mohamed"
                    className={`w-full px-4 py-2.5 bg-paper border rounded-sm text-ink placeholder:text-stone/60 focus:outline-none transition-colors ${
                      errors.name ? 'border-sand-dark' : 'border-line focus:border-ink'
                    }`}
                  />
                  {errors.name && <p className="text-xs text-sand-dark mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink mb-1">
                    {t('phoneNumber')} <span className="text-sand-dark">*</span>
                  </label>
                  <input
                    type="tel"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    placeholder="01XXXXXXXXX"
                    className={`w-full px-4 py-2.5 bg-paper border rounded-sm text-ink placeholder:text-stone/60 focus:outline-none transition-colors ${
                      errors.phone ? 'border-sand-dark' : 'border-line focus:border-ink'
                    }`}
                  />
                  {errors.phone && <p className="text-xs text-sand-dark mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink mb-1">
                    {t('address')} <span className="text-sand-dark">*</span>
                  </label>
                  <input
                    type="text"
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    placeholder={lang === 'ar' ? 'شارع، مبنى، شقة' : 'Street, building, apartment'}
                    className={`w-full px-4 py-2.5 bg-paper border rounded-sm text-ink placeholder:text-stone/60 focus:outline-none transition-colors ${
                      errors.address ? 'border-sand-dark' : 'border-line focus:border-ink'
                    }`}
                  />
                  {errors.address && <p className="text-xs text-sand-dark mt-1">{errors.address}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink mb-1">
                    {t('city')} <span className="text-sand-dark">*</span>
                  </label>
                  <input
                    type="text"
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    placeholder={lang === 'ar' ? 'القاهرة' : 'Cairo'}
                    className={`w-full px-4 py-2.5 bg-paper border rounded-sm text-ink placeholder:text-stone/60 focus:outline-none transition-colors ${
                      errors.city ? 'border-sand-dark' : 'border-line focus:border-ink'
                    }`}
                  />
                  {errors.city && <p className="text-xs text-sand-dark mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink mb-1">
                    {t('notes')} <span className="text-stone text-xs">({t('optional')})</span>
                  </label>
                  <textarea
                    value={customer.notes}
                    onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                    placeholder={lang === 'ar' ? 'أي معلومات إضافية...' : 'Any additional information...'}
                    rows={2}
                    className="w-full px-4 py-2.5 bg-paper border border-line rounded-sm text-ink placeholder:text-stone/60 focus:outline-none focus:border-ink transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Confirm button */}
              <button
                onClick={handleConfirm}
                className="w-full mt-5 flex items-center justify-center gap-2 py-4 bg-whatsapp text-white text-sm font-medium tracking-wide uppercase hover:bg-whatsapp-dark transition-colors rounded-sm"
              >
                <WhatsAppIcon size={18} />
                {t('confirmOrder')}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
