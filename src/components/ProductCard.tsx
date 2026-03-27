import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useRatings } from '../context/RatingContext';
import { StarRating } from './StarRating';
import { ShareButtons } from './ShareButtons';
import { cn } from '../lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const { theme } = useTheme();
  const { addToCart } = useCart();
  const { getAverageRating } = useRatings();
  const { rating, count } = getAverageRating(product.id);
  const productUrl = `${window.location.origin}/product/${product.id}`;
  const shareTitle = `Check out ${product.name} from Innocent Boost! 🥤`;

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className={cn(
        'group relative rounded-3xl p-8 transition-all duration-500 overflow-hidden',
        theme === 'day'
          ? 'bg-white shadow-lg shadow-black/5 hover:bg-day-accent/5'
          : 'bg-brand-dark shadow-2xl hover:bg-night-accent/5',
        className
      )}
    >
      <div className="absolute top-6 right-6 z-20">
        <ShareButtons 
          url={productUrl} 
          title={shareTitle} 
          variant="minimal" 
        />
      </div>

      <Link to={`/product/${product.id}`} className="block">
        <div className="relative h-64 mb-8 flex items-center justify-center">
          <motion.img
            src={product.image}
            alt={product.name}
            className="h-full object-contain drop-shadow-2xl"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
          <div className={cn(
            "absolute inset-0 blur-3xl opacity-20 -z-10",
            product.theme === 'day' ? 'bg-day-primary' : 'bg-night-primary'
          )} />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h3 className={cn(
              "text-2xl font-display",
              theme === 'day' ? 'text-text-primary' : 'text-white'
            )}>{product.name}</h3>
            <StarRating rating={rating} count={count} size={14} />
          </div>
          <p className="text-sm text-text-secondary dark:text-gray-400 font-display">{product.flavor}</p>
          <p className={cn(
            "text-lg font-display",
            theme === 'day' ? 'text-text-primary' : 'text-white'
          )}>£{product.price.toFixed(2)}</p>
        </div>
      </Link>

      <button
        onClick={() => addToCart(product)}
        className={cn(
          "absolute bottom-8 right-8 w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 active:scale-90",
          theme === 'day' ? 'bg-day-primary' : 'bg-night-primary'
        )}
        aria-label="Add to cart"
      >
        <Plus size={24} />
      </button>
    </motion.div>
  );
};
