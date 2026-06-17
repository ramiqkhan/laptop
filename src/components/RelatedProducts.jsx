import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

const RelatedProducts = ({ currentProduct, allProducts }) => {
  const related = useMemo(() => {
    // Safety check: ensure both inputs exist safely
    if (!Array.isArray(allProducts) || !currentProduct) return [];

    const currentId = currentProduct._id || currentProduct.id;
    const currentCategory = (currentProduct.category || '').toLowerCase().trim();
    const currentBrand = (currentProduct.brand || '').toLowerCase().trim();

    // Strategy 1: Find items in the exact same category
    let matches = allProducts.filter((product) => {
      const productId = product._id || product.id;
      if (productId === currentId) return false; // Don't show the same laptop
      
      const productCategory = (product.category || '').toLowerCase().trim();
      return currentCategory && productCategory === currentCategory;
    });

    // Strategy 2: Fallback to same brand if category matching yields nothing
    if (matches.length === 0 && currentBrand) {
      matches = allProducts.filter((product) => {
        const productId = product._id || product.id;
        if (productId === currentId) return false;
        
        const productBrand = (product.brand || '').toLowerCase().trim();
        return productBrand === currentBrand;
      });
    }

    // Strategy 3: Global fallback (show any other items from global inventory) so section never stays empty
    if (matches.length === 0) {
      matches = allProducts.filter((product) => {
        const productId = product._id || product.id;
        return productId !== currentId;
      });
    }

    // Return maximum 4 items
    return matches.slice(0, 4);
  }, [currentProduct, allProducts]);

  // If absolutely nothing is available in global inventory, safely exit
  if (related.length === 0) return null;

  return (
    <div className="mt-8 border-t pt-6">
      <h3 className="text-sm font-black uppercase tracking-widest text-slate-800 mb-4">
        Related Products
      </h3>
      
      {/* 💡 FLEX LAYOUT MAINTAINED: Seamless multi-viewport layout */}
      <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-4 pb-2 scrollbar-none">
        {related.map((product) => {
          const productId = product._id || product.id;
          
          // Smart link generator: Checks model to direct user to correct path schema
          let targetPath = `/product/${productId}`;
          if (product.onModel === 'FeaturedProduct' || (!product.category && product.processor)) {
            targetPath = `/featured-product/${productId}`;
          }

          return (
            <Link 
              to={targetPath} 
              key={productId} 
              onClick={() => window.scrollTo(0, 0)}
              className="flex-none w-[165px] sm:w-[190px] md:w-full bg-white p-3 rounded-xl border border-slate-100 hover:border-[#F4C430] transition-all cursor-pointer block"
            >
              <img 
                src={product.images?.[0]?.url || product.images?.[0] || "https://via.placeholder.com/150"} 
                alt={product.name} 
                className="h-24 object-contain mx-auto mb-2" 
                onError={(e) => { e.target.src = 'https://placehold.co/150x100?text=Laptop'; }}
              />
              <p className="text-[10px] font-bold text-slate-800 line-clamp-1">{product.name}</p>
              <p className="text-[10px] font-black text-[#F4C430]">PKR {product.price?.toLocaleString()}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;