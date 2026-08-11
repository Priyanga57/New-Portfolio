import React from 'react';
import { Link } from 'react-router-dom';
import { navLinks, profile, socialLinks } from '../data/profile';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-content gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-line bg-surface shadow-sm">
              <img
                src="/logo.png"
                alt="Priyanga V S Logo"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="font-display text-lg font-semibold tracking-tight text-fg">{profile.name}</p>
              <p className="text-xs uppercase tracking-[0.18em] text-primary">{profile.role}</p>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            SQL, Python, Excel and Power BI used to clean, model and visualize data so teams can make decisions with
            confidence.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Explore</h2>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((link) =>
            <li key={link.to}>
                <Link to={link.to} className="text-sm text-muted transition-colors hover:text-primary">
                  {link.label}
                </Link>
              </li>
            )}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Connect</h2>
          <ul className="mt-4 space-y-2.5">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              const external = social.href.startsWith('http');
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="group inline-flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-primary">
                    
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    <span>{social.display}</span>
                    <span className="sr-only">{social.label}</span>
                  </a>
                </li>);

            })}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-content flex-col gap-2 px-5 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <p>{profile.location}</p>
        </div>
      </div>
    </footer>);

}