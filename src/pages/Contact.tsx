import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import { Section } from '../components/Section';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';

export const Contact: React.FC = () => {
  const { theme } = useTheme();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="pt-32 min-h-screen">
      <Section className="max-w-4xl mx-auto">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-6xl md:text-8xl">Say hello.</h1>
          <p className="text-xl md:text-2xl text-text-secondary dark:text-gray-400 max-w-2xl mx-auto">
            Got a question? A big idea? Just want to say hi? We're all ears. We don't bite.
          </p>
        </div>

        <div className="bg-black/5 dark:bg-white/5 rounded-[40px] p-8 md:p-16 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm uppercase tracking-widest opacity-60 ml-2">Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Your name"
                      className={cn(
                        "w-full px-6 py-4 rounded-2xl transition-all outline-none border-none focus:ring-2",
                        theme === 'day' 
                          ? "bg-white text-brand-dark placeholder:text-gray-400 focus:ring-day-primary" 
                          : "bg-brand-dark text-white placeholder:text-gray-500 focus:ring-night-primary"
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm uppercase tracking-widest opacity-60 ml-2">Email</label>
                    <input
                      required
                      type="email"
                      placeholder="Your email"
                      className={cn(
                        "w-full px-6 py-4 rounded-2xl transition-all outline-none border-none focus:ring-2",
                        theme === 'day' 
                          ? "bg-white text-brand-dark placeholder:text-gray-400 focus:ring-day-primary" 
                          : "bg-brand-dark text-white placeholder:text-gray-500 focus:ring-night-primary"
                      )}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm uppercase tracking-widest opacity-60 ml-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="What's on your mind?"
                    className={cn(
                      "w-full px-6 py-4 rounded-2xl transition-all outline-none border-none focus:ring-2 resize-none",
                      theme === 'day' 
                        ? "bg-white text-brand-dark placeholder:text-gray-400 focus:ring-day-primary" 
                        : "bg-brand-dark text-white placeholder:text-gray-500 focus:ring-night-primary"
                    )}
                  />
                </div>
                <button
                  type="submit"
                  className={cn(
                    "w-full py-5 rounded-2xl text-white flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-xl",
                    theme === 'day' ? 'bg-day-primary shadow-day-primary/20' : 'bg-night-primary shadow-night-primary/20'
                  )}
                >
                  Send message <Send size={20} />
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-eco-green/10 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={48} className="text-eco-green" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-4xl">Message sent!</h3>
                  <p className="text-xl text-text-secondary dark:text-gray-400">We'll get back to you faster than you can say "Innocent Boost".</p>
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-sm underline underline-offset-4"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {['Instagram', 'TikTok', 'YouTube', 'Twitter'].map(social => (
            <a
              key={social}
              href="#"
              className="p-8 rounded-3xl bg-black/5 dark:bg-white/5 text-center hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            >
              {social}
            </a>
          ))}
        </div>
      </Section>
    </div>
  );
};
