import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserIcon,
  GraduationCapIcon,
  BriefcaseIcon,
  CpuIcon,
  AwardIcon,
  BarChart3Icon,
  MailIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  FootprintsIcon,
  SparklesIcon
} from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';

interface MilestoneNode {
  id: string;
  step: string;
  title: string;
  tag: string;
  icon: React.ElementType;
  route: string;
  /** x in the 1090-wide SVG viewBox (Desktop) */
  x: number;
  /** y in the 380-tall SVG viewBox (Desktop) */
  y: number;
  /** label floats above the node (true) or below (false) */
  labelUp: boolean;
}

const milestones: MilestoneNode[] = [
  { id: 'about', step: '01', title: 'About Me', tag: 'Bio & Background', icon: UserIcon, route: '/about', x: 80, y: 190, labelUp: true },
  { id: 'education', step: '02', title: 'Education', tag: 'B.Tech AI & DS', icon: GraduationCapIcon, route: '/about', x: 230, y: 80, labelUp: false },
  { id: 'internships', step: '03', title: 'Internships', tag: 'Industry Training', icon: BriefcaseIcon, route: '/experience', x: 390, y: 290, labelUp: true },
  { id: 'skills', step: '04', title: 'Skills', tag: 'Tech Stack & Tools', icon: CpuIcon, route: '/skills', x: 560, y: 80, labelUp: false },
  { id: 'certificates', step: '05', title: 'Certificates', tag: 'Verified Badges', icon: AwardIcon, route: '/certificates', x: 720, y: 290, labelUp: true },
  { id: 'projects', step: '06', title: 'Projects', tag: 'Analytics Case Studies', icon: BarChart3Icon, route: '/projects', x: 880, y: 80, labelUp: false },
  { id: 'contact', step: '07', title: 'Contact', tag: 'Get in Touch', icon: MailIcon, route: '/contact', x: 1010, y: 190, labelUp: true },
];

/* Organic winding path connecting all 7 nodes (Desktop) */
const PATH =
  'M 80 190 C 140 190,180 80,230 80 ' +
  'C 280 80,330 290,390 290 ' +
  'C 460 290,500 80,560 80 ' +
  'C 620 80,660 290,720 290 ' +
  'C 780 290,820 80,880 80 ' +
  'C 940 80,990 190,1010 190';

/* Midpoints between each pair of nodes - footprints land here */
const MIDPOINTS = [
  { x: 155, y: 135, angle: -35 },
  { x: 310, y: 185, angle: 35 },
  { x: 475, y: 185, angle: -35 },
  { x: 640, y: 185, angle: 35 },
  { x: 800, y: 185, angle: -35 },
  { x: 945, y: 135, angle: 35 },
];

