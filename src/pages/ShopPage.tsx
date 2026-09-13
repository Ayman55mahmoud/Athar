import { useState, useMemo } from 'react';
import type { Category, Product } from '@/types';
import { getProductsByCategory } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import CategoryBar from '@/components/CategoryBar';
import { useLang } from '@/context/LangContext';

interface ShopPageProps {
  initialCategory?: Category;
  onProductClick: (product: Product) => void;
}

export default function ShopPage({ initialCategory = 'All', onProductClick }: ShopPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>(initialCategory);
  const { t } = useLang();

  const filteredProducts = useMemo(
    () => getProductsByCategory(selectedCategory),
    [selectedCategory],
  );

  const titleKey = selectedCategory === 'All' ? 'collection' : selectedCategory.toLowerCase().replace(/\s/g, '') as never;

  return (
    <div className="pt-24 lg:pt-28 pb-16">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="mb-8 lg:mb-10">
          <h1 className="font-serif text-4xl lg:text-5xl tracking-wide text-ink mb-2">
            {selectedCategory === 'All' ? t('collection') : selectedCategory}
          </h1>
          <p className="text-sm text-stone tracking-wide">
            {filteredProducts.length} {filteredProducts.length === 1 ? t('item') : t('items')}
          </p>
        </div>

        {/* Categories */}
        <div className="mb-8 lg:mb-10">
          <CategoryBar selected={selectedCategory} onSelect={setSelectedCategory} />
        </div>

        {/* Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 stagger">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => onProductClick(product)}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-stone text-lg">{t('noProducts')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
