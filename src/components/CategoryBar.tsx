import type { Category } from '@/types';
import { categories } from '@/data/products';
import { useLang } from '@/context/LangContext';

interface CategoryBarProps {
  selected: Category;
  onSelect: (cat: Category) => void;
}

const categoryAr: Record<string, string> = {
  'All': 'الكل',
  'T-Shirts': 'تيشيرتات',
  'Shirts': 'قمصان',
  'Pants': 'بنطلونات',
  'Hoodies': 'هودي',
  'Jackets': 'جاكتات',
  'New Arrivals': 'وصل حديثاً',
  'Offers': 'العروض',
};

export default function CategoryBar({ selected, onSelect }: CategoryBarProps) {
  const { lang } = useLang();

  return (
    <div className="no-scrollbar overflow-x-auto -mx-4 px-4">
      <div className="flex gap-2 min-w-max pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`px-5 py-2.5 text-sm font-medium tracking-wide rounded-full whitespace-nowrap transition-all duration-200 ${
              selected === cat
                ? 'bg-ink text-paper'
                : 'bg-paper-dark text-ink-soft hover:bg-sand hover:text-ink'
            }`}
          >
            {lang === 'ar' ? categoryAr[cat] : cat}
          </button>
        ))}
      </div>
    </div>
  );
}
