import tailwindcssAnimate from "tailwindcss-animate";
import Typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        'primary-800': {
          DEFAULT: 'hsl(var(--primary-800))',
          foreground: 'hsl(var(--primary-800-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        gray: 'hsl(var(--gray))', // primary-40 in design
        'dark-gray': 'hsl(var(--dark-gray))', // primary-60 in design. #636363
        'lighter-gray': 'hsl(var(--lighter-gray))', // card-gray in design #f3f5f4
        'light-gray': 'hsl(var(--light-gray))', // primary-21 in design #f0f0f0
        ivory: 'hsl(var(--ivory))', // primary-10 in design
        'main-purple': 'hsl(var(--main-purple))',
        'dark-purple': 'hsl(var(--dark-purple))', // purple-text in design
        'main-green': 'hsl(var(--main-green))',
        'dark-green': 'hsl(var(--dark-green))', // green-text in design
        'lime-green': 'hsl(var(--lime-green))', // green-40 in design
        'light-green': 'hsl(var(--light-green))', // light green in design, #8dff6d
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '2.5xl': '20px',
      },
      boxShadow: {
        'raised': '0 var(--shadow-size) 0 0 #000',
      },
      fontFamily: {
        logo: "'Oleo Script', system-ui",
        default: 'Nunito, system-ui, sans-serif',
        title: '"NEXT Pan Book", system-ui, sans-serif',
      },
      fontSize: {
        '5.5xl': '3.375rem', // 54px
      },
      height: {
        '50': '12.5rem', // 200px
      },
      lineHeight: {
        12: '3rem',
      },
      spacing: {
        15: '3.75rem',
        18: '4.5rem',
        27: '6.75rem',
        54: '13.5rem',
        '50dvh': '50dvh',
      },
    },
  },
  plugins: [tailwindcssAnimate, Typography],
};
export default config;
