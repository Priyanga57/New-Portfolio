export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        surface2: 'var(--surface-2)',
        line: 'var(--border)',
        'line-strong': 'var(--border-strong)',
        fg: 'var(--fg)',
        muted: 'var(--muted)',
        primary: 'var(--primary)',
        'primary-fg': 'var(--primary-fg)',
        'primary-soft': 'var(--primary-soft)',
        accent: 'var(--accent)',
        'accent-soft': 'var(--accent-soft)',
        success: 'var(--success)',
        warning: 'var(--warning)',
      },
      borderColor: {
        DEFAULT: 'var(--border)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        glow: '0 0 0 1px var(--border), 0 20px 60px -30px var(--glow)',
      },
      maxWidth: {
        content: '72rem',
      },
    },
  },
  plugins: [],
};

