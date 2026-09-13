import type { Product, CartItem } from '@/types';

// Calculate the final price after discount
// Formula: originalPrice - (originalPrice * discount / 100)
export function getFinalPrice(product: Product): number {
  return Math.round(product.price - (product.price * product.discount) / 100);
}

// Get the discount amount in currency
export function getDiscountAmount(product: Product): number {
  return Math.round((product.price * product.discount) / 100);
}

// Check if a product has a discount
export function hasDiscount(product: Product): boolean {
  return product.discount > 0;
}

// Format price as EGP
export function formatPrice(amount: number): string {
  return `${amount.toLocaleString('en-US')} EGP`;
}

// Calculate cart totals
export function calculateCartTotals(items: CartItem[]) {
  let originalSubtotal = 0;
  let discountTotal = 0;

  for (const item of items) {
    const itemOriginal = item.product.price * item.quantity;
    const itemFinal = getFinalPrice(item.product) * item.quantity;
    originalSubtotal += itemOriginal;
    discountTotal += itemOriginal - itemFinal;
  }

  const finalTotal = originalSubtotal - discountTotal;

  return {
    originalSubtotal,
    discountTotal,
    finalTotal,
  };
}
