
import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { useI18n } from '../contexts/I18nContext';
import { useProductData } from '../hooks/useProductData';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/main.scss';

function Collections() {
  const { t } = useI18n();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category') || 'all';
  const sortBy = searchParams.get('sort') || 'newest';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  
  // Create stable filters object using useMemo
  const filters = useMemo(() => {
    const filtersObj = {};
    if (categoryFromUrl !== 'all') filtersObj.category = categoryFromUrl;
    if (sortBy !== 'newest') filtersObj.sort = sortBy;
    if (minPrice) filtersObj.minPrice = minPrice;
    if (maxPrice) filtersObj.maxPrice = maxPrice;
    return filtersObj;
  }, [categoryFromUrl, sortBy, minPrice, maxPrice]);

  const { products, loading, error } = useProductData(filters);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100
    });
  }, []);

  const categories = [
    { id: 'all', name: t('collections.all', 'All Collections') },
    { id: 'dresses', name: t('collections.dresses', 'Dresses') },
    { id: 'tops', name: t('collections.tops', 'Tops') },
    { id: 'pants', name: t('collections.pants', 'Bottoms') }
  ];

  const handleCategoryChange = (categoryId) => {
    const newParams = new URLSearchParams(searchParams);
    if (categoryId === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', categoryId);
    }
    setSearchParams(newParams);
  };

  const handleSortChange = (sortValue) => {
    const newParams = new URLSearchParams(searchParams);
    if (sortValue === 'newest') {
      newParams.delete('sort');
    } else {
      newParams.set('sort', sortValue);
    }
    setSearchParams(newParams);
  };

  const handlePriceChange = (min, max) => {
    const newParams = new URLSearchParams(searchParams);
    if (min) {
      newParams.set('minPrice', min);
    } else {
      newParams.delete('minPrice');
    }
    if (max) {
      newParams.set('maxPrice', max);
    } else {
      newParams.delete('maxPrice');
    }
    setSearchParams(newParams);
  };

  const clearPriceFilter = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('minPrice');
    newParams.delete('maxPrice');
    setSearchParams(newParams);
  };

  return (
    <>
      <Navigation />
      
      <section className="collections-hero py-5" style={{ background: 'linear-gradient(135deg, rgba(245, 240, 235, 0.9) 0%, rgba(232, 180, 184, 0.8) 100%)', marginTop: '0' }}>
        <div className="container">
          <div className="text-center" data-aos="fade-up">
            <h1 className="display-3 mb-4" style={{ fontFamily: 'Playfair Display, serif', fontWeight: '700' }}>
              {t('collections.title', 'Our Collections')}
            </h1>
            <p className="lead mb-0">
              {t('collections.subtitle', 'Discover timeless pieces crafted with passion and attention to detail')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                <div className="category-filters d-flex flex-wrap gap-2" data-aos="fade-up">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`btn ${categoryFromUrl === category.id ? 'btn-luxury' : 'btn-outline-luxury'} px-3 py-2`}
                      style={{
                        borderRadius: '25px',
                        fontWeight: '500',
                        fontSize: '0.9rem',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
                
                <div className="d-flex gap-3 align-items-center" data-aos="fade-up" data-aos-delay="100">
                  <select 
                    className="form-select" 
                    value={sortBy} 
                    onChange={(e) => handleSortChange(e.target.value)}
                    style={{ width: 'auto', minWidth: '150px' }}
                  >
                    <option value="newest">{t('collections.sort.newest', 'Newest')}</option>
                    <option value="price-low">{t('collections.sort.priceLow', 'Price: Low to High')}</option>
                    <option value="price-high">{t('collections.sort.priceHigh', 'Price: High to Low')}</option>
                    <option value="name">{t('collections.sort.name', 'Name A-Z')}</option>
                  </select>
                </div>
              </div>
              
              <div className="price-filter d-flex gap-2 align-items-center mb-4" data-aos="fade-up" data-aos-delay="200">
                <span className="text-muted">{t('collections.priceRange', 'Price Range')}:</span>
                <input 
                  type="number" 
                  className="form-control" 
                  placeholder={t('collections.minPrice', 'Min')}
                  value={minPrice}
                  onChange={(e) => handlePriceChange(e.target.value, maxPrice)}
                  style={{ width: '100px' }}
                />
                <span>-</span>
                <input 
                  type="number" 
                  className="form-control" 
                  placeholder={t('collections.maxPrice', 'Max')}
                  value={maxPrice}
                  onChange={(e) => handlePriceChange(minPrice, e.target.value)}
                  style={{ width: '100px' }}
                />
                <button 
                  className="btn btn-outline-secondary btn-sm"
                  onClick={clearPriceFilter}
                >
                  {t('collections.clear', 'Clear')}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="alert alert-danger text-center">
              <h4>{t('collections.error.title', 'Error Loading Products')}</h4>
              <p>{error}</p>
            </div>
          )}

          {loading ? (
            <div className="row g-4">
              {[...Array(12)].map((_, index) => (
                <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
                  <div className="product-card">
                    <div className="loading-skeleton" style={{height: '320px', borderRadius: '20px 20px 0 0'}}></div>
                    <div className="product-details">
                      <div className="loading-skeleton" style={{height: '24px', marginBottom: '12px', borderRadius: '4px'}}></div>
                      <div className="loading-skeleton" style={{height: '16px', marginBottom: '16px', borderRadius: '4px', width: '80%'}}></div>
                      <div className="loading-skeleton" style={{height: '28px', marginBottom: '16px', borderRadius: '4px', width: '60%'}}></div>
                      <div className="loading-skeleton" style={{height: '48px', borderRadius: '12px'}}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <p className="text-muted mb-0">
                  {t('collections.showing', 'Showing')} {products.length} {t('collections.products', 'products')}
                </p>
              </div>
              <div className="row g-4">
                {products.map((product, index) => (
                  <div 
                    className="col-lg-3 col-md-4 col-sm-6" 
                    key={product._id}
                    data-aos="fade-up"
                    data-aos-delay={index * 50}
                  >
                    <ProductCard 
                      product={product} 
                      onClick={() => setSelectedProduct(product)} 
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-5">
              <h3 className="mb-3">{t('collections.noProducts', 'No Products Found')}</h3>
              <p>{t('collections.noProductsDesc', 'We\'re adding new pieces to this collection. Check back soon!')}</p>
            </div>
          )}
        </div>
      </section>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
      
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default Collections;
