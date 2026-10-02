/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        night: '#070d16',
        night2: '#0c1624',
        line: '#1f4256',
        ink: '#b9d3dd',
        dim: '#6a8794',
        hi: '#7fc4d6',
        warn: '#f0a23c',
        ok: '#5fd08a',
        well: '#050a12',
        panel: '#0d1b2b',
        panel2: '#0a1320',
      },
      fontFamily: {
        mono: ['"IBM Plex Mono"', '"Roboto Mono"', 'Consolas', 'monospace'],
      },
      backgroundImage: {
        crt: 'repeating-linear-gradient(0deg,rgba(120,190,220,.045) 0 1px,transparent 1px 3px), radial-gradient(ellipse at 50% 45%,transparent 55%,rgba(0,0,0,.6))',
        scanbar: 'linear-gradient(transparent,rgba(127,196,214,.045),transparent)',
        progress: 'repeating-linear-gradient(90deg,#7fc4d6 0 6px,transparent 6px 9px)',
        card: 'linear-gradient(160deg,#10283a,#0a1522)',
      },
      boxShadow: { win: '0 20px 60px #000a' },
      keyframes: {
        scan: { to: { top: '100%' } },
        logo: { '50%': { opacity: '.8' } },
      },
      animation: {
        scan: 'scan 10s linear infinite',
        logo: 'logo 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
