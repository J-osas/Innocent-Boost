import { Product } from './types';

export const IMAGES = {
  orangePine: "/images/my-orange-drink.png",
  berryNight: "/images/my-berry-drink.png",
  heroProducts: "https://picsum.photos/seed/innocent-duo/1200/800",
  lifestyleOffice: "/images/the-office-hero.jpg",
  lifestyleStudy: "/images/the-night-owl.jpg",
  lifestyleGym: "/images/the-performance-pro.png",
  berryNightGroup: "https://picsum.photos/seed/berry-group/1200/800",
  orangePineFloating: "/images/orange-slice.png",
  blueberries: "/images/blueberries.png",
  ginsengRoot: "/images/ginseng-root.png",
  iceCubes: "/images/ice-cubes.png",
  mintLeaves: "/images/mint-leaves.png",
  orangeSlice: "/images/orange-slice.png",
  strawberry: "/images/strawberry.png",
};

export const PRODUCTS: Product[] = [
  {
    id: 'orange-pine-boost',
    name: 'Orange Pine Boost',
    tagline: 'Taste the tropics. Feel the boost.',
    description: 'A tropical hit of orange and pineapple with plant-based caffeine to keep you sharp through the day. No junk, no crash, just good energy.',
    price: 1.99,
    flavor: 'Orange and Pineapple',
    image: IMAGES.orangePine,
    theme: 'day',
    accentColor: '#FF8A00',
    ingredients: ['orange juice', 'pineapple extract', 'green tea caffeine', 'vitamin B12', 'vitamin C', 'sparkling water'],
    benefits: ['Natural caffeine', 'Low sugar', '330ml', 'Eco carton']
  },
  {
    id: 'berry-night-boost',
    name: 'Berry Night Boost',
    tagline: 'Calm focus. Clean energy.',
    description: 'Calm your mind, sharpen your focus. Blueberry and strawberry with plant-based caffeine for late nights done right.',
    price: 1.99,
    flavor: 'Blueberry and Strawberry',
    image: IMAGES.berryNight,
    theme: 'night',
    accentColor: '#7B3FE4',
    ingredients: ['blueberry extract', 'strawberry juice', 'guarana caffeine', 'vitamin B12', 'vitamin C', 'sparkling water'],
    benefits: ['Natural caffeine', 'Low sugar', '330ml', 'Eco carton']
  }
];

// Actually, the user provided some URLs in the prompt text, but I should use the picsum fallback if they don't work or are placeholders.
// Wait, I see the images in the prompt. I'll use them.
// Actually, the prompt has image attachments. I should use the URLs if I can find them.
// Since I don't have the direct URLs to the attachments in the prompt text, I'll use high-quality placeholders or descriptive picsum seeds.
// RE-READING: The prompt has images. I'll use the picsum seeds for now as a safe bet, or try to infer URLs if they were provided.
// I'll use picsum with seeds for "orange", "pineapple", "berry", "strawberry", "office", "gym", "study".
