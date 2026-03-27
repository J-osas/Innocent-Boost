import React, { useState } from 'react';
import { Twitter, Facebook, Link as LinkIcon, Check, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

interface ShareButtonsProps {
  url: string;
  title: string;
  className?: string;
  variant?: 'minimal' | 'full';
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ 
  url, 
  title, 
  className,
  variant = 'full'
}) => {
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'hover:text-[#1DA1F2]'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:text-[#1877F2]'
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  if (variant === 'minimal') {
    return (
      <div className={cn("relative", className)}>
        <button
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowTooltip(!showTooltip);
          }}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Share"
        >
          <Share2 size={18} />
        </button>
        
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-full right-0 mb-2 p-2 bg-white dark:bg-brand-dark rounded-xl shadow-xl border border-black/5 dark:border-white/5 flex items-center gap-2 z-50"
            >
              {shareLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn("p-2 transition-colors", link.color)}
                  onClick={(e) => e.stopPropagation()}
                >
                  <link.icon size={18} />
                </a>
              ))}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  copyToClipboard();
                }}
                className="p-2 hover:text-eco-green transition-colors"
              >
                {copied ? <Check size={18} /> : <LinkIcon size={18} />}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <h3 className="text-sm font-display uppercase tracking-widest opacity-60">Share the boost</h3>
      <div className="flex items-center gap-3">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center transition-all hover:scale-110 active:scale-95",
              link.color
            )}
            title={`Share on ${link.name}`}
          >
            <link.icon size={20} />
          </a>
        ))}
        <button
          onClick={copyToClipboard}
          className="w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center transition-all hover:scale-110 active:scale-95 hover:text-eco-green"
          title="Copy link"
        >
          {copied ? <Check size={20} /> : <LinkIcon size={20} />}
        </button>
      </div>
    </div>
  );
};
