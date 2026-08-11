import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CodeIcon, LibraryIcon, BarChart3Icon, LayersIcon,
  BrainCircuitIcon, MonitorIcon, UsersIcon, CheckCircle2Icon,
  SparklesIcon, TrendingUpIcon, ZapIcon
} from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';

/* ── Enriched skill data with proficiency & accent color ── */
interface Skill {
  name: string;
  level: number; // 0‑100
}

interface SkillCategory {
  id: string;
  label: string;
  icon: React.ElementType;
  accent: string;          // Tailwind bg class for icon bg
  accentText: string;      // Tailwind text class
  accentBorder: string;    // Tailwind border class
  description: string;
  skills: Skill[];
}

const categories: SkillCategory[] = [
  {
    id: 'languages',
    label: 'Languages',
    icon: CodeIcon,
    accent: 'bg-blue-500/10 dark:bg-blue-500/15',
    accentText: 'text-blue-600 dark:text-blue-400',
    accentBorder: 'border-blue-200 dark:border-blue-800/60',
    description: 'Core programming languages used for data extraction and analysis.',
    skills: [
      { name: 'Python',  level: 85 },
      { name: 'SQL',     level: 90 },
    ],
  },
  {
    id: 'libraries',
    label: 'Libraries',
    icon: LibraryIcon,
    accent: 'bg-violet-500/10 dark:bg-violet-500/15',
    accentText: 'text-violet-600 dark:text-violet-400',
    accentBorder: 'border-violet-200 dark:border-violet-800/60',
    description: 'Python libraries powering data wrangling and visualization.',
    skills: [
      { name: 'Pandas',      level: 88 },
      { name: 'NumPy',       level: 80 },
      { name: 'Matplotlib',  level: 75 },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & BI',
    icon: BarChart3Icon,
    accent: 'bg-emerald-500/10 dark:bg-emerald-500/15',
    accentText: 'text-emerald-600 dark:text-emerald-400',
    accentBorder: 'border-emerald-200 dark:border-emerald-800/60',
    description: 'BI platforms and productivity tools used for reporting.',
    skills: [
      { name: 'Power BI',       level: 85 },
      { name: 'Excel',          level: 90 },
      { name: 'MySQL',          level: 82 },
      { name: 'Google Sheets',  level: 88 },
    ],
  },
  {
    id: 'core',
    label: 'Core Skills',
    icon: LayersIcon,
    accent: 'bg-amber-500/10 dark:bg-amber-500/15',
    accentText: 'text-amber-600 dark:text-amber-400',
    accentBorder: 'border-amber-200 dark:border-amber-800/60',
    description: 'Data analysis fundamentals applied across every project.',
    skills: [
      { name: 'Data Cleaning',          level: 92 },
      { name: 'EDA',                    level: 88 },
      { name: 'Data Modeling',          level: 80 },
      { name: 'KPI Reporting',          level: 85 },
      { name: 'Dashboard Development',  level: 83 },
      { name: 'Data Visualization',     level: 87 },
      { name: 'Business Intelligence',  level: 82 },
    ],
  },
  {
    id: 'ml',
    label: 'Machine Learning',
    icon: BrainCircuitIcon,
    accent: 'bg-pink-500/10 dark:bg-pink-500/15',
    accentText: 'text-pink-600 dark:text-pink-400',
    accentBorder: 'border-pink-200 dark:border-pink-800/60',
    description: 'Supervised ML techniques for predictive modeling.',
    skills: [
      { name: 'Classification',      level: 78 },
      { name: 'Regression',          level: 80 },
      { name: 'Feature Engineering', level: 75 },
      { name: 'Model Evaluation',    level: 77 },
    ],
  },
  {
    id: 'platforms',
    label: 'Platforms',
    icon: MonitorIcon,
    accent: 'bg-sky-500/10 dark:bg-sky-500/15',
    accentText: 'text-sky-600 dark:text-sky-400',
    accentBorder: 'border-sky-200 dark:border-sky-800/60',
    description: 'Development environments used for analysis workflows.',
    skills: [
      { name: 'Jupyter Notebook',   level: 90 },
      { name: 'Visual Studio Code', level: 85 },
    ],
  },
  {
    id: 'soft',
    label: 'Soft Skills',
    icon: UsersIcon,
    accent: 'bg-orange-500/10 dark:bg-orange-500/15',
    accentText: 'text-orange-600 dark:text-orange-400',
    accentBorder: 'border-orange-200 dark:border-orange-800/60',
    description: 'Professional qualities that complement technical expertise.',
    skills: [
      { name: 'Analytical Thinking', level: 92 },
      { name: 'Problem Solving',     level: 90 },
      { name: 'Communication',       level: 85 },
      { name: 'Leadership',          level: 80 },
    ],
  },
];

/* ── Highlight stats ── */
const highlights = [
  { icon: ZapIcon,         value: '7+',     label: 'Skill Categories'    },
  { icon: TrendingUpIcon,  value: '25+',    label: 'Tools & Technologies' },
  { icon: SparklesIcon,    value: '90%',    label: 'SQL Proficiency'     },
  { icon: CheckCircle2Icon,value: '3+',     label: 'Years of Learning'   },
];

/* ── Proficiency bar ── */
function ProficiencyBar({ name, level, delay = 0, accentText }: {
  name: string; level: number; delay?: number; accentText: string;
}) {
  return (
    <div className="group">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm font-medium text-fg">{name}</span>
        <span className={`text-xs font-semibold tabular-nums ${accentText}`}>{level}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface2 border border-line">
        <motion.div
          className={`h-full rounded-full`}
          style={{ background: 'var(--primary)' }}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  const [activeId, setActiveId] = useState<string>(categories[0].id);
  const active = categories.find((c) => c.id === activeId) ?? categories[0];
  const Icon = active.icon;

  return (
    <section className="border-b border-line py-16 sm:py-20" aria-labelledby="skills-heading">
      <div className="mx-auto max-w-content px-5 sm:px-8">

        {/* ── Header ── */}
        <div id="skills-heading">
          <SectionHeading
            eyebrow="Technical toolkit"
            title="Skills built for analysis & decision support"
            description="The full stack used across data extraction, cleaning, modeling and visualization."
          />
        </div>

        {/* ── Highlight Stats Row ── */}
        <Reveal>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {highlights.map((h, i) => {
              const HIcon = h.icon;
              return (
                <motion.div
                  key={h.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-line bg-surface p-5 text-center shadow-card"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <HIcon className="h-4.5 w-4.5" />
                  </span>
                  <p className="font-display text-2xl font-bold tracking-tight text-fg">{h.value}</p>
                  <p className="text-xs text-muted">{h.label}</p>
                </motion.div>
              );
            })}
          </div>
        </Reveal>

        {/* ── Main Skill Explorer ── */}
        <div className="mt-14 grid gap-6 lg:grid-cols-[280px_1fr]">

          {/* ── Category Tab List ── */}
          <Reveal delay={0.05}>
            <nav
              aria-label="Skill categories"
              className="flex flex-row flex-wrap gap-2 lg:flex-col lg:gap-1.5"
            >
              {categories.map((cat) => {
                const CatIcon = cat.icon;
                const isActive = cat.id === activeId;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveId(cat.id)}
                    className={`
                      group flex items-center gap-3 rounded-xl border px-4 py-3 text-left
                      text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
                      ${isActive
                        ? `${cat.accent} ${cat.accentBorder} ${cat.accentText} shadow-card`
                        : 'border-line bg-surface text-muted hover:border-line-strong hover:text-fg'
                      }
                    `}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    <span className={`
                      inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors
                      ${isActive ? `${cat.accent} ${cat.accentText}` : 'bg-surface2 text-muted group-hover:text-fg'}
                    `}>
                      <CatIcon className="h-3.5 w-3.5" />
                    </span>
                    <span className="whitespace-nowrap">{cat.label}</span>
                    <span className={`ml-auto text-xs tabular-nums ${isActive ? cat.accentText : 'text-muted'}`}>
                      {cat.skills.length}
                    </span>
                  </button>
                );
              })}
            </nav>
          </Reveal>

          {/* ── Active Category Detail Panel ── */}
          <Reveal delay={0.1}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className={`rounded-2xl border p-7 shadow-card ${active.accent} ${active.accentBorder}`}
              >
                {/* Panel header */}
                <div className="flex items-start gap-4 border-b border-line/50 pb-5">
                  <span className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-sm ${active.accent} ${active.accentText} border ${active.accentBorder}`}>
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-fg">{active.label}</h2>
                    <p className="mt-1 text-sm text-muted">{active.description}</p>
                  </div>
                </div>

                {/* Proficiency bars */}
                <div className="mt-6 space-y-4">
                  {active.skills.map((skill, i) => (
                    <ProficiencyBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={i * 0.06}
                      accentText={active.accentText}
                    />
                  ))}
                </div>

                {/* Skill pills summary */}
                <div className="mt-6 flex flex-wrap gap-2 border-t border-line/50 pt-5">
                  {active.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${active.accentBorder} ${active.accentText} ${active.accent}`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>

        {/* ── All skills tag cloud at bottom ── */}
        <Reveal delay={0.15}>
          <div className="mt-12 rounded-2xl border border-line bg-surface p-6 shadow-card">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
              All Technologies at a glance
            </p>
            <div className="flex flex-wrap gap-2">
              {categories.flatMap((cat) =>
                cat.skills.map((s) => (
                  <motion.button
                    key={`${cat.id}-${s.name}`}
                    type="button"
                    onClick={() => setActiveId(cat.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className={`
                      rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-150
                      ${activeId === cat.id
                        ? `${cat.accent} ${cat.accentBorder} ${cat.accentText}`
                        : 'border-line bg-surface2 text-muted hover:border-primary hover:text-primary hover:bg-primary-soft'
                      }
                    `}
                  >
                    {s.name}
                  </motion.button>
                ))
              )}
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}