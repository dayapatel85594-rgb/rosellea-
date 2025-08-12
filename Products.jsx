// src/components/Products.jsx

import React, { useEffect, useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';
import { useProductData } from '../hooks/useProductData';

export default function Products({ category = '', newArrivals = false, onQuickView = null }) {
  // Create stable filters object using useMemo
  const filters = useMemo(() => {
    const filtersObj = { limit: 100 };
    if (category) filtersObj.category = category;
    if (newArrivals) filtersObj.isNewArrival = true;
    return filtersObj;
  }, [category, newArrivals]);

  const { products, loading, error } = useProductData(filters);

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="text-center py-5">
        <p className="text-muted">Error loading products: {error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="text-muted">No products found.</p>
      </div>
    );
  }

  return (
    <div className="row g-4 justify-content-center">
      {products.map((product) => (
        <div className="col-sm-6 col-md-4 col-lg-3" key={product._id}>
          <ProductCard product={product} onClick={onQuickView} />
        </div>
      ))}
    </div>
  );
}
