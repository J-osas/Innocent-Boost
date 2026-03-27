import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, CheckCircle2 } from 'lucide-react';
import { Section } from '../components/Section';
import { FloatingFruit } from '../components/FloatingFruit';
import { PRODUCTS, IMAGES } from '../constants';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useRatings } from '../context/RatingContext';
import { StarRating } from '../components/StarRating';
import { ShareButtons } from '../components/ShareButtons';
import { cn } from '../lib/utils';
import { Star } from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { theme } = useTheme();
  const { getAverageRating, addRating } = useRatings();
  const [userRating, setUserRating] = React.useState(0);
  const [hoverRating, setHoverRating] = React.useState(0);
  const [submitted, setSubmitted] = React.useState(false);

  const product = PRODUCTS.find(p => p.id === id);
  const { rating, count } = getAverageRating(id || '');
  const currentUrl = window.location.href;
  const shareTitle = product ? `Check out ${product.name} from Innocent Boost! 🥤` : 'Innocent Boost';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl">Product not found</h1>
          <Link to="/shop" className="underline">Back to shop</Link>
        </div>
      </div>
    );
  }

  const otherProduct = PRODUCTS.find(p => p.id !== id);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className={cn(
        "relative min-h-[80vh] flex items-center justify-center px-6 overflow-hidden",
        product.theme === 'day' ? 'bg-day-accent/10' : 'bg-night-accent/10'
      )}>
        <div className="absolute inset-0 pointer-events-none">
          {product.theme === 'day' ? (
            <>
              <FloatingFruit image={IMAGES.orangeSlice} top="20%" left="10%" size={80} />
              <FloatingFruit image={IMAGES.mintLeaves} bottom="20%" right="10%" delay={1} size={60} />
            </>
          ) : (
            <>
              <FloatingFruit image={IMAGES.blueberries} top="20%" left="10%" size={70} />
              <FloatingFruit image={IMAGES.strawberry} bottom="20%" right="10%" delay={1} size={90} />
              <FloatingFruit image={IMAGES.ginsengRoot} top="40%" right="20%" delay={0.5} size={80} />
            </>
          )}
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity"
            >
              <ArrowLeft size={16} /> Back
            </button>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <h1 className="text-5xl md:text-7xl">{product.name}</h1>
                <StarRating rating={rating} count={count} size={24} className="mt-2" />
              </div>
              <p className={cn(
                "text-2xl font-display",
                product.theme === 'day' ? 'text-day-primary' : 'text-night-primary'
              )}>
                {product.tagline}
              </p>
              <p className="text-3xl font-display">£{product.price.toFixed(2)}</p>
            </div>
            <p className="text-lg text-text-secondary dark:text-gray-400 leading-relaxed max-w-md">
              {product.description}
            </p>

            <div className="space-y-4 pt-4 border-t border-black/5 dark:border-white/5">
              <h3 className="text-xl font-display">Rate this boost</h3>
              {submitted ? (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-eco-green font-medium flex items-center gap-2"
                >
                  <CheckCircle2 size={18} /> Thanks for your rating!
                </motion.p>
              ) : (
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => {
                        addRating(product.id, star);
                        setSubmitted(true);
                      }}
                      className="transition-transform hover:scale-110"
                    >
                      <Star 
                        size={28} 
                        className={cn(
                          "transition-colors",
                          (hoverRating || userRating) >= star 
                            ? "fill-yellow-400 text-yellow-400" 
                            : "text-gray-300"
                        )} 
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
              <button
                onClick={() => addToCart(product)}
                className={cn(
                  "px-10 py-5 rounded-2xl text-white flex items-center gap-3 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl",
                  product.theme === 'day' ? 'bg-day-primary shadow-day-primary/20' : 'bg-night-primary shadow-night-primary/20'
                )}
              >
                <Plus size={20} /> Add to cart
              </button>
              
              <ShareButtons url={currentUrl} title={shareTitle} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: 'spring', damping: 20 }}
            className="flex justify-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-[500px] md:h-[650px] object-contain drop-shadow-[0_50px_50px_rgba(0,0,0,0.2)]"
            />
          </motion.div>
        </div>
      </section>

      {/* Details Section */}
      <Section className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20">
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl">What's inside.</h2>
              <div className="grid grid-cols-2 gap-4">
                {product.ingredients.map((ing, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-black/5 dark:bg-white/5">
                    <div className="w-2 h-2 rounded-full bg-eco-green" />
                    <span className="text-sm font-medium capitalize">{ing}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl">The benefits.</h2>
              <div className="space-y-4">
                {product.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <CheckCircle2 size={24} className="text-eco-green" />
                    <span className="text-lg font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-black/5 dark:bg-white/5 rounded-[40px] p-12 space-y-8">
            <h2 className="text-4xl">Nutrition facts.</h2>
            <div className="space-y-4">
              {[
                { label: 'Energy', value: '15 kcal' },
                { label: 'Fat', value: '0g' },
                { label: 'Carbohydrates', value: '3.5g' },
                { label: 'Sugars', value: '3.2g' },
                { label: 'Protein', value: '0g' },
                { label: 'Salt', value: '0.01g' },
                { label: 'Caffeine', value: '75mg' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-4 border-b border-black/5 dark:border-white/5 last:border-0">
                  <span className="text-text-secondary dark:text-gray-400 font-medium">{item.label}</span>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-text-secondary dark:text-gray-500 italic">
              *Values based on 330ml serving. Plant-based caffeine from natural sources.
            </p>
          </div>
        </div>
      </Section>

      {/* Recommendation Section */}
      {otherProduct && (
        <Section className="bg-black/5 dark:bg-white/5">
          <div className="max-w-7xl mx-auto text-center space-y-12">
            <h2 className="text-4xl">You might also like.</h2>
            <div className="max-w-xl mx-auto">
              <Link to={`/product/${otherProduct.id}`} className="block group">
                <div className={cn(
                  "rounded-[40px] p-12 transition-all duration-500 group-hover:scale-[1.02]",
                  otherProduct.theme === 'day' ? 'bg-day-accent/10' : 'bg-night-accent/10'
                )}>
                  <img
                    src={otherProduct.image}
                    alt={otherProduct.name}
                    className="h-64 mx-auto object-contain mb-8 drop-shadow-xl group-hover:rotate-3 transition-transform duration-500"
                  />
                  <h3 className="text-3xl mb-2">{otherProduct.name}</h3>
                  <p className="text-text-secondary dark:text-gray-400 mb-6 font-display">{otherProduct.tagline}</p>
                  <span className={cn(
                    "inline-flex items-center gap-2",
                    otherProduct.theme === 'day' ? 'text-day-primary' : 'text-night-primary'
                  )}>
                    View product <Plus size={18} />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </Section>
      )}
    </div>
  );
};
