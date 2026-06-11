import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

const RelatedProducts = ({ currentProduct, allProducts }) => {
  const related = useMemo(() => {
    // Safety check: ensure both inputs exist
    if (!currentProduct?.category || !Array.isArray(allProducts)) return [];

    return allProducts
      .filter((product) => {
        // Normalize strings to lowercase for a reliable match
        const isSameCategory = product.category?.toLowerCase() === currentProduct.category.toLowerCase();
        const isNotSelf = product._id !== currentProduct._id;
        return isSameCategory && isNotSelf;
      })
      .slice(0, 4);
  }, [currentProduct, allProducts]);

  // If no related products are found, this will return null and hide the section
  if (related.length === 0) return null;

  return (
    <div className="mt-8 border-t pt-6">
      <h3 className="text-sm font-black uppercase tracking-widest text-slate-800 mb-4">
        Related Products
      </h3>
      
      {/* 💡 ONLY CHANGED THIS LINE: Added flex overflow for mobile/tablet & grid for desktop */}
      <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-4 pb-2 scrollbar-none">
        {related.map((product) => (
          <Link 
            to={`/product/${product._id}`} 
            key={product._id} 
            onClick={() => window.scrollTo(0, 0)}
            /* 💡 ONLY CHANGED THIS LINE: Added flex-none & fixed width for mobile viewports */
            className="flex-none w-[165px] sm:w-[190px] md:w-full bg-white p-3 rounded-xl border border-slate-100 hover:border-[#F4C430] transition-all cursor-pointer block"
          >
            <img 
              src={product.images?.[0]?.url || product.images?.[0] || ""} 
              alt={product.name} 
              className="h-24 object-contain mx-auto mb-2" 
            />
            <p className="text-[10px] font-bold text-slate-800 line-clamp-1">{product.name}</p>
            <p className="text-[10px] font-black text-[#F4C430]">PKR {product.price?.toLocaleString()}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;