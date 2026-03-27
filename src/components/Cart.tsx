import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';

export const Cart: React.FC = () => {
  const { cart, isCartOpen, setCartOpen, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={cn(
              "fixed top-0 right-0 bottom-0 z-[80] w-full max-w-md shadow-2xl flex flex-col",
              theme === 'day' ? 'bg-white text-text-primary' : 'bg-brand-dark text-white'
            )}
          >
            <div className="p-6 flex items-center justify-between border-b border-black/5 dark:border-white/5">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className={theme === 'day' ? 'text-day-primary' : 'text-night-primary'} />
                <h2 className="text-xl font-display">Your cart ({totalItems})</h2>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center">
                    <ShoppingBag size={32} className="opacity-20" />
                  </div>
                  <p className="text-text-secondary dark:text-gray-400">Your cart is empty. Time for a boost?</p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="text-sm underline underline-offset-4"
                  >
                    Continue shopping
                  </button>
                </div>
              ) : (
                cart.map(item => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4"
                  >
                    <div className={cn(
                      "w-24 h-24 rounded-2xl flex items-center justify-center p-2",
                      item.theme === 'day' ? 'bg-day-accent/20' : 'bg-night-accent/20'
                    )}>
                      <img src={item.image} alt={item.name} className="max-h-full object-contain" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-display text-sm">{item.name}</h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs text-text-secondary hover:text-red-500 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                        <p className="text-xs text-text-secondary dark:text-gray-400">{item.flavor}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className={cn(
                          "flex items-center gap-3 rounded-full px-3 py-1",
                          theme === 'day' ? 'bg-day-primary/10' : 'bg-white/5'
                        )}>
                          <button 
                            onClick={() => updateQuantity(item.id, -1)} 
                            className={cn(
                              "hover:opacity-50 transition-opacity",
                              theme === 'day' ? 'text-day-primary' : 'text-night-primary'
                            )}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-xs w-4 text-center font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)} 
                            className={cn(
                              "hover:opacity-50 transition-opacity",
                              theme === 'day' ? 'text-day-primary' : 'text-night-primary'
                            )}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="text-sm font-display">£{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-black/5 dark:border-white/5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary dark:text-gray-400 font-display">Subtotal</span>
                  <span className="text-2xl font-display">£{totalPrice.toFixed(2)}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className={cn(
                    "w-full py-4 rounded-2xl text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
                    theme === 'day' ? 'bg-day-primary shadow-lg shadow-day-primary/20' : 'bg-night-primary shadow-lg shadow-night-primary/20'
                  )}
                >
                  Proceed to checkout
                </button>
                <p className="text-[10px] text-center text-text-secondary dark:text-gray-500 uppercase tracking-widest">
                  Free shipping on orders over £15
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
