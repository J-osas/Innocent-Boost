import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '../components/Section';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../constants';
import { cn } from '../lib/utils';
import { useTheme } from '../context/ThemeContext';

export const Shop: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'day' | 'night'>('all');
  const { theme } = useTheme();

  const filteredProducts = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.theme === filter);

  const filters = [
    { id: 'all', name: 'All' },
    { id: 'day', name: 'Day Energy' },
    { id: 'night', name: 'Night Focus' },
  ];

  return (
    <div className="pt-32 min-h-screen">
      <Section className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
          <h1 className="text-5xl md:text-7xl">Shop the boost.</h1>
          <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 p-1 rounded-2xl">
            {filters.map(f => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                className={cn(
                  "px-6 py-2 rounded-xl text-sm transition-all duration-300",
                  filter === f.id
                    ? (theme === 'day' ? 'bg-day-primary text-white shadow-lg' : 'bg-night-primary text-white shadow-lg')
                    : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-60'
                )}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="grid md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map(product => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Section>
    </div>
  );
};
