import type { Config } from "tailwindcss";

import {
  keystoneColors,
  keystoneFonts,
  keystoneRadii,
  keystoneShadows,
  keystoneSpacing,
} from "./tokens";

const nativewindPreset = {
  theme: {
    extend: {
      borderColor: {
        DEFAULT: keystoneColors.line,
        line: keystoneColors.line,
        "line-soft": keystoneColors["line-soft"],
        "graphite-line": keystoneColors["graphite-line"],
      },
      borderRadius: keystoneRadii,
      boxShadow: keystoneShadows,
      colors: {
        accent: keystoneColors.semantic.accent,
        "accent-soft": keystoneColors.semantic["accent-soft"],
        aurora: keystoneColors.aurora,
        background: keystoneColors.paper.DEFAULT,
        border: keystoneColors.line,
        danger: keystoneColors.semantic.danger,
        foreground: keystoneColors.ink[0],
        graphite: keystoneColors.graphite,
        ink: keystoneColors.ink,
        line: keystoneColors.line,
        "line-soft": keystoneColors["line-soft"],
        paper: keystoneColors.paper,
        positive: keystoneColors.semantic.positive,
        primary: keystoneColors.ink[0],
        "primary-foreground": "#fff",
        secondary: keystoneColors.paper[2],
        "secondary-foreground": keystoneColors.ink[1],
        warning: keystoneColors.semantic.warning,
        white: "#fff",
      },
      fontFamily: {
        display: [keystoneFonts.display],
        mono: [keystoneFonts.mono],
        sans: [keystoneFonts.text],
      },
      spacing: keystoneSpacing,
    },
  },
} satisfies Partial<Config>;

export default nativewindPreset;
