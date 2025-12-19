import { alpha } from "@mui/material/styles"

type CustomColor = {
  lightest: string
  light: string
  main: string
  dark: string
  darkest: string
  contrastText: string
}
export const neonBlue = {
  50: "#ecf0ff",
  100: "#dde3ff",
  200: "#c2cbff",
  300: "#9ca7ff",
  400: "#7578ff",
  500: "#635bff",
  600: "#4e36f5",
  700: "#432ad8",
  800: "#3725ae",
  900: "#302689",
  950: "#1e1650",
}

export const crimsonRed = {
  50: "#fbeaec",
  100: "#f5cdd2",
  200: "#eca0a8",
  300: "#e56c7b",
  400: "#dd4458",
  500: "#c43a49", // 메인컬러
  600: "#a12836",
  700: "#871f2c",
  800: "#701923",
  900: "#551218",
  950: "#36090d",
}

export const nevada = {
  50: "#fbfcfe",
  100: "#f0f4f8",
  200: "#dde7ee",
  300: "#cdd7e1",
  400: "#9fa6ad",
  500: "#636b74",
  600: "#555e68",
  700: "#32383e",
  800: "#202427",
  900: "#121517",
  950: "#090a0b",
}

const withAlphas = (color: CustomColor) => {
  return {
    ...color,
    alpha4: alpha(color.main, 0.04),
    alpha8: alpha(color.main, 0.08),
    alpha12: alpha(color.main, 0.12),
    alpha30: alpha(color.main, 0.3),
    alpha50: alpha(color.main, 0.5),
  }
}

export const neutral = {
  50: "#F8F9FA",
  100: "#F3F4F6",
  200: "#E5E7EB",
  300: "#D2D6DB",
  400: "#9DA4AE",
  500: "#6C737F",
  600: "#4D5761",
  700: "#2F3746",
  800: "#1C2536",
  900: "#111927",
}

export const indigo = withAlphas({
  lightest: "#F5F7FF",
  light: "#EBEEFE",
  main: "#6366F1",
  dark: "#4338CA",
  darkest: "#312E81",
  contrastText: "#FFFFFF",
})

export const success = withAlphas({
  lightest: "#F0FDF9",
  light: "#3FC79A",
  main: "#10B981",
  dark: "#0B815A",
  darkest: "#134E48",
  contrastText: "#FFFFFF",
})

export const info = withAlphas({
  lightest: "#ECFDFF",
  light: "#CFF9FE",
  main: "#06AED4",
  dark: "#0E7090",
  darkest: "#164C63",
  contrastText: "#FFFFFF",
})

export const warning = withAlphas({
  lightest: "#FFFAEB",
  light: "#FEF0C7",
  main: "#F79009",
  dark: "#B54708",
  darkest: "#7A2E0E",
  contrastText: "#FFFFFF",
})

export const error = withAlphas({
  lightest: "#FEF3F2",
  light: "#FEE4E2",
  main: "#F04438",
  dark: "#B42318",
  darkest: "#7A271A",
  contrastText: "#FFFFFF",
})
