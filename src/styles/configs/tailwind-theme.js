// src/styles/configs/tailwind-theme.js
export const COLORS = {
  inherit: "inherit",
  transparent: "transparent",
  current: "currentColor",
  white: "#FFFFFF",
  black: "#000",
  // Xertifi brand colors
  primary: {
    blue: "#0015FF",
    white: "#FFFFFF",
    green: "#1BFF44",
    dark: "#070548",
  },
  // Supporting colors for UI
  gray: {
    50: "#FAFAFA",
    100: "#f5f5f5",
    125: "#D9D9D9",
    150: "#A9A9A9", // BG II from Xertifi
    200: "#EEEEEE",
    300: "#E0E0E0",
    400: "#BDBDBD",
    500: "#9E9E9E",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    850: "#1b1b1e",
    900: "#212121",
  },
  // System colors for notifications etc
  success: "#1BFF44",
  error: "#FF3B30",
  warning: "#FF9500",
  info: "#0015FF",
  // Light and dark theme colors
  light: {
    background: "#FFFFFF",
    text: "#070548",
  },
  dark: {
    background: "#070548",
    text: "#FFFFFF",
  },
};

export const BORDER_RADIUS = {
  none: "0",
  sm: "1px",
  DEFAULT: "2px",
  mid: "4px",
  lmid: "6px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  "2xl": "24px",
  full: "1000rem",
};

export const BOX_SHADOW = {
  none: "none",
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
};

export const BREAKPOINTS = {
  sm: "600px",
  md: "900px",
  lg: "1200px",
  xl: "1536px",
};
