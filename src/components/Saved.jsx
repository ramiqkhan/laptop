import React from 'react';
import { Heart, Target, ShoppingCart } from 'lucide-react'; // Lucide icons use kar rahe hain

const Saved = () => {
  // Yeh counts baad mein aap props ya Redux/Context se pass kar sakte hain
  const wishlistCount = 0;
  const compareCount = 4;
  const cartCount = 2;

  const iconStyle = "relative p-2 cursor-pointer transition-all duration-300 hover:scale-110 text-slate-800 hover:text-yellow-600";
  const badgeStyle = "absolute -top-1 -right-1 flex items-center justify-center bg-[#d4a017] text-white text-[10px] font-bold h-5 w-5 rounded-full border-2 border-white";

  return (
    <div className="flex items-center gap-4 bg-white p-2 rounded-lg">
      
      {/* 1. Heart (Like/Wishlist) */}
      <div className={iconStyle} title="Wishlist">
        <Heart size={24} strokeWidth={1.5} />
        {wishlistCount > 0 && (
          <span className={badgeStyle}>{wishlistCount}</span>
        )}
      </div>

      {/* 2. Target (Compare) */}
      <div className={iconStyle} title="Compare">
        <Target size={24} strokeWidth={1.5} />
        {compareCount > 0 && (
          <span className={badgeStyle}>{compareCount}</span>
        )}
      </div>

      {/* 3. Shopping Cart */}
      <div className={iconStyle} title="Cart">
        <ShoppingCart size={24} strokeWidth={1.5} />
        {cartCount > 0 && (
          <span className={badgeStyle}>{cartCount}</span>
        )}
      </div>

    </div>
  );
};

export default Saved;