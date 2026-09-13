import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Globe } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLang } from '@/context/LangContext';
import type { Page, Category } from '@/types';
import { categories } from '@/data/products';
import type { TranslationKey } from '@/data/translations';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onSelectCategory: (cat: Category) => void;
}

export default function Header({ currentPage, onNavigate, onSelectCategory }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems, openCart } = useCart();
  const { lang, t, toggleLang } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (page: Page) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  const handleCategory = (cat: Category) => {
    onSelectCategory(cat);
    onNavigate('shop');
    setMobileOpen(false);
  };

  const navItems: { label: TranslationKey; action: () => void }[] = [
    { label: 'home', action: () => handleNav('home') },
    { label: 'shop', action: () => handleNav('shop') },
    { label: 'offers', action: () => handleCategory('Offers') },
    { label: 'newArrivals', action: () => handleCategory('New Arrivals') },
    { label: 'about', action: () => handleNav('about') },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-paper/95 backdrop-blur-md border-b border-line'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 -ml-2 text-ink hover:text-sand-dark transition-colors"
              aria-label="Open menu"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>

            {/* Logo */}
            <button
              onClick={() => handleNav('home')}
              className="flex flex-col items-center lg:items-start leading-none group"
            >
              <span className="font-serif text-2xl lg:text-3xl tracking-wide text-ink group-hover:text-sand-dark transition-colors">
                ATHAR
              </span>
              <span className="font-arabic text-xs lg:text-sm text-stone tracking-wider -mt-0.5">
                أثر
              </span>
            </button>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="text-sm font-medium tracking-wide text-ink-soft hover:text-sand-dark transition-colors relative group"
                >
                  {t(item.label)}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-sand-dark group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </nav>

            {/* Right side: lang toggle + cart */}
            <div className="flex items-center gap-1">
              <button
                onClick={toggleLang}
                className="flex items-center gap-1.5 px-2.5 py-2 text-ink hover:text-sand-dark transition-colors"
                aria-label="Toggle language"
              >
                <Globe size={18} strokeWidth={1.5} />
                <span className="text-xs font-medium tracking-wide hidden sm:inline">
                  {lang === 'en' ? 'ع' : 'EN'}
                </span>
              </button>
              <button
                onClick={openCart}
                className="relative p-2 text-ink hover:text-sand-dark transition-colors"
                aria-label="Open cart"
              >
                <ShoppingBag size={22} strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-ink text-paper text-[10px] font-semibold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-0 left-0 bottom-0 w-80 max-w-[85%] bg-paper animate-slide-in-right flex flex-col">
            <div className="flex items-center justify-between px-6 h-16 border-b border-line">
              <div className="flex flex-col leading-none">
                <span className="font-serif text-2xl tracking-wide text-ink">ATHAR</span>
                <span className="font-arabic text-xs text-stone tracking-wider">أثر</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-ink hover:text-sand-dark transition-colors"
                aria-label="Close menu"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex flex-col px-6 py-4 gap-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="text-left py-3 text-base font-medium text-ink-soft hover:text-sand-dark hover:bg-paper-dark px-3 rounded transition-colors"
                >
                  {t(item.label)}
                </button>
              ))}
            </nav>
            <div className="px-6 py-4 border-t border-line">
              <p className="text-xs uppercase tracking-extra-wide text-stone mb-3">{t('categories')}</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategory(cat)}
                    className="px-3 py-1.5 text-sm text-ink-soft bg-paper-dark rounded-full hover:bg-sand hover:text-ink transition-colors"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
