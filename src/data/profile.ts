import {
  BarChart3Icon,
  BrainCircuitIcon,
  CodeIcon,
  LayersIcon,
  LibraryIcon,
  MonitorIcon,
  UsersIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  PhoneIcon } from
'lucide-react';
import type { NavLink, SkillGroup, SocialLink } from '../types/portfolio';

/**
 * Static professional facts sourced from Priyanga's resume.
 * Dynamic content (projects, certificates, experience, resume link) comes from Google Sheets.
 */
export const profile = {
  name: 'Priyanga V S',
  role: 'Data Analyst',
  tagline: 'Turning raw data into actionable business insights.',
  location: 'Tamil Nadu, India',
  email: 'priyangaa7512@gmail.com',
  phone: '6374231954',
  linkedin: 'https://www.linkedin.com/in/priyangavs',
  github: 'https://github.com/Priyanga57',
  summary:
  'Data Analyst with hands-on experience in SQL, Python, Excel, and Power BI for data extraction, cleaning, analysis, and visualization. Experienced in creating KPI dashboards, automating reporting workflows, and analyzing structured datasets to generate business insights.',
  summaryFull:
  'Data Analyst with hands-on experience in SQL, Python, Excel, and Power BI for data extraction, cleaning, analysis, and visualization. Experienced in creating KPI dashboards, automating reporting workflows, and analyzing structured datasets to generate business insights. Strong understanding of statistics, data modeling, data visualization, and business intelligence concepts. Passionate about converting complex data into meaningful insights that improve business performance and support strategic decision-making.'
} as const;

export const education = {
  degree: 'B.Tech – Artificial Intelligence & Data Science',
  institution: 'Er. Perumal Manimekalai College of Engineering',
  period: 'Nov 2022 – May 2026',
  cgpa: '8.4'
} as const;

export const heroKeywords: string[] = [
'SQL',
'Python',
'Excel',
'Power BI',
'Business Intelligence'];


export const skillGroups: SkillGroup[] = [
{ label: 'Languages', icon: CodeIcon, items: ['Python', 'SQL'] },
{ label: 'Libraries', icon: LibraryIcon, items: ['Pandas', 'NumPy', 'Matplotlib'] },
{ label: 'Tools', icon: BarChart3Icon, items: ['Power BI', 'Excel', 'MySQL', 'Google Sheets'] },
{
  label: 'Core Skills',
  icon: LayersIcon,
  items: [
  'Data Cleaning',
  'EDA',
  'Data Modeling',
  'KPI Reporting',
  'Dashboard Development',
  'Data Visualization',
  'Business Intelligence']

},
{
  label: 'Machine Learning',
  icon: BrainCircuitIcon,
  items: ['Classification', 'Regression', 'Feature Engineering', 'Model Evaluation']
},
{ label: 'Platforms', icon: MonitorIcon, items: ['Jupyter Notebook', 'Visual Studio Code'] },
{
  label: 'Soft Skills',
  icon: UsersIcon,
  items: ['Analytical Thinking', 'Problem Solving', 'Communication', 'Leadership']
}];


export const workflowStages: Array<{label: string;description: string;}> = [
{ label: 'Data', description: 'Extract and consolidate structured data with SQL, Excel and Python.' },
{ label: 'Analysis', description: 'Clean, model and explore datasets to find reliable patterns.' },
{ label: 'Insight', description: 'Translate findings into KPI dashboards and clear visual stories.' },
{ label: 'Decision', description: 'Support business decisions with reporting that stays current.' }];


export const navLinks: NavLink[] = [
{ label: 'Home',         to: '/'            },
{ label: 'About',        to: '/about'       },
{ label: 'Skills',       to: '/skills'      },
{ label: 'Projects',     to: '/projects'    },
{ label: 'Experience',   to: '/experience'  },
{ label: 'Certificates', to: '/certificates'},
{ label: 'Contact',      to: '/contact'     }];


export const socialLinks: SocialLink[] = [
{ label: 'GitHub', href: profile.github, icon: GithubIcon, display: 'Priyanga57' },
{ label: 'LinkedIn', href: profile.linkedin, icon: LinkedinIcon, display: 'priyangavs' },
{ label: 'Email', href: `mailto:${profile.email}`, icon: MailIcon, display: profile.email },
{ label: 'Phone', href: `tel:${profile.phone}`, icon: PhoneIcon, display: profile.phone }];