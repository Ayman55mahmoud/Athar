import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type { Product, CartItem } from '@/types';

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, size: string, color: string, quantity: number) => void;
  removeFromCart: (id: number, size: string, color: string) => void;
  updateQuantity: (id: number, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addToCart = useCallback(
    (product: Product, size: string, color: string, quantity: number) => {
      setItems((prev) => {
        const existing = prev.find(
          (item) =>
            item.product.id === product.id &&
            item.size === size &&
            item.color === color,
        );
        if (existing) {
          return prev.map((item) =>
            item.product.id === product.id &&
            item.size === size &&
            item.color === color
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          );
        }
        return [...prev, { id: product.id, product, size, color, quantity }];
      });
    },
    [],
  );

  const removeFromCart = useCallback(
    (id: number, size: string, color: string) => {
      setItems((prev) =>
        prev.filter(
          (item) =>
            !(item.product.id === id && item.size === size && item.color === color),
        ),
      );
    },
    [],
  );

  const updateQuantity = useCallback(
    (id: number, size: string, color: string, quantity: number) => {
      if (quantity < 1) return;
      setItems((prev) =>
        prev.map((item) =>
          item.product.id === id && item.size === size && item.color === color
            ? { ...item, quantity }
            : item,
        ),
      );
    },
    [],
  );

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
