import { alpha } from "@mui/material"
import { common } from "@mui/material/colors"
import {
  neutral,
  error,
  info,
  success,
  warning,
  crimsonRed,
  nevada,
} from "./colors"

declare module "@mui/material/styles/" {
  interface Palette {
    neutral?: {
      100: string
      200: string
      300: string
      400: string
      500: string
      600: string
      700: string
      800: string
      900: string
    }
  }

  interface PaletteOptions {
    neutral: {
      100: string
      200: string
      300: string
      400: string
      500: string
      600: string
      700: string
      800: string
      900: string
    }
  }
}

const createPalette = () => ({
  action: {
    active: neutral[500],
    disabled: alpha(neutral[900], 0.38),
    disabledBackground: alpha(neutral[900], 0.12),
    focus: alpha(neutral[900], 0.16),
    hover: alpha(neutral[900], 0.04),
    selected: alpha(neutral[900], 0.12),
  },
  background: {
    default: common.white,
    paper: common.white,
  },
  divider: neutral[200],
  error,
  info,
  mode: "light" as const,
  neutral,
  primary: {
    light: crimsonRed[400],
    main: crimsonRed[500],
    dark: crimsonRed[600],
  },
  secondary: {
    light: nevada[400],
    main: nevada[500],
    dark: nevada[600],
  },
  success,
  text: {
    primary: neutral[900],
    secondary: neutral[500],
    disabled: alpha(neutral[900], 0.38),
  },
  warning,
})

export default createPalette
