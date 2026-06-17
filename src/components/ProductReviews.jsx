import React, { useState, useEffect } from "react";
import { MessageSquare, Send, User, X } from "lucide-react";

const ProductReviews = ({ productItemId, onModel }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  // Form State
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const API = "https://laptopbackend-seven.vercel.app";

  // Fetch reviews matching this specific item
  const fetchItemReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/reviews/${productItemId}`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (err) {
      console.error("Error loading reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productItemId) {
      fetchItemReviews();
    }
  }, [productItemId]);

  // Handle Form Submission
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!username.trim() || !comment.trim()) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(`${API}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productItemId,
          onModel: onModel || "Product",
          username,
          comment,
        }),
      });

      if (res.ok) {
        setUsername("");
        setComment("");
        setShowForm(false);
        fetchItemReviews(); 
      } else {
        const errData = await res.json();
        alert(errData.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Review submission error:", err);
      alert("Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full pt-2">
      {/* HEADER SECTION - Stacked dynamically on extra small devices */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h3 className="text-base sm:text-lg font-black text-[#0F172A] tracking-tight uppercase italic flex items-center gap-2">
            <MessageSquare size={18} className="text-[#F4C430] shrink-0" /> 
            Community Feedback ({reviews.length})
          </h3>
        </div>
        
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="w-full sm:w-auto text-center px-4 py-2.5 bg-[#0F172A] text-white text-[10px] font-black rounded-xl uppercase tracking-wider hover:bg-black transition-all shadow-md"
          >
    Add Review
          </button>
        )}
      </div>

      {/* COLLAPSIBLE ADD REVIEW FORM - Reduced internal padding on mobile layouts */}
      {showForm && (
        <div className="mb-6 p-4 sm:p-6 bg-[#F8F9FA] rounded-2xl border border-gray-200 shadow-inner relative animate-in slide-in-from-top-4 duration-300">
          <button 
            onClick={() => setShowForm(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-black transition p-1"
          >
            <X size={18} />
          </button>

          <h4 className="text-xs sm:text-sm font-black uppercase text-slate-800 tracking-wider mb-4 pr-6">
            Share Your Experience
          </h4>

          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block text-[9px] sm:text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your Name"
                className="w-full px-3 sm:px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F4C430] bg-white text-sm font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-[9px] sm:text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">
                Review Comments
              </label>
              <textarea
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us what you think about this laptop..."
                className="w-full px-3 sm:px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F4C430] bg-white text-sm font-medium"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#F4C430] to-[#d6a11e] text-[#0F172A] font-black rounded-xl uppercase tracking-widest text-xs shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Send size={14} /> {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      )}

      {/* REVIEWS DISPLAY LIST - Adaptive card scaling */}
      {loading ? (
        <p className="text-[10px] sm:text-xs font-bold text-gray-400 animate-pulse uppercase tracking-wider">
          Updating community notes...
        </p>
      ) : reviews.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-2xl border border-dashed border-gray-200 px-4">
          <p className="text-xs sm:text-sm text-gray-400 font-medium">
            No reviews posted yet. Be the first to share your thoughts!
          </p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 sm:pr-2">
          {reviews.map((rev) => (
            <div key={rev._id} className="p-3 sm:p-4 bg-white rounded-2xl border border-gray-100 shadow-sm flex gap-3 sm:gap-4 items-start">
              {/* Profile Icon Hidden on tiny displays to conserve readable reading columns */}
              <div className="hidden xs:flex w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-100 flex-shrink-0 items-center justify-center text-slate-600">
                <User size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline gap-2">
                  <h5 className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                    {rev.username}
                  </h5>
                  <span className="text-[9px] sm:text-[10px] text-gray-400 font-semibold whitespace-nowrap">
                    {new Date(rev.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-relaxed break-words whitespace-pre-line">
                  {rev.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductReviews;