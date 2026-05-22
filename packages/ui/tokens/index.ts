export const keystoneColors = {
  paper: {
    DEFAULT: "#FAFAF7",
    2: "#F4F3EE",
    3: "#ECEAE3",
  },
  ink: {
    0: "#0B0B0F",
    1: "#16161C",
    2: "#2B2C36",
    3: "#56586A",
    4: "#8A8C9C",
    5: "#B7B8C5",
  },
  graphite: {
    0: "#0A0A0E",
    1: "#0F0F14",
    2: "#15151C",
    3: "#1D1D26",
    4: "#2A2A35",
    ink: "#ECECF0",
    "ink-2": "#C5C5CE",
    "ink-3": "#8A8C9C",
  },
  line: "rgba(11, 11, 15, 0.08)",
  "line-soft": "rgba(11, 11, 15, 0.05)",
  "graphite-line": "rgba(255, 255, 255, 0.07)",
  "graphite-line-soft": "rgba(255, 255, 255, 0.04)",
  aurora: {
    violet: "oklch(0.66 0.18 290)",
    indigo: "oklch(0.62 0.18 265)",
    blue: "oklch(0.66 0.15 245)",
    soft: "oklch(0.78 0.10 280)",
  },
  semantic: {
    accent: "oklch(0.62 0.18 275)",
    "accent-soft": "oklch(0.94 0.04 285)",
    positive: "oklch(0.65 0.13 155)",
    warning: "oklch(0.72 0.14 75)",
    danger: "oklch(0.62 0.18 25)",
  },
} as const;

export const keystoneRadii = {
  1: "6px",
  2: "10px",
  3: "14px",
  4: "18px",
  5: "22px",
  6: "28px",
  pill: "9999px",
} as const;

export const keystoneSpacing = {
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  7: "32px",
  8: "40px",
  9: "56px",
  10: "72px",
} as const;

export const keystoneShadows = {
  1: "0 1px 2px rgba(11,11,15,0.04), 0 0 0 1px rgba(11,11,15,0.04)",
  2: "0 1px 2px rgba(11,11,15,0.04), 0 4px 12px rgba(11,11,15,0.06)",
  3: "0 2px 4px rgba(11,11,15,0.04), 0 12px 28px rgba(11,11,15,0.10)",
  4: "0 4px 8px rgba(11,11,15,0.06), 0 24px 60px rgba(11,11,15,0.14)",
  glow: "0 0 0 1px rgba(124, 96, 255, 0.18), 0 8px 32px rgba(124, 96, 255, 0.22)",
} as const;

export const keystoneFonts = {
  display: '"Inter Tight", "Inter", -apple-system, system-ui, sans-serif',
  text: '"Inter", -apple-system, system-ui, sans-serif',
  mono: '"JetBrains Mono", "SF Mono", ui-monospace, monospace',
} as const;

export const keystoneGradients = {
  aurora:
    "linear-gradient(135deg, oklch(0.70 0.17 295) 0%, oklch(0.62 0.18 270) 45%, oklch(0.66 0.15 240) 100%)",
  auroraRadial:
    "radial-gradient(120% 80% at 30% 0%, oklch(0.85 0.12 295 / 0.55), transparent 60%), radial-gradient(110% 70% at 80% 100%, oklch(0.82 0.10 245 / 0.45), transparent 60%)",
  aiSurface:
    "linear-gradient(180deg, oklch(0.96 0.04 285 / 0.6), oklch(0.96 0.03 270 / 0.4))",
} as const;

export const keystoneMotion = {
  easeOut: "cubic-bezier(0.2, 0.8, 0.2, 1)",
  easeInOut: "cubic-bezier(0.65, 0, 0.35, 1)",
  easeSpring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  duration: {
    1: "120ms",
    2: "200ms",
    3: "320ms",
    4: "520ms",
  },
} as const;

export const keystoneTokens = {
  colors: keystoneColors,
  fonts: keystoneFonts,
  gradients: keystoneGradients,
  motion: keystoneMotion,
  radii: keystoneRadii,
  shadows: keystoneShadows,
  spacing: keystoneSpacing,
} as const;

export type KeystoneTokens = typeof keystoneTokens;
