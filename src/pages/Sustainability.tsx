import React from 'react';
import { motion } from 'framer-motion';
import { Recycle, Leaf, Globe, ArrowRight } from 'lucide-react';
import { Section } from '../components/Section';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';

export const Sustainability: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-eco-green py-32 px-6 text-white text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl"
          >
            We made it recyclable. <br /> Now it's your turn.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl opacity-90 leading-relaxed"
          >
            Our paper-based cartons are 100% recyclable and have a lower carbon footprint than aluminum cans. We're committed to a cleaner planet.
          </motion.p>
        </div>
      </section>

      {/* Explanation */}
      <Section className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-5xl">Why paper?</h2>
            <p className="text-xl text-text-secondary dark:text-gray-400 leading-relaxed">
              Aluminum cans are energy-intensive to produce. Our paper-based cartons are sourced from FSC-certified forests and are lightweight, reducing transport emissions.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-xl bg-eco-green/10 flex items-center justify-center">
                  <Leaf className="text-eco-green" />
                </div>
                <h4>FSC Certified</h4>
                <p className="text-sm text-text-secondary dark:text-gray-400">Responsibly sourced wood fiber.</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-xl bg-eco-green/10 flex items-center justify-center">
                  <Globe className="text-eco-green" />
                </div>
                <h4>Low Footprint</h4>
                <p className="text-sm text-text-secondary dark:text-gray-400">Lower CO2 than cans or glass.</p>
              </div>
            </div>
          </div>
          <div className="rounded-[40px] overflow-hidden aspect-square bg-gray-200">
            <img src="https://picsum.photos/seed/forest/800" alt="Sustainability" className="w-full h-full object-cover" />
          </div>
        </div>
      </Section>

      {/* Can for Credits */}
      <Section className="bg-black/5 dark:bg-white/5">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-6">
            <h2 className="text-5xl">Can for Credits.</h2>
            <p className="text-xl text-text-secondary dark:text-gray-400 max-w-2xl mx-auto">
              Return your empty cartons, earn points on your digital profile, and redeem them for free drinks, merch, or event tickets.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { tier: 'Tier 1', cartons: '5 Cartons', reward: 'Free Drink', icon: Recycle },
              { tier: 'Tier 2', cartons: '20 Cartons', reward: 'Exclusive Merch', icon: Globe },
              { tier: 'Tier 3', cartons: '50 Cartons', reward: 'VIP Event Access', icon: ArrowRight },
            ].map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className={cn(
                  "p-12 rounded-[40px] shadow-sm text-center space-y-6 group hover:shadow-xl transition-all",
                  theme === 'day' ? 'bg-white text-text-primary' : 'bg-brand-dark text-white'
                )}
              >
                <div className="w-20 h-20 rounded-full bg-eco-green/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <tier.icon size={40} className="text-eco-green" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm uppercase tracking-widest text-eco-green">{tier.tier}</h4>
                  <h3 className="text-3xl font-display">{tier.cartons}</h3>
                </div>
                <p className="text-lg text-text-secondary dark:text-gray-400">Reward: {tier.reward}</p>
              </motion.div>
            ))}
          </div>

          <div className={cn(
            "max-w-2xl mx-auto rounded-[32px] p-8 space-y-6 shadow-sm border border-black/5 dark:border-white/5",
            theme === 'day' ? 'bg-white text-text-primary' : 'bg-brand-dark text-white'
          )}>
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-display">Your progress</h4>
              <span className="text-eco-green font-display">13 / 20 Cartons</span>
            </div>
            <div className="h-4 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '65%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
                className="h-full bg-eco-green"
              />
            </div>
            <p className="text-xs text-center text-text-secondary dark:text-gray-500">7 more cartons until Tier 2 reward!</p>
          </div>

          <div className="text-center">
            <button className="px-10 py-5 bg-eco-green text-white rounded-2xl hover:scale-105 transition-transform shadow-xl shadow-eco-green/20">
              Start earning credits
            </button>
          </div>
        </div>
      </Section>
    </div>
  );
};
