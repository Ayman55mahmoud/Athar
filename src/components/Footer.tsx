import { Facebook, Instagram } from 'lucide-react';
import type { Page, Category } from '@/types';
import { categories } from '@/data/products';
import { useLang } from '@/context/LangContext';
import { socialLinks } from '@/data/translations';

interface FooterProps {
  onNavigate: (page: Page) => void;
  onSelectCategory: (cat: Category) => void;
}

// TikTok icon (not in lucide-react)
function TikTokIcon({ size = 18, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

export default function Footer({ onNavigate, onSelectCategory }: FooterProps) {
  const { t } = useLang();

  const handleCategory = (cat: Category) => {
    onSelectCategory(cat);
    onNavigate('shop');
  };

  const socialIcons: Record<string, React.ReactNode> = {
    facebook: <Facebook size={18} strokeWidth={1.5} />,
    instagram: <Instagram size={18} strokeWidth={1.5} />,
    tiktok: <TikTokIcon size={18} />,
  };

  return (
    <footer className="bg-ink text-paper mt-20">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex flex-col leading-none mb-4">
              <span className="font-serif text-3xl tracking-wide">ATHAR</span>
              <span className="font-arabic text-base text-sand-light tracking-wider mt-1">أثر</span>
            </div>
            <p className="text-sm text-paper/60 leading-relaxed max-w-xs">
              {t('footerTagline')}
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs uppercase tracking-extra-wide text-sand-light mb-4">{t('footerShop')}</h4>
            <ul className="space-y-2.5">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategory(cat)}
                    className="text-sm text-paper/60 hover:text-paper transition-colors"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs uppercase tracking-extra-wide text-sand-light mb-4">{t('explore')}</h4>
            <ul className="space-y-2.5">
              <li><button onClick={() => onNavigate('shop')} className="text-sm text-paper/60 hover:text-paper transition-colors">{t('allProducts')}</button></li>
              <li><button onClick={() => handleCategory('New Arrivals')} className="text-sm text-paper/60 hover:text-paper transition-colors">{t('newArrivals')}</button></li>
              <li><button onClick={() => handleCategory('Offers')} className="text-sm text-paper/60 hover:text-paper transition-colors">{t('offers')}</button></li>
              <li><button onClick={() => onNavigate('about')} className="text-sm text-paper/60 hover:text-paper transition-colors">{t('aboutAthar')}</button></li>
            </ul>
          </div>

          {/* Contact + Social */}
          <div>
            <h4 className="text-xs uppercase tracking-extra-wide text-sand-light mb-4">{t('contact')}</h4>
            <ul className="space-y-2.5 mb-5">
              <li>
                <a href="https://wa.me/201014007217" target="_blank" rel="noopener noreferrer" className="text-sm text-paper/60 hover:text-paper transition-colors">
                  {t('whatsapp')}: 01014007217
                </a>
              </li>
              <li className="text-sm text-paper/60">{t('cairoEgypt')}</li>
              <li className="text-sm text-paper/60">{t('hours')}</li>
            </ul>

            {/* Social links */}
            <div>
              <p className="text-xs uppercase tracking-extra-wide text-sand-light mb-3">{t('followUs')}</p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-paper/20 text-paper/70 hover:text-paper hover:border-paper/60 hover:bg-paper/10 transition-all"
                  >
                    {socialIcons[social.icon]}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-paper/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-paper/40 tracking-wide">
            © {new Date().getFullYear()} ATHAR — أثر. {t('rights')}
          </p>
          <p className="text-xs text-paper/40 tracking-wide">
            {t('ordersViaWhatsapp')}
          </p>
        </div>
      </div>
    </footer>
  );
}
