import { useState, useEffect, useMemo } from 'react';
import apiService from '../utils/apiService';

export const useProductData = (filters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Deep memoize filters for stable dependency
  const stableFilters = useMemo(() => {
    const keys = Object.keys(filters).sort();
    const obj = {};
    for (const key of keys) obj[key] = filters[key];
    return obj;
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getProducts(stableFilters);
        if (isMounted) {
          if (response.success) {
            setProducts(response.data || []);
          } else {
            throw new Error(response.message || 'Failed to fetch products');
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load products');
          setProducts([]);
          console.error('Error fetching products:', err);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchProducts();
    return () => { isMounted = false; };
  }, [stableFilters]);

  return { products, loading, error };
};

export const useProduct = (productId) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;

      try {
        setLoading(true);
        setError(null);

        const response = await apiService.getProductById(productId);

        if (response.success) {
          setProduct(response.data);
        } else {
          throw new Error(response.message || 'Product not found');
        }
      } catch (err) {
        setError(err.message || 'Failed to load product');
        setProduct(null);
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, loading, error };
};

export const useProductsByCategory = (category, filters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  // Deep memoize filters for stable dependency
  const stableFilters = useMemo(() => {
    const keys = Object.keys(filters).sort();
    const obj = {};
    for (const key of keys) obj[key] = filters[key];
    return obj;
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      if (!category) return;

      try {
        setLoading(true);
        setError(null);

        const response = await apiService.getProductsByCategory(category, stableFilters);

        if (isMounted) {
          if (response.success) {
            setProducts(response.data || []);
            setPagination(response.pagination);
          } else {
            throw new Error(response.message || 'Failed to fetch products');
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load products');
          setProducts([]);
          console.error('Error fetching category products:', err);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProducts();
    return () => { isMounted = false; };
  }, [category, stableFilters]);

  return { products, loading, error, pagination };
};
