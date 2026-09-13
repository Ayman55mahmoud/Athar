import type { CartItem, CustomerInfo } from '@/types';
import { getFinalPrice, getDiscountAmount, formatPrice } from './pricing';
import { generateOrderNumber, getOrderDate } from './order';

// The WhatsApp number in international format (without + or spaces)
export const WHATSAPP_NUMBER = '201014007217';

// Build the full WhatsApp message from the cart and customer info
export function buildWhatsAppMessage(
  items: CartItem[],
  customer: CustomerInfo,
): string {
  const orderNumber = generateOrderNumber();
  const date = getOrderDate();

  let originalSubtotal = 0;
  let discountTotal = 0;

  let message = `طلب جديد — ATHAR\n\n`;
  message += `━━━━━━━━━━━━━━\n`;
  message += `Order: ${orderNumber}\n`;
  message += `Date: ${date}\n`;
  message += `━━━━━━━━━━━━━━\n\n`;
  message += `المنتجات:\n\n`;

  items.forEach((item, index) => {
    const finalPrice = getFinalPrice(item.product);
    const discountAmount = getDiscountAmount(item.product);
    const lineOriginal = item.product.price * item.quantity;
    const lineFinal = finalPrice * item.quantity;

    originalSubtotal += lineOriginal;
    discountTotal += lineOriginal - lineFinal;

    message += `${index + 1}. ${item.product.name}\n`;
    message += `المقاس: ${item.size}\n`;
    message += `اللون: ${item.color}\n`;
    message += `الكمية: ${item.quantity}\n`;
    message += `السعر: ${formatPrice(item.product.price)}\n`;
    if (item.product.discount > 0) {
      message += `الخصم: ${item.product.discount}% (${formatPrice(discountAmount)})\n`;
    }
    message += `السعر بعد الخصم: ${formatPrice(finalPrice)}\n\n`;
  });

  message += `━━━━━━━━━━━━━━\n\n`;
  message += `الإجمالي الأصلي: ${formatPrice(originalSubtotal)}\n`;
  message += `إجمالي الخصم: ${formatPrice(discountTotal)}\n`;
  message += `الإجمالي النهائي: ${formatPrice(originalSubtotal - discountTotal)}\n\n`;
  message += `━━━━━━━━━━━━━━\n\n`;
  message += `بيانات العميل:\n\n`;
  message += `الاسم: ${customer.name}\n`;
  message += `رقم الهاتف: ${customer.phone}\n`;
  message += `العنوان: ${customer.address}\n`;
  message += `المدينة: ${customer.city}\n`;
  if (customer.notes && customer.notes.trim()) {
    message += `ملاحظات: ${customer.notes}\n`;
  }

  return message;
}

// Open WhatsApp with the pre-filled message
export function openWhatsApp(message: string) {
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
  window.open(url, '_blank');
}
