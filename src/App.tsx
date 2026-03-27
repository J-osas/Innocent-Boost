/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { RatingProvider } from './context/RatingContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Cart } from './components/Cart';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { OurStory } from './pages/OurStory';
import { Sustainability } from './pages/Sustainability';
import { Contact } from './pages/Contact';
import { Checkout } from './pages/Checkout';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/story" element={<OurStory />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <RatingProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <Cart />
              <main className="flex-grow">
                <AnimatedRoutes />
              </main>
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </RatingProvider>
    </ThemeProvider>
  );
}

