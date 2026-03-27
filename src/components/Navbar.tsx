import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, ShoppingBag, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { IMAGES, PRODUCTS } from '../constants';
import { cn } from '../lib/utils';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { totalItems, setCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [featuredProduct, setFeaturedProduct] = useState(PRODUCTS[0]);
  const location = useLocation();

  useEffect(() => {
    if (isMobileMenuOpen) {
      const randomIndex = Math.floor(Math.random() * PRODUCTS.length);
      setFeaturedProduct(PRODUCTS[randomIndex]);
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      // Prevent touch move on body
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
      document.body.style.touchAction = 'auto';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
      document.body.style.touchAction = 'auto';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Our Story', path: '/story' },
    { name: 'Sustainability', path: '/sustainability' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
          isScrolled ? 'frosted-glass py-3' : 'bg-transparent'
        )}
      >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-display tracking-tight">
          <span className={theme === 'day' ? 'text-text-primary' : 'text-white'}>Innocent</span>{' '}
          <span className={theme === 'day' ? 'text-day-primary' : 'text-night-primary'}>Boost</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-sm hover:opacity-70 transition-opacity font-display',
                location.pathname === link.path ? 'opacity-100' : 'opacity-60'
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            aria-label="Toggle theme"
          >
            <motion.div
              initial={false}
              animate={{ rotate: theme === 'day' ? 0 : 180 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              {theme === 'day' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.div>
          </button>

          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            aria-label="Open cart"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={cn(
                  'absolute top-0 right-0 w-4 h-4 text-[10px] font-bold flex items-center justify-center rounded-full text-white',
                  theme === 'day' ? 'bg-day-primary' : 'bg-night-primary'
                )}
              >
                {totalItems}
              </motion.span>
            )}
          </button>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
    </nav>

    {/* Mobile Menu */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className={cn(
            "fixed inset-0 z-[9999] p-8 flex flex-col overflow-y-auto",
            theme === 'day' ? 'bg-white text-brand-dark' : 'bg-brand-dark text-white'
          )}
        >
          <div className="flex justify-between items-center mb-16">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-display tracking-tight">
              <span className={theme === 'day' ? 'text-brand-dark' : 'text-white'}>Innocent</span>{' '}
              <span className={theme === 'day' ? 'text-day-primary' : 'text-night-primary'}>Boost</span>
            </Link>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <X size={32} />
            </button>
          </div>

          <div className="flex flex-col gap-6 mb-12">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-5xl font-display transition-all hover:translate-x-2 inline-block",
                    location.pathname === link.path 
                      ? (theme === 'day' ? 'text-day-primary' : 'text-night-primary')
                      : "opacity-60"
                  )}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-auto pt-12 border-t border-black/5 dark:border-white/5">
            <div className="flex items-center gap-6">
              <div className="flex-1 space-y-2">
                <p className="text-sm font-display opacity-60 uppercase tracking-widest">Featured Boost</p>
                <h4 className="text-2xl font-display">{featuredProduct.name}</h4>
                <Link 
                  to={`/product/${featuredProduct.id}`} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "inline-block text-sm underline underline-offset-4",
                    theme === 'day' ? 'text-day-primary' : 'text-night-primary'
                  )}
                >
                  Shop now
                </Link>
              </div>
              <div className={cn(
                "w-32 h-32 rounded-3xl flex items-center justify-center p-4",
                theme === 'day' ? 'bg-day-accent/10' : 'bg-night-accent/10'
              )}>
                <img 
                  src={featuredProduct.image} 
                  alt={featuredProduct.name} 
                  className="h-full object-contain drop-shadow-xl" 
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </>
);
};

export default Navbar;
