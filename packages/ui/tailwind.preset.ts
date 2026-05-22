import type { Config } from "tailwindcss";

import {
  keystoneFonts,
  keystoneGradients,
  keystoneRadii,
  keystoneShadows,
  keystoneSpacing,
} from "./tokens";

const preset = {
  darkMode: ["class"],
  theme: {
    extend: {
      backgroundImage: {
        aurora: keystoneGradients.aurora,
        "aurora-radial": keystoneGradients.auroraRadial,
        "ai-surface": keystoneGradients.aiSurface,
      },
      borderColor: {
        DEFAULT: "var(--line)",
        line: "var(--line)",
        "line-soft": "var(--line-soft)",
        "graphite-line": "var(--g-line)",
      },
      borderRadius: {
        ...keystoneRadii,
        DEFAULT: "var(--r-3)",
      },
      boxShadow: {
        ...keystoneShadows,
      },
      colors: {
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
        aurora: {
          blue: "var(--aurora-blue)",
          indigo: "var(--aurora-indigo)",
          soft: "var(--aurora-soft)",
          violet: "var(--aurora-violet)",
        },
        background: "var(--paper)",
        border: "var(--line)",
        danger: "var(--danger)",
        foreground: "var(--ink-0)",
        graphite: {
          0: "var(--g-0)",
          1: "var(--g-1)",
          2: "var(--g-2)",
          3: "var(--g-3)",
          4: "var(--g-4)",
          ink: "var(--g-ink)",
          "ink-2": "var(--g-ink-2)",
          "ink-3": "var(--g-ink-3)",
        },
        ink: {
          0: "var(--ink-0)",
          1: "var(--ink-1)",
          2: "var(--ink-2)",
          3: "var(--ink-3)",
          4: "var(--ink-4)",
          5: "var(--ink-5)",
        },
        input: "var(--line)",
        line: "var(--line)",
        "line-soft": "var(--line-soft)",
        paper: {
          DEFAULT: "var(--paper)",
          2: "var(--paper-2)",
          3: "var(--paper-3)",
        },
        positive: "var(--positive)",
        primary: "var(--ink-0)",
        "primary-foreground": "#fff",
        ring: "var(--accent)",
        secondary: "var(--paper-2)",
        "secondary-foreground": "var(--ink-1)",
        warning: "var(--warning)",
      },
      fontFamily: {
        display: keystoneFonts.display.split(", "),
        mono: keystoneFonts.mono.split(", "),
        sans: keystoneFonts.text.split(", "),
      },
      spacing: keystoneSpacing,
      transitionTimingFunction: {
        "keystone-out": "var(--ease-out)",
        "keystone-spring": "var(--ease-spring)",
      },
    },
  },
} satisfies Partial<Config>;

export default preset;
