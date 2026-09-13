// ========================================
// TRANSLATIONS — All UI text lives here in both languages.
// To add a new string: add it to both `en` and `ar` objects below.
// ========================================

export type Lang = 'en' | 'ar';

export const translations = {
  en: {
    // Navigation
    home: 'Home',
    shop: 'Shop',
    offers: 'Offers',
    newArrivals: 'New Arrivals',
    about: 'About',
    categories: 'Categories',

    // Hero
    heroBrand: 'ATHAR',
    heroTaglineEn: 'Style that leaves an',
    heroTaglineAr: 'ستايل يسيب أثر.',
    shopCollection: 'Shop Collection',

    // Brand statement
    brandStatementTitle: 'Premium men\'s fashion, crafted to leave a mark.',
    brandStatementDesc: 'Timeless silhouettes. Premium materials. Minimal design. Each piece is made to be worn, lived in, and remembered.',

    // Home sections
    justIn: 'Just In',
    newArrivalsTitle: 'New Arrivals',
    limitedTime: 'Limited Time',
    offersTitle: 'Offers',
    viewAll: 'View All',
    fullCollectionTitle: 'The Full Collection',
    fullCollectionDesc: 'Explore our complete range of tees, shirts, pants, hoodies, and jackets.',
    shopAll: 'Shop All',

    // Shop page
    collection: 'Collection',
    items: 'items',
    item: 'item',
    noProducts: 'No products found in this category.',

    // Product page
    backToShop: 'Back to Shop',
    size: 'Size',
    color: 'Color',
    quantity: 'Quantity',
    addToOrder: 'Add to Order',
    added: 'Added!',
    orderNow: 'اطلب الآن',
    unavailable: 'غير متوفر حالياً',
    unavailableEn: 'This item is currently out of stock',
    save: 'Save',
    directWhatsapp: 'Or order this item directly via WhatsApp',

    // Cart
    yourOrder: 'Your Order',
    yourCartEmpty: 'Your cart is empty',
    addProductsToStart: 'Add products to start your order',
    remove: 'Remove',
    originalSubtotal: 'Original Subtotal',
    discount: 'Discount',
    total: 'Total',
    proceedToCheckout: 'Proceed to Checkout',

    // Checkout
    checkout: 'Checkout',
    orderSummary: 'Order Summary',
    orderConfirmed: 'Order Confirmed',
    order: 'Order',
    subtotal: 'Subtotal',
    totalDiscount: 'Total Discount',
    TOTAL: 'TOTAL',
    customer: 'Customer',
    name: 'Name',
    phone: 'Phone',
    address: 'Address',
    city: 'City',
    notes: 'Notes',
    optional: 'optional',
    fullName: 'Full Name',
    phoneNumber: 'Phone Number',
    nameRequired: 'Name is required',
    phoneRequired: 'Phone is required',
    phoneInvalid: 'Please enter a valid phone number',
    addressRequired: 'Address is required',
    cityRequired: 'City is required',
    confirmOrder: 'Confirm Order',
    sendOrderWhatsapp: 'Send Order via WhatsApp',
    continueShopping: 'Continue Shopping',
    cartEmpty: 'Your cart is empty.',
    backToShopShort: 'Back to Shop',
    back: 'Back',

    // About page
    aboutAtharTitle: 'The ATHAR Story',
    aboutAtharDesc: 'ATHAR — meaning "impact" or "mark" in Arabic — is a premium men\'s fashion brand born from the belief that what you wear should leave a lasting impression.',
    aboutP1: 'We craft timeless pieces for the modern man — garments that blend contemporary silhouettes with uncompromising quality. Every piece is designed to be worn, lived in, and remembered.',
    aboutP2: 'Our collections are built on a foundation of premium materials, precise tailoring, and a minimalist aesthetic that transcends seasons. We believe in fewer, better pieces — clothing that earns its place in your wardrobe.',
    aboutQuote: '"Style that leaves an أثر."',
    valueQuality: 'Quality',
    valueQualityDesc: 'Premium fabrics and precise construction in every piece.',
    valueMinimal: 'Minimal',
    valueMinimalDesc: 'Clean designs that let the craftsmanship speak for itself.',
    valueEssential: 'Essential',
    valueEssentialDesc: 'Thoughtful wardrobes — fewer pieces, more impact.',
    exploreCollection: 'Explore Collection',

    // Footer
    footerTagline: 'Premium men\'s fashion. Crafted for those who leave a mark.',
    footerShop: 'Shop',
    explore: 'Explore',
    contact: 'Contact',
    allProducts: 'All Products',
    aboutAthar: 'About ATHAR',
    whatsapp: 'WhatsApp',
    cairoEgypt: 'Cairo, Egypt',
    hours: 'Sunday — Friday, 10AM — 8PM',
    rights: 'All rights reserved.',
    ordersViaWhatsapp: 'Orders via WhatsApp · No online payment',
    followUs: 'Follow Us',

    // Product card
    viewProduct: 'View Product',
    new: 'New',
    notAvailable: 'غير متوفر',

    // Language toggle
    switchToArabic: 'العربية',
    switchToEnglish: 'English',
  },
  ar: {
    // Navigation
    home: 'الرئيسية',
    shop: 'المتجر',
    offers: 'العروض',
    newArrivals: 'وصل حديثاً',
    about: 'من نحن',
    categories: 'الأقسام',

    // Hero
    heroBrand: 'أثر',
    heroTaglineEn: 'Style that leaves an',
    heroTaglineAr: 'ستايل يسيب أثر.',
    shopCollection: 'اكتشف المجموعة',

    // Brand statement
    brandStatementTitle: 'أزياء رجالية فاخرة، مصممة لتترك أثراً.',
    brandStatementDesc: 'تصاميم خالدة. خامات فاخرة. تصميم بسيط. كل قطعة مصنوعة لتُلبس وتُعاش وتُتذكر.',

    // Home sections
    justIn: 'وصل حديثاً',
    newArrivalsTitle: 'وصل حديثاً',
    limitedTime: 'لفترة محدودة',
    offersTitle: 'العروض',
    viewAll: 'عرض الكل',
    fullCollectionTitle: 'المجموعة الكاملة',
    fullCollectionDesc: 'اكتشف تشكيلتنا الكاملة من التيشيرتات والقمصان والبنطلونات والهودي والجاكتات.',
    shopAll: 'تسوق الكل',

    // Shop page
    collection: 'المجموعة',
    items: 'منتج',
    item: 'منتج',
    noProducts: 'لا توجد منتجات في هذا القسم.',

    // Product page
    backToShop: 'العودة للمتجر',
    size: 'المقاس',
    color: 'اللون',
    quantity: 'الكمية',
    addToOrder: 'أضف للطلب',
    added: 'تمت الإضافة!',
    orderNow: 'اطلب الآن',
    unavailable: 'غير متوفر حالياً',
    unavailableEn: 'هذا المنتج غير متوفر حالياً',
    save: 'وفّر',
    directWhatsapp: 'أو اطلب هذا المنتج مباشرة عبر واتساب',

    // Cart
    yourOrder: 'طلبك',
    yourCartEmpty: 'سلة المشتريات فارغة',
    addProductsToStart: 'أضف منتجات لبدء طلبك',
    remove: 'حذف',
    originalSubtotal: 'الإجمالي الأصلي',
    discount: 'الخصم',
    total: 'الإجمالي',
    proceedToCheckout: 'إتمام الطلب',

    // Checkout
    checkout: 'إتمام الطلب',
    orderSummary: 'ملخص الطلب',
    orderConfirmed: 'تم تأكيد الطلب',
    order: 'طلب',
    subtotal: 'الإجمالي الفرعي',
    totalDiscount: 'إجمالي الخصم',
    TOTAL: 'الإجمالي',
    customer: 'بيانات العميل',
    name: 'الاسم',
    phone: 'رقم الهاتف',
    address: 'العنوان',
    city: 'المدينة',
    notes: 'ملاحظات',
    optional: 'اختياري',
    fullName: 'الاسم بالكامل',
    phoneNumber: 'رقم الهاتف',
    nameRequired: 'الاسم مطلوب',
    phoneRequired: 'رقم الهاتف مطلوب',
    phoneInvalid: 'يرجى إدخال رقم هاتف صحيح',
    addressRequired: 'العنوان مطلوب',
    cityRequired: 'المدينة مطلوبة',
    confirmOrder: 'تأكيد الطلب',
    sendOrderWhatsapp: 'إرسال الطلب عبر واتساب',
    continueShopping: 'متابعة التسوق',
    cartEmpty: 'سلة المشتريات فارغة.',
    backToShopShort: 'العودة للمتجر',
    back: 'رجوع',

    // About page
    aboutAtharTitle: 'قصة ATHAR',
    aboutAtharDesc: 'ATHAR — تعني "أثر" أو "بصمة" بالعربية — علامة أزياء رجالية فاخرة وُلدت من إيمان بأن ما ترتديه يجب أن يترك انطباعاً يدوم.',
    aboutP1: 'نصنع قطع خالدة للرجل العصري — ملابس تجمع بين التصاميم المعاصرة والجودة التي لا تتنازل. كل قطعة مصممة لتُلبس وتُعاش وتُتذكر.',
    aboutP2: 'تشكيلاتنا مبنية على أساس من الخامات الفاخرة والتفصيل الدقيق والجمال البسيط الذي يتجاوز المواسم. نؤمن بقطع أقل، أفضل — ملابس تستحق مكانها في خزانتك.',
    aboutQuote: '"ستايل يسيب أثر."',
    valueQuality: 'الجودة',
    valueQualityDesc: 'خامات فاخرة وتفصيل دقيق في كل قطعة.',
    valueMinimal: 'بسيط',
    valueMinimalDesc: 'تصاميم نظيفة تترك للإتقان أن يتحدث عن نفسه.',
    valueEssential: 'أساسي',
    valueEssentialDesc: 'خزائن مدروسة — قطع أقل، تأثير أكبر.',
    exploreCollection: 'اكتشف المجموعة',

    // Footer
    footerTagline: 'أزياء رجالية فاخرة. مصنوعة لمن يتركون أثراً.',
    footerShop: 'المتجر',
    explore: 'استكشف',
    contact: 'تواصل معنا',
    allProducts: 'كل المنتجات',
    aboutAthar: 'عن ATHAR',
    whatsapp: 'واتساب',
    cairoEgypt: 'القاهرة، مصر',
    hours: 'الأحد — الجمعة، 10ص — 8م',
    rights: 'جميع الحقوق محفوظة.',
    ordersViaWhatsapp: 'الطلبات عبر واتساب · لا يوجد دفع إلكتروني',
    followUs: 'تابعنا',

    // Product card
    viewProduct: 'عرض المنتج',
    new: 'جديد',
    notAvailable: 'غير متوفر',

    // Language toggle
    switchToArabic: 'العربية',
    switchToEnglish: 'English',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

// ========================================
// SOCIAL MEDIA LINKS — Edit these to change your social links
// ========================================
export const socialLinks = [
  { name: 'Facebook', url: 'https://facebook.com/athar', icon: 'facebook' },
  { name: 'Instagram', url: 'https://instagram.com/athar', icon: 'instagram' },
  { name: 'TikTok', url: 'https://tiktok.com/@athar', icon: 'tiktok' },
];
