import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  AlertTriangle, 
  ArrowLeft, 
  CheckCircle2,
  ShoppingBag,
  ChevronRight
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';
import { Section } from '../components/Section';

export const Checkout: React.FC = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postcode: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    setIsProcessing(false);
    setIsSuccess(true);
    clearCart();
  };

  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="min-h-screen pt-32 px-6 flex flex-col items-center justify-center text-center space-y-6">
        <div className="w-20 h-20 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center">
          <ShoppingBag size={40} className="opacity-20" />
        </div>
        <h1 className="text-4xl font-display">Your cart is empty</h1>
        <p className="text-text-secondary dark:text-gray-400 max-w-md">
          You need to add some boosts to your cart before you can checkout.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className={cn(
            "px-8 py-4 rounded-2xl text-white transition-all",
            theme === 'day' ? 'bg-day-primary' : 'bg-night-primary'
          )}
        >
          Go to shop
        </button>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-32 px-6 flex flex-col items-center justify-center text-center space-y-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 12, stiffness: 200 }}
          className="w-24 h-24 bg-eco-green/10 text-eco-green rounded-full flex items-center justify-center"
        >
          <CheckCircle2 size={48} />
        </motion.div>
        <div className="space-y-4">
          <h1 className="text-5xl font-display">Order Confirmed!</h1>
          <p className="text-xl text-text-secondary dark:text-gray-400 max-w-md mx-auto">
            Thank you for your simulated purchase. Your boosts are on their way (in your imagination)!
          </p>
        </div>
        <div className="bg-black/5 dark:bg-white/5 p-6 rounded-3xl max-w-sm w-full text-left space-y-2">
          <p className="text-sm opacity-60">Order Number: #IB-{Math.floor(Math.random() * 1000000)}</p>
          <p className="text-sm opacity-60">Estimated Delivery: 2-3 Business Days</p>
        </div>
        <button
          onClick={() => navigate('/')}
          className={cn(
            "px-10 py-5 rounded-2xl text-white font-bold transition-all hover:scale-105 active:scale-95",
            theme === 'day' ? 'bg-day-primary' : 'bg-night-primary'
          )}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-4xl md:text-5xl font-display">Checkout</h1>
        </div>

        {/* Simulation Warning */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 p-6 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-4"
        >
          <AlertTriangle className="text-amber-500 shrink-0 mt-1" size={24} />
          <div>
            <h3 className="text-amber-500 font-bold text-lg">Simulation Mode</h3>
            <p className="text-amber-500/80">
              This is a demonstration checkout page. No real payment will be processed, and no products will be shipped. Please do not enter real credit card information.
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-12">
            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Contact Information */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    theme === 'day' ? 'bg-day-primary/10 text-day-primary' : 'bg-night-primary/10 text-night-primary'
                  )}>
                    <ShieldCheck size={20} />
                  </div>
                  <h2 className="text-2xl font-display">Contact Information</h2>
                </div>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium opacity-60">Email Address</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      className={cn(
                        "w-full px-6 py-4 rounded-2xl border-2 transition-all outline-none",
                        theme === 'day' 
                          ? "bg-white border-black/5 focus:border-day-primary" 
                          : "bg-brand-dark border-white/5 focus:border-night-primary"
                      )}
                    />
                  </div>
                </div>
              </section>

              {/* Shipping Address */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    theme === 'day' ? 'bg-day-primary/10 text-day-primary' : 'bg-night-primary/10 text-night-primary'
                  )}>
                    <Truck size={20} />
                  </div>
                  <h2 className="text-2xl font-display">Shipping Address</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium opacity-60">First Name</label>
                    <input
                      required
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={cn(
                        "w-full px-6 py-4 rounded-2xl border-2 transition-all outline-none",
                        theme === 'day' ? "bg-white border-black/5 focus:border-day-primary" : "bg-brand-dark border-white/5 focus:border-night-primary"
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium opacity-60">Last Name</label>
                    <input
                      required
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={cn(
                        "w-full px-6 py-4 rounded-2xl border-2 transition-all outline-none",
                        theme === 'day' ? "bg-white border-black/5 focus:border-day-primary" : "bg-brand-dark border-white/5 focus:border-night-primary"
                      )}
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium opacity-60">Address</label>
                    <input
                      required
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={cn(
                        "w-full px-6 py-4 rounded-2xl border-2 transition-all outline-none",
                        theme === 'day' ? "bg-white border-black/5 focus:border-day-primary" : "bg-brand-dark border-white/5 focus:border-night-primary"
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium opacity-60">City</label>
                    <input
                      required
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={cn(
                        "w-full px-6 py-4 rounded-2xl border-2 transition-all outline-none",
                        theme === 'day' ? "bg-white border-black/5 focus:border-day-primary" : "bg-brand-dark border-white/5 focus:border-night-primary"
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium opacity-60">Postcode</label>
                    <input
                      required
                      type="text"
                      name="postcode"
                      value={formData.postcode}
                      onChange={handleInputChange}
                      className={cn(
                        "w-full px-6 py-4 rounded-2xl border-2 transition-all outline-none",
                        theme === 'day' ? "bg-white border-black/5 focus:border-day-primary" : "bg-brand-dark border-white/5 focus:border-night-primary"
                      )}
                    />
                  </div>
                </div>
              </section>

              {/* Payment Details */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    theme === 'day' ? 'bg-day-primary/10 text-day-primary' : 'bg-night-primary/10 text-night-primary'
                  )}>
                    <CreditCard size={20} />
                  </div>
                  <h2 className="text-2xl font-display">Payment Details</h2>
                </div>
                <div className="p-8 rounded-[32px] bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium opacity-60">Card Number</label>
                    <input
                      required
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="0000 0000 0000 0000"
                      className={cn(
                        "w-full px-6 py-4 rounded-2xl border-2 transition-all outline-none",
                        theme === 'day' ? "bg-white border-black/5 focus:border-day-primary" : "bg-brand-dark border-white/5 focus:border-night-primary"
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium opacity-60">Expiry Date</label>
                      <input
                        required
                        type="text"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className={cn(
                          "w-full px-6 py-4 rounded-2xl border-2 transition-all outline-none",
                          theme === 'day' ? "bg-white border-black/5 focus:border-day-primary" : "bg-brand-dark border-white/5 focus:border-night-primary"
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium opacity-60">CVV</label>
                      <input
                        required
                        type="password"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="***"
                        className={cn(
                          "w-full px-6 py-4 rounded-2xl border-2 transition-all outline-none",
                          theme === 'day' ? "bg-white border-black/5 focus:border-day-primary" : "bg-brand-dark border-white/5 focus:border-night-primary"
                        )}
                      />
                    </div>
                  </div>
                </div>
              </section>

              <button
                type="submit"
                disabled={isProcessing}
                className={cn(
                  "w-full py-6 rounded-2xl text-white font-bold text-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed",
                  theme === 'day' ? 'bg-day-primary shadow-day-primary/20' : 'bg-night-primary shadow-night-primary/20'
                )}
              >
                {isProcessing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Processing...
                  </>
                ) : (
                  <>
                    Complete Simulated Payment
                    <ChevronRight size={20} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <div className={cn(
              "sticky top-24 p-8 rounded-[40px] space-y-8",
              theme === 'day' ? 'bg-day-accent/5' : 'bg-night-accent/5'
            )}>
              <h2 className="text-2xl font-display">Order Summary</h2>
              
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className={cn(
                      "w-16 h-16 rounded-xl flex items-center justify-center p-2 shrink-0",
                      item.theme === 'day' ? 'bg-day-accent/20' : 'bg-night-accent/20'
                    )}>
                      <img src={item.image} alt={item.name} className="max-h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display text-sm truncate">{item.name}</h4>
                      <p className="text-xs opacity-60">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-display">£{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-black/5 dark:border-white/5">
                <div className="flex justify-between text-sm">
                  <span className="opacity-60">Subtotal</span>
                  <span>£{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-60">Shipping</span>
                  <span className="text-eco-green font-medium">FREE</span>
                </div>
                <div className="flex justify-between text-xl font-display pt-4">
                  <span>Total</span>
                  <span>£{totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-eco-green/10 text-eco-green text-xs flex items-center gap-3">
                <Recycle size={16} />
                <span>Your order will be shipped in 100% plastic-free packaging.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Recycle: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M7 11V7a5 5 0 0 1 5-5c1.4 0 2.7.6 3.5 1.5L18 6" />
    <path d="M17 13v4a5 5 0 0 1-5 5c-1.4 0-2.7-.6-3.5-1.5L6 18" />
    <path d="M21 11l-4-4-4 4" />
    <path d="M3 13l4 4 4-4" />
  </svg>
);
