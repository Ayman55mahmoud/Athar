// Generate a unique order number in the format ATH-0001, ATH-0002, etc.
// Uses localStorage to persist the counter across sessions

let orderCounter = 0;

function loadCounter(): number {
  if (typeof window === 'undefined') return 0;
  const stored = localStorage.getItem('athar_order_counter');
  if (stored) {
    orderCounter = parseInt(stored, 10) || 0;
    return orderCounter;
  }
  return 0;
}

export function generateOrderNumber(): string {
  const current = loadCounter();
  const next = current + 1;
  localStorage.setItem('athar_order_counter', String(next));
  orderCounter = next;
  return `ATH-${String(next).padStart(4, '0')}`;
}

export function getOrderDate(): string {
  const now = new Date();
  return now.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
