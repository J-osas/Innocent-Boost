import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Section } from '../components/Section';
import { FloatingFruit } from '../components/FloatingFruit';
import { useTheme } from '../context/ThemeContext';
import { IMAGES } from '../constants';
import { cn } from '../lib/utils';

export const OurStory: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-32 px-6 text-center max-w-4xl mx-auto space-y-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <FloatingFruit image="https://picsum.photos/seed/story1/100" top="10%" left="5%" delay={0} size={50} />
          <FloatingFruit image="https://picsum.photos/seed/story2/100" bottom="10%" right="5%" delay={1} size={60} />
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl"
        >
          The story of <br />
          <span className={theme === 'day' ? 'text-day-primary' : 'text-night-primary'}>Innocent Boost.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-text-secondary dark:text-gray-400 leading-relaxed"
        >
          We believe energy drinks don't have to be aggressive, artificial, or full of junk. We wanted to create something that feels as good as it works.
        </motion.p>
      </section>

      {/* Mission */}
      <Section className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="rounded-[40px] overflow-hidden aspect-square bg-gray-200">
            <img src={IMAGES.lifestyleOffice} alt="Our Mission" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-8">
            <h2 className="text-5xl">Our mission.</h2>
            <p className="text-xl text-text-secondary dark:text-gray-400 leading-relaxed">
              Innocent Boost was born from a simple idea: clean energy for real life. Whether you're crushing a deadline, studying for finals, or hitting the gym, you deserve a boost that's kind to your body.
            </p>
            <p className="text-xl text-text-secondary dark:text-gray-400 leading-relaxed">
              We've taken the best of nature—real fruit and plant-based caffeine—and packed it into a sustainable carton. No jitters, no crash, just pure focus.
            </p>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section className="bg-black/5 dark:bg-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl text-center mb-20">What we stand for.</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: 'Real ingredients', desc: 'We use real fruit juices and extracts. No artificial flavors, no funny business.', color: 'text-day-primary' },
              { title: 'Clean energy', desc: 'Our caffeine comes from green tea and guarana. It’s energy that feels natural.', color: 'text-night-primary' },
              { title: 'Sustainable future', desc: 'Our paper-based cartons are 100% recyclable and have a lower footprint than cans.', color: 'text-eco-green' },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white dark:bg-brand-dark p-12 rounded-[40px] shadow-sm space-y-6"
              >
                <h3 className={cn("text-3xl", value.color)}>{value.title}</h3>
                <p className="text-text-secondary dark:text-gray-400 text-lg leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="text-center space-y-12">
        <h2 className="text-5xl md:text-7xl max-w-4xl mx-auto">Try it for yourself.</h2>
        <Link
          to="/shop"
          className={cn(
            "inline-block px-12 py-6 rounded-2xl text-xl text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl",
            theme === 'day' ? 'bg-day-primary shadow-day-primary/30' : 'bg-night-primary shadow-night-primary/30'
          )}
        >
          Shop the range
        </Link>
      </Section>
    </div>
  );
};