export function MilestonePath() {
  const navigate = useNavigate();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const handleNodeClick = (route: string) => {
    if (route.includes('#')) {
      const [path, hash] = route.split('#');
      if (window.location.pathname !== path) {
        navigate(path);
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(route);
    }
  };

  return (
    <section
      className="relative border-b border-line py-14 sm:py-20 overflow-hidden"
      aria-labelledby="milestone-heading"
    >
      {/* Subtle dot backdrop - matches Hero and other sections */}
      <div className="dot-backdrop pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      {/* Glow orb */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-72 w-[36rem] rounded-full opacity-60 blur-3xl"
        style={{ background: 'var(--glow)' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-content px-5 sm:px-8">
        {/* Header */}
        <div id="milestone-heading">
          <SectionHeading
            eyebrow="Interactive Journey"
            title="Milestone Path"
            description="Click any glowing node to explore that section - follow the path step by step."
          />
        </div>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/*  1. MOBILE VIEW (< 768px): Vertical Interactive Step Journey Trail  */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <div className="mt-10 block md:hidden">
          <div className="relative pl-6 sm:pl-8">
            {/* Vertical Dotted Trail Line */}
            <div className="absolute left-[29px] sm:left-[37px] top-6 bottom-8 w-0.5 border-l-2 border-dashed border-primary/40" />

            <div className="space-y-6">
              {milestones.map((node, idx) => {
                const Icon = node.icon;
                const isLast = idx === milestones.length - 1;

                return (
                  <div key={node.id} className="relative">
                    <Reveal delay={idx * 0.05}>
                      <motion.div
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleNodeClick(node.route)}
                        className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-line bg-surface p-4 shadow-card transition-all duration-200 hover:border-primary hover:bg-primary-soft/40"
                      >
                        {/* Node Icon Circle */}
                        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-line bg-surface text-primary shadow-sm transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_0_20px_var(--glow)]">
                          <Icon className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />

                          {/* Step Badge */}
                          <span className="absolute -top-1.5 -left-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-line bg-surface text-[0.6rem] font-bold text-muted shadow-sm group-hover:border-primary group-hover:text-primary">
                            {node.step}
                          </span>
                        </div>

                        {/* Text Details */}
                        <div className="flex-1 min-w-0">
                          <span className="text-[0.65rem] font-bold uppercase tracking-wider text-primary">
                            Step {node.step}
                          </span>
                          <h3 className="font-display text-base font-bold text-fg group-hover:text-primary transition-colors truncate">
                            {node.title}
                          </h3>
                          <p className="text-xs text-muted truncate">
                            {node.tag}
                          </p>
                        </div>

                        {/* Chevron Arrow Action */}
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface2 text-muted transition-colors group-hover:bg-primary group-hover:text-white">
                          <ChevronRightIcon className="h-4 w-4" />
                        </div>
                      </motion.div>
                    </Reveal>

                    {/* Footsteps between nodes on mobile */}
                    {!isLast && (
                      <div className="my-1 flex items-center justify-start pl-[22px] sm:pl-[30px] opacity-40">
                        <FootprintsIcon className="h-3.5 w-3.5 text-primary rotate-90" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/*  2. DESKTOP / TABLET VIEW (>= 768px): Horizontal Adventure Canvas  */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <div className="relative mt-12 hidden md:block w-full">
          {/* 1090 : 380 aspect ratio */}
          <div className="relative w-full" style={{ paddingTop: '34.86%' }}>
            <div className="absolute inset-0">

              {/* SVG Trail */}
              <svg
                className="absolute inset-0 overflow-visible pointer-events-none"
                viewBox="0 0 1090 380"
                fill="none"
                style={{ width: '100%', height: '100%' }}
              >
                <defs>
                  <linearGradient id="msTrail" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.5" />
                    <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.5" />
                  </linearGradient>

                  <filter id="msGlow" x="-10%" y="-40%" width="120%" height="180%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Ghost dotted trace line */}
                <path
                  d={PATH}
                  stroke="var(--primary)"
                  strokeOpacity="0.18"
                  strokeWidth="3.5"
                  strokeDasharray="6 13"
                  strokeLinecap="round"
                />

                {/* Animated drawing trail */}
                <motion.path
                  d={PATH}
                  stroke="url(#msTrail)"
                  strokeWidth="3"
                  strokeDasharray="8 11"
                  strokeLinecap="round"
                  fill="none"
                  filter="url(#msGlow)"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2.4, ease: 'easeInOut' }}
                />

                {/* Travelling orb */}
                <motion.circle
                  r="5"
                  fill="var(--primary)"
                  style={{
                    filter: 'drop-shadow(0 0 5px var(--glow))',
                    offsetPath: `path('${PATH}')`,
                  }}
                  animate={{ offsetDistance: ['0%', '100%'] }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                />
              </svg>

              {/* Footprints */}
              {MIDPOINTS.map((fp, idx) => {
                const isActive = hoveredIdx === idx;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: isActive ? 1 : 0.45, scale: 1 }}
                    animate={{ opacity: isActive ? 1 : 0.45 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.09 }}
                    className="absolute pointer-events-none z-[5]"
                    style={{
                      left: `${(fp.x / 1090) * 100}%`,
                      top: `${(fp.y / 380) * 100}%`,
                      transform: `translate(-50%, -50%) rotate(${fp.angle}deg)`,
                    }}
                  >
                    <motion.div
                      animate={isActive ? { y: [0, -5, 0] } : {}}
                      transition={{ duration: 0.5, repeat: isActive ? Infinity : 0 }}
                    >
                      <FootprintsIcon
                        className="h-5 w-5 transition-colors duration-300"
                        style={{
                          color: isActive ? 'var(--primary)' : 'var(--muted)',
                          filter: isActive ? 'drop-shadow(0 0 5px var(--glow))' : 'none',
                        }}
                      />
                    </motion.div>
                  </motion.div>
                );
              })}

              {/* Milestone Nodes */}
              {milestones.map((node, idx) => {
                const Icon = node.icon;
                const isHovered = hoveredIdx === idx;

                /* Label card */
                const labelCard = (
                  <motion.div
                    animate={isHovered
                      ? { y: node.labelUp ? -4 : 4, opacity: 1 }
                      : { y: 0, opacity: 0.85 }}
                    transition={{ duration: 0.22 }}
                    className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-1.5 shadow-card backdrop-blur-sm transition-colors duration-300 group-hover:border-primary group-hover:bg-primary-soft"
                  >
                    <span className="font-display text-xs font-bold tracking-tight text-fg group-hover:text-primary transition-colors whitespace-nowrap">
                      {node.title}
                    </span>
                    <AnimatePresence>
                      {isHovered && (
                        <motion.span
                          initial={{ opacity: 0, x: -3 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 3 }}
                          transition={{ duration: 0.18 }}
                        >
                          <ArrowRightIcon className="h-3 w-3 text-primary shrink-0" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );

                return (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, scale: 0.75, y: node.labelUp ? -14 : 14 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.42, delay: idx * 0.08, type: 'spring', stiffness: 120 }}
                    className="absolute z-10 flex flex-col items-center"
                    style={{
                      left: `${(node.x / 1090) * 100}%`,
                      top: `${(node.y / 380) * 100}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  >
                    <button
                      onClick={() => handleNodeClick(node.route)}
                      className="group relative flex flex-col items-center focus:outline-none"
                      aria-label={`Go to ${node.title}`}
                    >
                      {/* Label ABOVE node */}
                      {node.labelUp && (
                        <div className="mb-2.5">{labelCard}</div>
                      )}

                      {/* Glow ring */}
                      <motion.span
                        animate={isHovered ? { opacity: 1, scale: 1.3 } : { opacity: 0.4, scale: 1 }}
                        transition={{ duration: 0.28 }}
                        className="absolute -inset-3 rounded-full pointer-events-none"
                        style={{ background: 'var(--glow)', filter: 'blur(10px)' }}
                      />

                      {/* Step badge */}
                      <span className="absolute -top-1.5 -right-1.5 z-20 flex h-5 w-5 items-center justify-center rounded-full border border-line bg-surface text-[0.58rem] font-bold text-muted shadow-card">
                        {node.step}
                      </span>

                      {/* Main circle */}
                      <motion.div
                        animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                        transition={{ duration: 0.22, type: 'spring', stiffness: 220 }}
                        className="relative z-10 flex h-[58px] w-[58px] items-center justify-center rounded-full border-2 border-line bg-surface text-muted shadow-card transition-colors duration-300 group-hover:border-primary group-hover:bg-primary-soft group-hover:text-primary"
                        style={isHovered ? { boxShadow: 'var(--shadow-card), 0 0 0 3px var(--primary-soft)' } : {}}
                      >
                        <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                      </motion.div>

                      {/* Label BELOW node */}
                      {!node.labelUp && (
                        <div className="mt-2.5">{labelCard}</div>
                      )}
                    </button>
                  </motion.div>
                );
              })}

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
