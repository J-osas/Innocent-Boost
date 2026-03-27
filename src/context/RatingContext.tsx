import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../constants';

interface ProductRating {
  id: string;
  rating: number;
  ratingCount: number;
}

interface RatingContextType {
  ratings: Record<string, ProductRating>;
  addRating: (productId: string, rating: number) => void;
  getAverageRating: (productId: string) => { rating: number; count: number };
}

const RatingContext = createContext<RatingContextType | undefined>(undefined);

export const RatingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ratings, setRatings] = useState<Record<string, ProductRating>>(() => {
    const saved = localStorage.getItem('product_ratings');
    if (saved) {
      return JSON.parse(saved);
    }
    
    // Initialize with some default ratings for a "lived-in" feel
    const initial: Record<string, ProductRating> = {};
    PRODUCTS.forEach(p => {
      initial[p.id] = {
        id: p.id,
        rating: 4.5 + Math.random() * 0.5, // 4.5 to 5.0
        ratingCount: Math.floor(Math.random() * 50) + 20, // 20 to 70
      };
    });
    return initial;
  });

  useEffect(() => {
    localStorage.setItem('product_ratings', JSON.stringify(ratings));
  }, [ratings]);

  const addRating = (productId: string, newRating: number) => {
    setRatings(prev => {
      const current = prev[productId] || { id: productId, rating: 0, ratingCount: 0 };
      const totalRating = current.rating * current.ratingCount;
      const newCount = current.ratingCount + 1;
      const updatedRating = (totalRating + newRating) / newCount;
      
      return {
        ...prev,
        [productId]: {
          id: productId,
          rating: updatedRating,
          ratingCount: newCount,
        },
      };
    });
  };

  const getAverageRating = (productId: string) => {
    const r = ratings[productId];
    return r ? { rating: r.rating, count: r.ratingCount } : { rating: 0, count: 0 };
  };

  return (
    <RatingContext.Provider value={{ ratings, addRating, getAverageRating }}>
      {children}
    </RatingContext.Provider>
  );
};

export const useRatings = () => {
  const context = useContext(RatingContext);
  if (!context) {
    throw new Error('useRatings must be used within a RatingProvider');
  }
  return context;
};
