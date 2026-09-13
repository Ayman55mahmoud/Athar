import type { Product, Category } from '@/types';

// ========================================
// CATEGORIES — Edit this list to add/remove categories
// Products are automatically filtered by their `category` field.
// "New Arrivals" shows products with isNew: true
// "Offers" shows products with discount > 0
// ========================================
export const categories: Category[] = [
  'All',
  'T-Shirts',
  'Shirts',
  'Pants',
  'Hoodies',
  'Jackets',
  'New Arrivals',
  'Offers',
];

// ========================================
// ADD / EDIT PRODUCTS HERE
// ========================================
// To add a product: copy one object below, paste, and change the values.
// To delete a product: remove its object, or set available: false.
// To change a price: edit the `price` number.
// To change a discount: edit the `discount` number (percentage, e.g. 20 = 20%).
// To change an image: replace the URLs in the `images` array.
// To mark as new arrival: set isNew: true.
// To mark as unavailable: set available: false.
// ========================================

export const products: Product[] = [
  {
    id: 1,
    name: 'Essential Black Tee',
    nameAr: 'تيشيرت أسود أساسي',
    category: 'T-Shirts',
    description:
      'Premium heavyweight cotton tee with a structured fit. Designed for everyday wear with a clean, minimal silhouette that holds its shape wash after wash.',
    descriptionAr: 'تيشيرت قطن ثقيل عالي الجودة بقصة مُنظمة. مصمم للاستخدام اليومي بسيلويت نظيف وبسيط.',
    price: 650,
    discount: 0,
    images: [
      'https://images.pexels.com/photos/7658459/pexels-photo-7658459.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3290886/pexels-photo-3290886.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black'],
    available: true,
    isNew: true,
  },
  {
    id: 2,
    name: 'Oversized Cream Tee',
    nameAr: 'تيشيرت كريم أوفر سايز',
    category: 'T-Shirts',
    description:
      'Relaxed oversized fit in soft cream cotton. Drop-shoulder construction with a slightly cropped body for a contemporary streetwear silhouette.',
    descriptionAr: 'قصة أوفر سايز مريحة من القطن الناعم الكريمي. بنية كتف منسدل وجسم مُقصّر قليلاً.',
    price: 720,
    discount: 15,
    images: [
      'https://images.pexels.com/photos/9775825/pexels-photo-9775825.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/18394309/pexels-photo-18394309.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    sizes: ['M', 'L', 'XL'],
    colors: ['Cream', 'White'],
    available: true,
  },
  {
    id: 3,
    name: 'Classic Oxford Shirt',
    nameAr: 'قميص أكسفورد كلاسيك',
    category: 'Shirts',
    description:
      'Timeless Oxford weave shirt with a button-down collar. Tailored from breathable cotton that transitions seamlessly from casual to smart occasions.',
    descriptionAr: 'قميص أكسفورد خالد بياقة زرّية. مصنوع من قطن قابل للتنفس يناسب الإطلالات الكاجوال والرسمية.',
    price: 1100,
    discount: 20,
    images: [
      'https://images.pexels.com/photos/31618286/pexels-photo-31618286.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/19895835/pexels-photo-19895835.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Blue', 'Sand'],
    available: true,
  },
  {
    id: 4,
    name: 'Relaxed Fit Pants',
    nameAr: 'بنطلون قصة مريحة',
    category: 'Pants',
    description:
      'Relaxed-leg trousers in a structured cotton blend. Mid-rise waist with a clean drape — versatile enough for both smart and casual styling.',
    descriptionAr: 'بنطلون قصة مريحة من خليط قطني مُنظّم. خصر متوسط الارتفاع وانسيابية نظيفة.',
    price: 950,
    discount: 0,
    images: [
      'https://images.pexels.com/photos/16238583/pexels-photo-16238583.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6207132/pexels-photo-6207132.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    sizes: ['30', '32', '34', '36'],
    colors: ['Beige', 'Black', 'Olive'],
    available: true,
    isNew: true,
  },
  {
    id: 5,
    name: 'Signature Hoodie',
    nameAr: 'هودي سيجنتشر',
    category: 'Hoodies',
    description:
      'Heavyweight fleece hoodie with a brushed interior for warmth and softness. Features a relaxed fit, adjustable hood, and subtle ATHAR branding.',
    descriptionAr: 'هودي قطن ثقيل ببطانة دافئة. قصة مريحة وقلنسوة قابلة للتعديل وعلامة ATHAR خفيفة.',
    price: 1350,
    discount: 25,
    images: [
      'https://images.pexels.com/photos/14241847/pexels-photo-14241847.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/32321512/pexels-photo-32321512.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Stone'],
    available: true,
  },
  {
    id: 6,
    name: 'Essential Overshirt',
    nameAr: 'أوفرشيرت أساسي',
    category: 'Jackets',
    description:
      'Versatile overshirt cut from a structured cotton-linen blend. Designed to layer over tees or under coats — a year-round wardrobe staple.',
    descriptionAr: 'أوفرشيرت متعدد الاستخدام من خليط قطن وكتان. مصمم للطبقات فوق التيشيرت أو تحت المعاطف.',
    price: 1450,
    discount: 10,
    images: [
      'https://images.pexels.com/photos/18864127/pexels-photo-18864127.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/16964407/pexels-photo-16964407.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    sizes: ['M', 'L', 'XL'],
    colors: ['Sand', 'Olive', 'Black'],
    available: true,
  },
  {
    id: 7,
    name: 'Structured Linen Shirt',
    nameAr: 'قميص كتان مُنظّم',
    category: 'Shirts',
    description:
      'Lightweight linen shirt with a refined open-collar. Breathable and effortlessly elegant — built for warm days and layered evenings alike.',
    descriptionAr: 'قميص كتان خفيف بياقة مفتوحة أنيقة. قابل للتنفس وأنيق بلا مجهود.',
    price: 980,
    discount: 0,
    images: [
      'https://images.pexels.com/photos/5762999/pexels-photo-5762999.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/19189138/pexels-photo-19189138.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Sand', 'White'],
    available: true,
    isNew: true,
  },
  {
    id: 8,
    name: 'Tech Cargo Pants',
    nameAr: 'بنطلون كارجو تقني',
    category: 'Pants',
    description:
      'Modern cargo pants with a tapered leg and functional pocket design. Crafted from durable tech fabric with a matte finish for a utilitarian edge.',
    descriptionAr: 'بنطلون كارجو عصري بساق مُدبّق وتصميم جيوب عملي. من قماش تقني متين بلمسة مطفية.',
    price: 1050,
    discount: 30,
    images: [
      'https://images.pexels.com/photos/2897533/pexels-photo-2897533.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/9464625/pexels-photo-9464625.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    sizes: ['30', '32', '34', '36'],
    colors: ['Black', 'Olive'],
    available: true,
  },
];

// ========================================
// Helper functions — no need to edit these
// ========================================

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: Category): Product[] {
  if (category === 'All') return products.filter((p) => p.available);
  if (category === 'New Arrivals')
    return products.filter((p) => p.available && p.isNew);
  if (category === 'Offers')
    return products.filter((p) => p.available && p.discount > 0);
  return products.filter((p) => p.available && p.category === category);
}
