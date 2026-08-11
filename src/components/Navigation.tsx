import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { DownloadIcon, MenuIcon, XIcon } from 'lucide-react';
import { navLinks, profile } from '../data/profile';
import { usePortfolio } from '../contexts/PortfolioContext';
import { ThemeToggle } from './ThemeToggle';
import { buttonStyles } from './Button';
import { cn } from '../utils/parse';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { resume } = usePortfolio();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open]);

  const linkClasses = ({ isActive }: {isActive: boolean;}) =>
  cn(
    'relative py-1 text-sm font-medium transition-colors duration-200',
    isActive ? 'text-fg' : 'text-muted hover:text-fg'
  );

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b transition-all duration-300',
        scrolled ? 'border-line bg-bg/85 backdrop-blur-xl' : 'border-transparent bg-bg/60 backdrop-blur-sm'
      )}>
      
      <div
        className={cn(
          'mx-auto flex max-w-content items-center justify-between px-5 transition-all duration-300 sm:px-8',
          scrolled ? 'h-14' : 'h-[4.5rem]'
        )}>
        
        <Link to="/" className="group flex items-center gap-3" aria-label={`${profile.name}, home`}>
          <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-line bg-surface shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:border-primary/50">
            <img
              src="/logo.png"
              alt="Priyanga V S Logo"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-sm font-semibold tracking-tight text-fg group-hover:text-primary transition-colors">{profile.name}</span>
            <span className="text-[0.7rem] uppercase tracking-[0.16em] text-muted">{profile.role}</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) =>
          <RouterNavLink key={link.to} to={link.to} className={linkClasses} end={link.to === '/'}>
              {({ isActive }) =>
            <>
                  {link.label}
                  <span
                aria-hidden="true"
                className={cn(
                  'absolute -bottom-0.5 left-0 h-px w-full origin-left bg-primary transition-transform duration-300',
                  isActive ? 'scale-x-100' : 'scale-x-0'
                )} />
              
                </>
            }
            </RouterNavLink>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {resume.url ?
          <a
            href={resume.url}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonStyles({ size: 'sm', className: 'hidden sm:inline-flex' })}>
            
              <DownloadIcon className="h-4 w-4" aria-hidden="true" />
              Resume
            </a> :
          null}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface text-fg lg:hidden">
            
            <MenuIcon className="h-[1.1rem] w-[1.1rem]" aria-hidden="true" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ?
        <motion.div
          key="mobile-menu"
          className="fixed inset-0 z-50 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}>
          
            <button
            type="button"
            aria-label="Close navigation menu"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-black/50 backdrop-blur-sm" />
          
            <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 flex h-full w-[min(20rem,85vw)] flex-col border-l border-line bg-bg p-6">
            
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-semibold text-fg">Menu</span>
                <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close navigation menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface text-fg">
                
                  <XIcon className="h-[1.1rem] w-[1.1rem]" aria-hidden="true" />
                </button>
              </div>
              <nav aria-label="Mobile" className="mt-8 flex flex-col gap-1">
                {navLinks.map((link) =>
              <RouterNavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                cn(
                  'rounded-xl px-4 py-3 text-base font-medium transition-colors',
                  isActive ? 'bg-primary-soft text-primary' : 'text-muted hover:bg-surface hover:text-fg'
                )
                }>
                
                    {link.label}
                  </RouterNavLink>
              )}
              </nav>
              {resume.url ?
            <a
              href={resume.url}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles({ className: 'mt-6 w-full' })}>
              
                  <DownloadIcon className="h-4 w-4" aria-hidden="true" />
                  Download Resume
                </a> :
            null}
            </motion.div>
          </motion.div> :
        null}
      </AnimatePresence>
    </header>);

}