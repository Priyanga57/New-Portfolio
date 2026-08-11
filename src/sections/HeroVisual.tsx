import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { education } from '../data/profile';

const BARS = [42, 68, 55, 84, 61, 92];
const LINE_POINTS = '0,86 40,72 80,78 120,52 160,58 200,34 240,40 280,18';

/** Restrained, dashboard-inspired hero graphic: no fabricated figures, structure only. */
export function HeroVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative" aria-hidden="true">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl border border-line bg-surface p-5 shadow-glow">
        
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.16em] text-muted">Analysis workflow</p>
            <p className="mt-1 font-display text-sm font-semibold text-fg">Data → Insight</p>
          </div>
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="h-2 w-2 rounded-full bg-line-strong" />
          </div>
        </div>

        <div className="mt-5">
          <svg viewBox="0 0 280 100" className="h-28 w-full" role="presentation" focusable="false">
            <defs>
              <linearGradient id="hero-line" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--primary)" />
                <stop offset="100%" stopColor="var(--accent)" />
              </linearGradient>
            </defs>
            {[20, 45, 70, 95].map((y) =>
            <line key={y} x1="0" y1={y} x2="280" y2={y} stroke="var(--border)" strokeWidth="1" />
            )}
            <motion.polyline
              points={LINE_POINTS}
              fill="none"
              stroke="url(#hero-line)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={reduceMotion ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, delay: 0.35, ease: 'easeInOut' }} />
            
            {LINE_POINTS.split(' ').map((point) => {
              const [x, y] = point.split(',');
              return <circle key={point} cx={x} cy={y} r="2.5" fill="var(--primary)" />;
            })}
          </svg>
        </div>

        <div className="mt-5 flex h-24 items-end gap-2.5 border-t border-line pt-5">
          {BARS.map((height, index) =>
          <motion.span
            key={index}
            className="flex-1 rounded-t-md"
            style={{ background: index % 2 === 0 ? 'var(--primary-soft)' : 'var(--accent-soft)' }}
            initial={reduceMotion ? false : { height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{ duration: 0.6, delay: 0.5 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}>
            
              <span
              className="block h-1 w-full rounded-t-md"
              style={{ background: index % 2 === 0 ? 'var(--primary)' : 'var(--accent)' }} />
            
            </motion.span>
          )}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-line pt-5">
          <div className="rounded-xl border border-line bg-surface2 px-3 py-2.5">
            <p className="text-[0.65rem] uppercase tracking-[0.14em] text-muted">Degree</p>
            <p className="mt-1 text-xs font-medium leading-snug text-fg">B.Tech AI &amp; Data Science</p>
          </div>
          <div className="rounded-xl border border-line bg-surface2 px-3 py-2.5">
            <p className="text-[0.65rem] uppercase tracking-[0.14em] text-muted">CGPA</p>
            <p className="mt-1 font-display text-lg font-semibold text-fg">{education.cgpa}</p>
          </div>
        </div>
      </motion.div>
    </div>);

}