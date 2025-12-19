import type { TypographyVariantsOptions } from "@mui/material"
import "@fontsource/pretendard/index.css"
import "@fontsource/pretendard/400.css"
import "@fontsource/pretendard/500.css"
import "@fontsource/pretendard/600.css"
import "@fontsource/pretendard/700.css"

// Typography variants 타입 확장
declare module "@mui/material/styles" {
  interface TypographyVariants {
    h5_bold: React.CSSProperties
    h6_bold: React.CSSProperties
    body2_bold: React.CSSProperties
    body3: React.CSSProperties
    label12: React.CSSProperties
    label14: React.CSSProperties
    label16: React.CSSProperties
    label16_bold: React.CSSProperties
    label18: React.CSSProperties
    label18_bold: React.CSSProperties
  }

  interface TypographyVariantsOptions {
    h5_bold?: React.CSSProperties
    h6_bold?: React.CSSProperties
    body2_bold: React.CSSProperties
    body3?: React.CSSProperties
    label12: React.CSSProperties
    label14: React.CSSProperties
    label16: React.CSSProperties
    label16_bold: React.CSSProperties
    label18: React.CSSProperties
    label18_bold: React.CSSProperties
  }
}
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    h5_bold: true
    h6_bold: true
    body2_bold: true
    body3: true
    label12: true
    label14: true
    label16: true
    label16_bold: true
    label18: true
    label18_bold: true
  }
}

const createTypography = (): TypographyVariantsOptions => {
  return {
    fontFamily: [
      "Pretendard",
      "-apple-system",
      "BlinkMacSystemFont",
      "system-ui",
      "sans-serif",
    ].join(", "),
    h1: {
      fontWeight: 700,
      fontSize: "40px",
      lineHeight: 1.3,
      letterSpacing: 0,
    },
    h2: {
      fontWeight: 600,
      fontSize: "36px",
      lineHeight: 1.16,
      letterSpacing: 0,
      wordBreak: "keep-all",
    },
    h3: {
      fontWeight: 700,
      fontSize: "32px",
      lineHeight: 1.25,
      letterSpacing: 0,
    },
    h4: {
      fontWeight: 700,
      fontSize: "28px",
      lineHeight: 1.3,
      letterSpacing: 0,
    },
    h5: {
      fontWeight: 500,
      fontSize: "24px",
      lineHeight: 1.32,
      letterSpacing: 0,
    },
    h5_bold: {
      fontWeight: 700,
      fontSize: "24px",
      lineHeight: 1.32,
      letterSpacing: 0,
    },
    h6: {
      fontWeight: 500,
      fontSize: "20px",
      lineHeight: 1.2,
      letterSpacing: 0,
    },
    h6_bold: {
      fontWeight: 700,
      fontSize: "20px",
      lineHeight: 1.2,
      letterSpacing: 0,
    },
    subtitle1: {
      fontWeight: 700,
      fontSize: "18px",
      lineHeight: 1.48,
      letterSpacing: 0,
    },
    subtitle2: {
      fontWeight: 700,
      fontSize: "16px",
      lineHeight: 1.22,
      letterSpacing: 0,
    },
    body1: {
      fontWeight: 500,
      fontSize: "18px",
      lineHeight: 1.54,
      letterSpacing: 0,
      wordBreak: "keep-all",
    },
    body2: {
      fontWeight: 500,
      fontSize: "16px",
      lineHeight: 1.48,
      letterSpacing: 0,
    },
    body2_bold: {
      fontWeight: 700,
      fontSize: "16px",
      lineHeight: 1.48,
      letterSpacing: 0,
      verticalAlign: "bottom",
    },
    body3: {
      fontWeight: 500,
      fontSize: "14px",
      lineHeight: 1.45,
      letterSpacing: 0,
    },
    label12: {
      fontWeight: 500,
      fontSize: "12px",
      lineHeight: 1.3,
      letterSpacing: 0,
    },
    label14: {
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: 1.11,
      letterSpacing: 0,
    },
    label16: {
      fontWeight: 500,
      fontSize: "16px",
      lineHeight: 1.22,
      letterSpacing: 0,
    },
    label16_bold: {
      fontWeight: 700,
      fontSize: "16px",
      lineHeight: 1.22,
      letterSpacing: 0,
    },
    label18: {
      fontWeight: 500,
      fontSize: "18px",
      lineHeight: 1.32,
      letterSpacing: 0,
    },
    label18_bold: {
      fontWeight: 700,
      fontSize: "18px",
      lineHeight: 1.32,
      letterSpacing: "-2.5%",
    },
    button: {
      fontWeight: 500,
      fontSize: "16px",
      lineHeight: 1.22,
      letterSpacing: 0,
    },
    caption: {
      fontWeight: 500,
      fontSize: "14px",
      lineHeight: 1.11,
      letterSpacing: 0,
    },
  }
}

export default createTypography
