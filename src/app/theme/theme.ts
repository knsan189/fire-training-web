import { createTheme } from "@mui/material"
import createTypography from "./createTypography"
import createShadow from "./createShadow"
import createComponents from "./createComponents"
import createPalette from "./createPalette"
import { koKR } from "@mui/x-date-pickers/locales"
import { koKR as dataGridKoKR } from "@mui/x-data-grid/locales"
import { koKR as coreKoKR } from "@mui/material/locale"

const shadows = createShadow()
const typography = createTypography()
const palette = createPalette()
const components = createComponents(palette)

const theme = createTheme(
  {
    shadows,
    typography,
    components,
    palette,
  },
  koKR,
  dataGridKoKR,
  coreKoKR,
)

export default theme
