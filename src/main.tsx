import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { App } from "./App"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { store } from "./app/store"
import { CssBaseline, ThemeProvider } from "@mui/material"
import theme from "./app/theme/theme"
import { SnackbarProvider } from "notistack"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { ko } from "date-fns/locale"

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <StrictMode>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <SnackbarProvider
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <CssBaseline />
              <App />
            </SnackbarProvider>
          </ThemeProvider>
        </Provider>
      </LocalizationProvider>
    </StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
