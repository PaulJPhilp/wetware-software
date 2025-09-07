/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        silver: "rgb(var(--color-silver) / <alpha-value>)",
        charcoal: "rgb(var(--color-charcoal) / <alpha-value>)",
        orange: "rgb(var(--color-orange) / <alpha-value>)",
        diagram: {
          line: "rgb(var(--color-charcoal) / 1)",
          subtle: "rgb(var(--color-charcoal) / 0.6)",
          accent: "rgb(var(--color-orange) / 1)",
          bg: "rgb(var(--color-silver) / 1)",
        },
      },
      fontFamily: {
        sans: ["Montserrat", "system-ui", "sans-serif"],
        serif: ["Merriweather", "serif"],
        mono: ["Fira Code", "monospace"],
      },
      fluidTypography: {
        h1: {
          min: "2.5rem",
          max: "5rem",
        },
        h2: {
          min: "2rem",
          max: "4rem",
        },
        h3: {
          min: "1.5rem",
          max: "3rem",
        },
        h4: {
          min: "1.25rem",
          max: "2.5rem",
        },
        h5: {
          min: "1rem",
          max: "2rem",
        },
        h6: {
          min: "0.875rem",
          max: "1.5rem",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-fluid-typography")],
};
