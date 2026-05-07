import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Heart, CheckCircle2 } from "lucide-react";
import { ShoppingCart, CreditCard } from "lucide-react";
import {
  Cpu, Zap, Monitor, HardDrive, Box, ShieldCheck
} from "lucide-react";
import lap1 from "../assets/imgs/brand1.png";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

//   const API = "https://laptopbackend-seven.vercel.app";

const addToCart = (product, silent = false) => {
  if (!product) return;

  try {
    const savedCart = localStorage.getItem('globalCart');
    let currentCart = savedCart ? JSON.parse(savedCart) : [];

    const productId = product._id || product.id;

    // FIX: image handling (NO renderImage needed)
    const productImage = product.images?.[0] || product.img || "";

    const existingItem = currentCart.find(item => item.id === productId);

    if (existingItem) {
      currentCart = currentCart.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      currentCart.push({
        id: productId,
        name: product.name,
        price: Number(product.price) || 0,
        img: productImage,
        quantity: 1,
        brand: product.brand || "Premium",
        processor: product.processor,
        ram: product.ram,
        storage: product.storage
      });
    }

    localStorage.setItem('globalCart', JSON.stringify(currentCart));

    // FIX: send full product
    window.dispatchEvent(
      new CustomEvent('cartUpdated', { detail: product })
    );

    if (!silent) alert(`${product.name} added to cart!`);

  } catch (e) {
    console.error("Cart saving error:", e);
  }
};

const handleBuyNow = (product) => {
  addToCart(product, true);
  navigate('/cart');
};

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
    setIsLiked(false);
  }, [id]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await fetch(`${API}/api/products`);
        const data = await res.json();

        const filtered = data
          .filter((p) => p._id !== id)
          .slice(0, 4);

        setRelated(filtered);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRelated();
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading product...
      </div>
    );
  }

  const handleWishlist = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-10">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">

        {/* Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6 border-b pb-3">
          {/* <h1 className="text-xl sm:text-2xl font-bold">
            {product.category || "Product"}
          </h1> */}

          <nav className="text-[11px] sm:text-xs text-gray-400">
            <Link to="/">Home</Link> / <span>{product.name}</span>
          </nav>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">

          {/* IMAGE */}
          <div className="bg-white p-6 sm:p-10 rounded-2xl flex justify-center items-center">
            <img
              src={product.images?.[0] || lap1}
              alt={product.name}
              className="max-h-[220px] sm:max-h-[350px] object-contain"
            />
          </div>

          {/* DETAILS */}
          <div className="space-y-5">

            <p className="text-gray-500 text-sm sm:text-base">
              {product.brand} 
            </p>

            {/* PRICE */}
            <div className="mb-6 sm:mb-8 p-4 bg-[#F8F9FA] rounded-2xl border-l-4 border-[#F4C430]">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1 tracking-widest">
                Price
              </p>

              <span className="text-3xl sm:text-4xl font-black text-[#0F172A]">
                PKR {product?.price?.toLocaleString()}
              </span>
            </div>

            {/* SPECS */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-6 sm:mb-8">
              {[
                { label: "Processor", value: product?.processor, icon: <Cpu size={16} /> },
                { label: "RAM", value: product?.ram, icon: <Zap size={16} /> },
                { label: "Graphics", value: product?.gpu, icon: <Monitor size={16} /> },
                { label: "Storage", value: product?.storage, icon: <HardDrive size={16} /> },
                { label: "Display", value: product?.display || "Full HD", icon: <Box size={16} /> },
                { label: "OS", value: product?.os || "Windows 11", icon: <ShieldCheck size={16} /> },
              ].map((spec, index) => (
                <div
                  key={index}
                  className="p-3 bg-white rounded-xl border shadow-sm hover:border-[#F4C430] transition"
                >
                  <div className="mb-1">{spec.icon}</div>
                  <p className="text-[9px] uppercase font-black text-gray-400">
                    {spec.label}
                  </p>
                  <p className="text-[11px] font-bold text-slate-800 truncate">
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>

            {/* FEATURES */}
       

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">

              <button
                onClick={() => addToCart(product)}
                className="flex-1 py-4 sm:py-5 bg-[#0F172A] text-white font-black rounded-2xl text-xs uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} /> Add To Cart
              </button>

              <button
                onClick={() => handleBuyNow(product)}
                className="flex-1 py-4 sm:py-5 bg-gradient-to-r from-[#F4C430] to-[#d6a11e] text-[#0F172A] font-black rounded-2xl text-xs uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <CreditCard size={18} /> Buy Now
              </button>

            </div>
          </div>
        </div>

        {/* RELATED */}
        <div className="mt-12 sm:mt-16">
          <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-5">
            Related Products
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {related.map((item) => (
              <Link
                to={`/product/${item._id}`}
                key={item._id}
                className="bg-white p-3 sm:p-4 rounded-xl border hover:shadow"
              >
                <img
                  src={item.images?.[0] || lap1}
                  className="h-20 sm:h-28 mx-auto object-contain"
                />
                <h3 className="text-xs sm:text-sm font-bold mt-2 truncate">
                  {item.name}
                </h3>
                <p className="text-blue-600 font-bold text-xs sm:text-sm">
                  PKR {item.price?.toLocaleString()}
                </p>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;