import { useState, useEffect } from 'react';
import { CartProvider, useCart } from '@/context/CartContext';
import { LangProvider } from '@/context/LangContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import HomePage from '@/pages/HomePage';
import ShopPage from '@/pages/ShopPage';
import ProductPage from '@/pages/ProductPage';
import CheckoutPage from '@/pages/CheckoutPage';
import AboutPage from '@/pages/AboutPage';
import type { Page, Category, Product } from '@/types';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const { closeCart } = useCart();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage, selectedProduct]);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    setSelectedProduct(null);
    setCheckoutOpen(false);
  };

  const handleSelectCategory = (cat: Category) => {
    setSelectedCategory(cat);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
  };

  const handleBackToShop = () => {
    setSelectedProduct(null);
    setCurrentPage('shop');
  };

  const handleCheckout = () => {
    closeCart();
    setCheckoutOpen(true);
  };

  const handleCheckoutBack = () => {
    setCheckoutOpen(false);
    setCurrentPage('shop');
  };

  if (checkoutOpen) {
    return (
      <div className="min-h-screen bg-paper flex flex-col">
        <CheckoutPage onBack={handleCheckoutBack} />
      </div>
    );
  }

  if (currentPage === 'product' && selectedProduct) {
    return (
      <div className="min-h-screen bg-paper flex flex-col">
        <Header
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onSelectCategory={handleSelectCategory}
        />
        <main className="flex-1">
          <ProductPage product={selectedProduct} onBack={handleBackToShop} />
        </main>
        <Footer onNavigate={handleNavigate} onSelectCategory={handleSelectCategory} />
        <CartDrawer onCheckout={handleCheckout} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onSelectCategory={handleSelectCategory}
      />
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onProductClick={handleProductClick}
            onSelectCategory={handleSelectCategory}
          />
        )}
        {currentPage === 'shop' && (
          <ShopPage
            initialCategory={selectedCategory}
            onProductClick={handleProductClick}
          />
        )}
        {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}
      </main>
      <Footer onNavigate={handleNavigate} onSelectCategory={handleSelectCategory} />
      <CartDrawer onCheckout={handleCheckout} />
    </div>
  );
}

export default function App() {
  return (
    <LangProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </LangProvider>
  );
}
