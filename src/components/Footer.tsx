import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, Twitter, Send } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';

export const Footer: React.FC = () => {
  const { theme } = useTheme();

  const footerLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Our Story', path: '/story' },
    { name: 'Sustainability', path: '/sustainability' },
    { name: 'Contact', path: '/contact' },
  ];

  const socialIcons = [
    { icon: Instagram, name: 'Instagram' },
    { icon: Youtube, name: 'Youtube' },
    { icon: Twitter, name: 'Twitter' },
    { icon: Send, name: 'TikTok' },
  ];

  return (
    <footer className={cn(
      'py-16 px-6 transition-colors duration-500',
      theme === 'day' ? 'bg-brand-bg' : 'bg-brand-dark'
    )}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <div className="max-w-md">
            <Link to="/" className="text-3xl font-display tracking-tight mb-4 block">
              <span className={theme === 'day' ? 'text-text-primary' : 'text-white'}>Innocent</span>{' '}
              <span className={theme === 'day' ? 'text-day-primary' : 'text-night-primary'}>Boost</span>
            </Link>
            <p className="text-text-secondary dark:text-gray-400 mb-8 max-w-sm">
              Clean energy for your day and your night. Made with real fruit, not funny business.
            </p>
            <div className="flex gap-4">
              {socialIcons.map((social, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div>
              <h4 className="font-display mb-6 text-lg">Explore</h4>
              <ul className="space-y-4">
                {footerLinks.map(link => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-text-secondary dark:text-gray-400 hover:text-day-primary dark:hover:text-night-primary transition-colors font-display">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display mb-6 text-lg">Legal</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-text-secondary dark:text-gray-400 hover:text-day-primary dark:hover:text-night-primary transition-colors font-display">Privacy Policy</a></li>
                <li><a href="#" className="text-text-secondary dark:text-gray-400 hover:text-day-primary dark:hover:text-night-primary transition-colors font-display">Terms of Service</a></li>
                <li><a href="#" className="text-text-secondary dark:text-gray-400 hover:text-day-primary dark:hover:text-night-primary transition-colors font-display">Cookie Settings</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-secondary dark:text-gray-500">
          <p>© 2026 Innocent Boost. Part of the Innocent family.</p>
          <p>All cartons 100% recyclable. Stay sharp. Stay innocent.</p>
        </div>
      </div>
    </footer>
  );
};
