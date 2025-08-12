import { createContext, useContext, useState, useEffect } from 'react';

const I18nContext = createContext();

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.collections': 'Collections',
    'nav.about': 'Our Story',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.profile': 'Profile',
    'nav.cart': 'Cart',
    'nav.logout': 'Logout',
    
    // Home page
    'home.hero.title': 'Welcome to Rosellea',
    'home.hero.subtitle': 'Boutique Elegance Redefined',
    'home.hero.description': 'Discover exquisite pieces that embody grace and sophistication, crafted for the woman who appreciates timeless French elegance',
    'home.hero.cta': 'Explore Collection',
    'home.collections.title': 'Curated Collections',
    'home.collections.subtitle': 'Each piece tells a story of timeless elegance and modern sophistication',
    'home.arrivals.title': 'New Arrivals',
    'home.arrivals.subtitle': 'Fresh from our atelier, each piece embodies the essence of timeless beauty',
    'home.error.title': 'Error Loading Products',
    'home.error.retry': 'Please check your internet connection and try again.',
    'home.coming.title': 'New Collections Coming Soon',
    'home.coming.subtitle': 'We\'re preparing something special for you. Check back soon!',
    
    // Product
    'product.addToCart': 'Add to Collection',
    'product.adding': 'Adding...',
    'product.added': 'added to your collection',
    'product.error': 'Failed to add item to cart',
    'product.unavailable': 'Product information unavailable',
    'product.untitled': 'Untitled Product',
    'product.description.default': 'Elegant piece crafted with attention to detail',
    
    // Cart
    'cart.empty': 'Your cart is empty',
    'cart.total': 'Total',
    'cart.checkout': 'Proceed to Checkout',
    'cart.remove': 'Remove',
    'cart.update': 'Update',
    'cart.clear': 'Clear Cart',
    
    // Auth
    'auth.login.title': 'Welcome Back',
    'auth.login.subtitle': 'Sign in to your account',
    'auth.register.title': 'Create Account',
    'auth.register.subtitle': 'Join our exclusive community',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.firstName': 'First Name',
    'auth.lastName': 'Last Name',
    'auth.login.button': 'Sign In',
    'auth.register.button': 'Create Account',
    'auth.forgotPassword': 'Forgot Password?',
    'auth.noAccount': 'Don\'t have an account?',
    'auth.hasAccount': 'Already have an account?',
    'auth.signUp': 'Sign Up',
    'auth.signIn': 'Sign In',
    
    // Profile
    'profile.title': 'My Profile',
    'profile.personalInfo': 'Personal Information',
    'profile.orderHistory': 'Order History',
    'profile.preferences': 'Preferences',
    'profile.save': 'Save Changes',
    'profile.cancel': 'Cancel',
    
    // Footer
    'footer.newsletter.title': 'Stay Updated',
    'footer.newsletter.subtitle': 'Subscribe to our newsletter for exclusive offers',
    'footer.newsletter.placeholder': 'Enter your email',
    'footer.newsletter.subscribe': 'Subscribe',
    'footer.copyright': 'Made with 💜 and ✨ for timeless elegance everywhere',
    
    // Collections
    'collections.title': 'Our Collections',
    'collections.subtitle': 'Discover timeless pieces crafted with passion and attention to detail',
    'collections.all': 'All Collections',
    'collections.dresses': 'Dresses',
    'collections.tops': 'Tops',
    'collections.pants': 'Bottoms',
    'collections.sort.newest': 'Newest',
    'collections.sort.priceLow': 'Price: Low to High',
    'collections.sort.priceHigh': 'Price: High to Low',
    'collections.sort.name': 'Name A-Z',
    'collections.priceRange': 'Price Range',
    'collections.minPrice': 'Min',
    'collections.maxPrice': 'Max',
    'collections.clear': 'Clear',
    'collections.showing': 'Showing',
    'collections.products': 'products',
    'collections.noProducts': 'No Products Found',
    'collections.noProductsDesc': 'We\'re adding new pieces to this collection. Check back soon!',
    'collections.error.title': 'Error Loading Products',
    
    // Testimonials
    'testimonials.title': 'What Our Muses Say',
    'testimonials.subtitle': 'Stories from women who embrace boutique elegance',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.retry': 'Try Again',
    'common.close': 'Close',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.price': 'Price',
    'common.size': 'Size',
    'common.color': 'Color',
    'common.quantity': 'Quantity',
    
    // Notifications
    'notification.success': 'Success!',
    'notification.error': 'Error!',
    'notification.warning': 'Warning!',
    'notification.info': 'Info',
    
    // 404
    'notFound.title': 'Page Not Found',
    'notFound.subtitle': 'The page you\'re looking for doesn\'t exist.',
    'notFound.home': 'Return Home'
  },
  
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.collections': 'Collections',
    'nav.about': 'Notre Histoire',
    'nav.contact': 'Contact',
    'nav.login': 'Connexion',
    'nav.register': 'S\'inscrire',
    'nav.profile': 'Profil',
    'nav.cart': 'Panier',
    'nav.logout': 'Déconnexion',
    
    // Home page
    'home.hero.title': 'Bienvenue chez Rosellea',
    'home.hero.subtitle': 'Élégance Boutique Redéfinie',
    'home.hero.description': 'Découvrez des pièces exquises qui incarnent la grâce et la sophistication, conçues pour la femme qui apprécie l\'élégance française intemporelle',
    'home.hero.cta': 'Explorer la Collection',
    'home.collections.title': 'Collections Sélectionnées',
    'home.collections.subtitle': 'Chaque pièce raconte une histoire d\'élégance intemporelle et de sophistication moderne',
    'home.arrivals.title': 'Nouveautés',
    'home.arrivals.subtitle': 'Fraîches de notre atelier, chaque pièce incarne l\'essence de la beauté intemporelle',
    
    // Product
    'product.addToCart': 'Ajouter à la Collection',
    'product.adding': 'Ajout...',
    'product.added': 'ajouté à votre collection',
    'product.error': 'Échec de l\'ajout au panier',
    'product.unavailable': 'Informations produit indisponibles',
    'product.untitled': 'Produit Sans Titre',
    'product.description.default': 'Pièce élégante conçue avec attention aux détails',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Une erreur s\'est produite',
    'common.retry': 'Réessayer',
    'common.close': 'Fermer',
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    'common.price': 'Prix',
    'common.size': 'Taille',
    'common.color': 'Couleur',
    'common.quantity': 'Quantité'
  }
};

export const I18nProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key, fallback = key) => {
    return translations[language]?.[key] || translations.en[key] || fallback;
  };

  const changeLanguage = (newLanguage) => {
    if (translations[newLanguage]) {
      setLanguage(newLanguage);
    }
  };

  const value = {
    language,
    changeLanguage,
    t,
    availableLanguages: Object.keys(translations)
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

export default I18nContext;