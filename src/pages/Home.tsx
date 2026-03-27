import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Zap, Recycle } from 'lucide-react';
import { Section } from '../components/Section';
import { FloatingFruit } from '../components/FloatingFruit';
import { FloatingFruits } from '../components/FloatingElements';
import { useTheme } from '../context/ThemeContext';
import { PRODUCTS, IMAGES } from '../constants';
import { ShareButtons } from '../components/ShareButtons';
import { cn } from '../lib/utils';

export const Home: React.FC = () => {
  const { theme } = useTheme();
  const currentUrl = window.location.origin;
  const shareTitle = "Check out Innocent Boost! Clean energy for your day and night. 🥤✨";

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        <FloatingFruits theme={theme} />
        <div className="absolute inset-0 pointer-events-none">
          <FloatingFruit image={IMAGES.orangeSlice} top="20%" left="10%" delay={0} size={80} />
          <FloatingFruit image={IMAGES.mintLeaves} top="60%" left="15%" delay={1} duration={7} size={60} />
          <FloatingFruit image={IMAGES.blueberries} top="30%" right="12%" delay={0.5} duration={8} size={70} />
          <FloatingFruit image={IMAGES.strawberry} top="70%" right="18%" delay={1.5} size={90} />
          <FloatingFruit image={IMAGES.iceCubes} top="15%" right="40%" delay={2} duration={9} size={50} />
        </div>

        <div className="max-w-7xl mx-auto text-center z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-display tracking-tight mb-6"
          >
            Stay sharp. <br />
            <span className={theme === 'day' ? 'text-day-primary' : 'text-night-primary'}>Stay innocent.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl font-display text-text-secondary dark:text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            Clean energy for your day and your night.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative flex flex-row items-center justify-center gap-4 md:gap-12 mb-16"
          >
            <div className="relative group flex-1 md:flex-none">
              <motion.img
                src={IMAGES.orangePine}
                alt="Orange Pine Boost"
                className="h-[250px] sm:h-[350px] md:h-[500px] w-full md:w-auto object-contain drop-shadow-[0_35px_35px_rgba(255,138,0,0.3)] group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative group flex-1 md:flex-none">
              <motion.img
                src={IMAGES.berryNight}
                alt="Berry Night Boost"
                className="h-[250px] sm:h-[350px] md:h-[500px] w-full md:w-auto object-contain drop-shadow-[0_35px_35px_rgba(123,63,228,0.3)] group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link
              to="/shop"
              className={cn(
                "px-10 py-5 rounded-2xl text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl",
                theme === 'day' ? 'bg-day-primary shadow-day-primary/20' : 'bg-night-primary shadow-night-primary/20'
              )}
            >
              Grab your boost
            </Link>
            <Link
              to="/story"
              className="px-10 py-5 rounded-2xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300"
            >
              Explore our story
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Product Duo Showcase */}
      <Section className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ x: i === 0 ? -50 : 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={cn(
                "rounded-[40px] p-12 flex flex-col md:flex-row items-center gap-8 overflow-hidden relative group",
                product.theme === 'day' ? 'bg-day-accent/10' : 'bg-night-accent/10'
              )}
            >
              <div className="flex-1 space-y-6 z-10">
                <div className={cn(
                  "inline-block px-4 py-1 rounded-full text-xs uppercase tracking-widest text-white",
                  product.theme === 'day' ? 'bg-day-primary' : 'bg-night-primary'
                )}>
                  {product.theme === 'day' ? 'Day Energy' : 'Night Focus'}
                </div>
                <h2 className="text-4xl">{product.name}</h2>
                <p className="text-text-secondary dark:text-gray-400 font-display">{product.tagline}</p>
                <Link
                  to={`/product/${product.id}`}
                  className="inline-flex items-center gap-2 group/btn"
                >
                  Shop now <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="relative w-48 h-64 flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className={cn(
                "absolute -bottom-20 -right-20 w-64 h-64 blur-[100px] opacity-20",
                product.theme === 'day' ? 'bg-day-primary' : 'bg-night-primary'
              )} />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Why Innocent Boost */}
      <Section className="bg-black/5 dark:bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-16">
            {[
              { icon: Leaf, title: 'Real ingredients', desc: 'Natural fruit, plant-based caffeine. No funny business.' },
              { icon: Zap, title: 'Clean energy', desc: 'No crash, no jitters. Just smooth focus for your day.' },
              { icon: Recycle, title: 'Eco packaging', desc: '100% recyclable paper cartons. Kind to you, kind to earth.' },
            ].map((usp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="text-center space-y-6 group"
              >
                <div className="w-20 h-20 rounded-3xl bg-white dark:bg-brand-dark shadow-lg flex items-center justify-center mx-auto transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <usp.icon size={40} className="text-eco-green" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-display">{usp.title}</h3>
                  <p className="text-text-secondary dark:text-gray-400 leading-relaxed">{usp.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Lifestyle Section */}
      <Section className="px-0 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center gap-8 mb-20"
          >
            <div className="max-w-5xl mx-auto">
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-display tracking-tighter leading-tight mb-8">
                Made for <span className={theme === 'day' ? 'text-day-primary' : 'text-night-primary'}>lifelong energy.</span>
              </h2>
              <p className="text-xl md:text-2xl text-text-secondary dark:text-gray-400 font-display max-w-2xl mx-auto">
                From the morning rush to the late night grind, we've got the boost you need.
              </p>
            </div>
          </motion.div>

          <div className="flex overflow-x-auto md:justify-center pb-20 gap-8 no-scrollbar cursor-grab active:cursor-grabbing">
            {[
              { img: IMAGES.lifestyleOffice, title: 'The Office Hero', desc: 'Keep the ideas flowing without the coffee jitters.' },
              { img: IMAGES.lifestyleStudy, title: 'The Night Owl', desc: 'Sharpen your focus for those late night study sessions.' },
              { img: IMAGES.lifestyleGym, title: 'The Performance Pro', desc: 'Clean energy for your peak performance.' },
            ].map((scene, i) => (
              <motion.div
                key={i}
                className="flex-shrink-0 w-[220px] md:w-[320px] group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="relative aspect-[3/4] rounded-[48px] overflow-hidden mb-8 shadow-2xl shadow-black/5">
                  <motion.img 
                    src={scene.img} 
                    alt={scene.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className={cn(
                    "absolute top-8 left-8 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shadow-sm backdrop-blur-md",
                    theme === 'day' ? 'bg-white/90 text-brand-dark' : 'bg-night-primary text-white'
                  )}>
                    0{i + 1}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="px-4 space-y-3 text-center">
                  <h3 className="text-3xl md:text-4xl font-display tracking-tight transition-transform duration-300">
                    {scene.title}
                  </h3>
                  <p className="text-lg text-text-secondary dark:text-gray-400 italic leading-relaxed max-w-xs mx-auto">
                    "{scene.desc}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Can for Credits Teaser */}
      <Section className="max-w-7xl mx-auto">
        <div className="bg-eco-green rounded-[40px] p-12 md:p-20 text-white flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
          <div className="flex-1 space-y-8 z-10">
            <h2 className="text-5xl md:text-7xl leading-tight">Drink it. Return it. <br /> Get rewarded.</h2>
            <p className="text-xl opacity-90 max-w-md">Our recycling reward system is simple. Return your cartons, earn points, and get free boosts.</p>
            <div className="space-y-4">
              <div className="h-4 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '65%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-white"
                />
              </div>
              <div className="flex justify-between text-sm uppercase tracking-widest">
                <span>Tier 1: 5 cartons</span>
                <span>Tier 2: 20 cartons</span>
              </div>
            </div>
            <Link
              to="/sustainability"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-eco-green rounded-2xl hover:scale-105 transition-transform"
            >
              Learn more about Can for Credits
            </Link>
          </div>
          <div className="relative w-full md:w-1/3 aspect-square flex items-center justify-center">
             <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-4 border-dashed border-white/30 rounded-full"
             />
             <Recycle size={120} className="relative z-10" />
          </div>
        </div>
      </Section>

      {/* Social Share Section */}
      <Section className="bg-black/5 dark:bg-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-4xl">Spread the boost.</h2>
            <p className="text-text-secondary dark:text-gray-400">Love Innocent Boost? Share it with your friends and help us grow!</p>
          </div>
          <ShareButtons url={currentUrl} title={shareTitle} className="items-center md:items-end" />
        </div>
      </Section>

      {/* Footer CTA */}
      <Section className="text-center space-y-12">
        <h2 className="text-5xl md:text-7xl max-w-4xl mx-auto">Your body deserves better energy.</h2>
        <Link
          to="/shop"
          className={cn(
            "inline-block px-12 py-6 rounded-2xl text-xl text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl",
            theme === 'day' ? 'bg-day-primary shadow-day-primary/30' : 'bg-night-primary shadow-night-primary/30'
          )}
        >
          Shop now
        </Link>
      </Section>
    </div>
  );
};
