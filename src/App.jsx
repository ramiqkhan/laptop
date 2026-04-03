import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import LaptopPage from './pages/Laptop' 
import GamingLaptop from './pages/gaminglaptop' 
import ProductDetails from './pages/ProductDetails'
import TermsAndConditions from './pages/TermsAndConditions'
import PrivacyPolicy from './pages/PrivacyPolicy'
import FAQs from './pages/FAQs_new'
import ShippingInfo from './pages/shippinginfo' 
import TrackOrder from './pages/trackOrder' 
import ReturnPolicy from './pages/returnPolicy'
import Warranty from './pages/warranty'
import PaymentMethod from './pages/paymentMethod'

// --- PAGES IMPORT (Naye aur Updated) ---
import Deals from './pages/Deals' // Ab ye external file se aayega
import Cookie from './components/Cookie'
import Cart from './pages/Cart' 
import Compare from './components/Compare'

// Brand Pages Import
import HP from './pages/HP'
import Dell from './pages/Dell'
import Apple from './pages/Apple'
import Lenovo from './pages/Lenovo'
import Acer from './pages/Acer'
import Sony from './pages/Sony'
import Samsung from './pages/Samsung'

import { CartProvider } from './context/CartContext'; 
import AboutUs from './pages/About'

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <CartProvider> 
      <Router>
        <ScrollToTop /> 
        
        <div className="min-h-screen bg-white flex flex-col font-['Poppins']">
          <Navbar />
          
          {/* Cookie 3 seconds ke delay se aayega */}
          <Cookie />

          <main className="grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/laptops" element={<LaptopPage />} />
              <Route path="/gaming" element={<GamingLaptop />} />
               <Route path="/about" element={<AboutUs />} />
              {/* Brands */}
              <Route path="/hp" element={<HP />} />
              <Route path="/dell" element={<Dell />} />
              <Route path="/apple" element={<Apple />} />
              <Route path="/lenovo" element={<Lenovo />} />
              <Route path="/acer" element={<Acer />} />
              <Route path="/sony" element={<Sony />} />
              <Route path="/samsung" element={<Samsung />} />
              
              <Route path="/cart" element={<Cart />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              
              {/* Deals Page */}
              <Route path="/deals" element={<Deals />} />
              
              {/* Footer Links */}
              <Route path="/terms" element={<TermsAndConditions />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/shipping-info" element={<ShippingInfo />} />
              <Route path="/track-order" element={<TrackOrder />} />
              <Route path="/return-policy" element={<ReturnPolicy />} />
              <Route path="/warranty" element={<Warranty />} />
              <Route path="/payment-methods" element={<PaymentMethod />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </CartProvider>
  )
}

export default App;