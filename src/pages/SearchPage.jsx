import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../api";

const SearchPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${API_BASE_URL}/api/search?q=${query}`
        );

        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);
const renderImage = (product, index = 0) => {
  if (!product) return "https://via.placeholder.com/150?text=No+Image";

  const img = product?.images?.[index];

  if (!img) return product.image || "https://via.placeholder.com/150?text=No+Image";

  return img.url || img;
};
  return (
    <div className="min-h-screen bg-slate-50 px-4 md:px-10 py-8">

      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
          Search Results
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Results for{" "}
          <span className="text-[#D4AF37] font-semibold">
            "{query}"
          </span>
        </p>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="grid gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-24 bg-white animate-pulse rounded-xl border"
            />
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && results.length === 0 && (
        <div className="text-center py-20">
          <h3 className="text-lg font-semibold text-slate-700">
            No products found
          </h3>
          <p className="text-sm text-slate-500 mt-2">
            Try searching with different keywords
          </p>
        </div>
      )}

      {/* RESULTS GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {results.map((item) => (
          <div
            key={item._id}
            onClick={() => navigate(`/product/${item._id}`)}
            className="bg-white border border-slate-100 rounded-2xl p-4 cursor-pointer hover:shadow-lg transition group"
          >

            {/* IMAGE */}
        {/* IMAGE */}
<div className="w-full h-40 flex items-center justify-center bg-slate-50 rounded-xl overflow-hidden">
  <img
    src={renderImage(item)}
    alt={item.name}
    className="h-full object-contain group-hover:scale-105 transition"
  />
</div>

            {/* NAME */}
            <h3 className="mt-3 font-semibold text-slate-800 line-clamp-2">
              {item.name}
            </h3>

            {/* TYPE */}
            <p className="text-xs text-slate-500 mt-1">
              {item.type === "product" ? "Product" : "Featured"}
            </p>

            {/* PRICE */}
            {item.price && (
              <p className="mt-2 text-[#D4AF37] font-bold">
                PKR {item.price.toLocaleString()}
              </p>
            )}

            {/* BUTTON STYLE FEEL */}
            <div className="mt-3">
              <button className="w-full py-2 text-sm font-semibold rounded-lg bg-[#D4AF37] text-white hover:brightness-110 transition">
                View Product
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;