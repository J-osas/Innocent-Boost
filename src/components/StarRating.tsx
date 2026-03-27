import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { cn } from '../lib/utils';

interface StarRatingProps {
  rating: number;
  count?: number;
  size?: number;
  className?: string;
  showCount?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  count, 
  size = 16, 
  className,
  showCount = true 
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={size} className="fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <StarHalf size={size} className="fill-yellow-400 text-yellow-400" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} size={size} className="text-gray-300" />
        ))}
      </div>
      {showCount && count !== undefined && (
        <span className="text-xs text-text-secondary dark:text-gray-400 ml-1">
          ({count})
        </span>
      )}
    </div>
  );
};
