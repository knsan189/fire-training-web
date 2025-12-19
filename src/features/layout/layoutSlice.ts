import type { Breakpoint } from "@mui/material"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../../app/store"

interface LayoutState {
  maxWidth: false | Breakpoint | undefined
  isSidebarOpen: boolean
  sidebarWidth: number
}

const initialState: LayoutState = {
  maxWidth: "lg",
  isSidebarOpen: true,
  sidebarWidth: 270,
}

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setMaxWidth(state, action: PayloadAction<LayoutState["maxWidth"]>) {
      state.maxWidth = action.payload
    },
    setIsSidebarOpen(
      state,
      action: PayloadAction<LayoutState["isSidebarOpen"]>,
    ) {
      state.isSidebarOpen = action.payload
    },
    setSidebarWidth(state, action: PayloadAction<LayoutState["sidebarWidth"]>) {
      state.sidebarWidth = action.payload
    },
  },
})

export default layoutSlice
export const { setMaxWidth, setIsSidebarOpen, setSidebarWidth } =
  layoutSlice.actions
export const selectMaxWidth = (state: RootState) => state.layout.maxWidth
export const selectIsSidebarOpen = (state: RootState) =>
  state.layout.isSidebarOpen
export const selectSidebarWidth = (state: RootState) =>
  state.layout.sidebarWidth
