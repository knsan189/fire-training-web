import { AppBar, Box, Drawer, Toolbar } from "@mui/material"
import { neutral } from "../../../app/theme/colors"
import Navigator from "./Navigator"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import {
  selectIsSidebarOpen,
  selectSidebarWidth,
  setSidebarWidth,
} from "../layoutSlice"
import { Rnd } from "react-rnd"

const MIN_WIDTH = 250
const MAX_WIDTH = 400

const Sidebar = () => {
  const dispatch = useAppDispatch()
  const isSidebarOpen = useAppSelector(selectIsSidebarOpen)
  const sidebarWidth = useAppSelector(selectSidebarWidth)
  const handleResize = (
    _e: MouseEvent | TouchEvent,
    _direction: unknown,
    ref: HTMLElement,
  ) => {
    const newWidth = ref.getBoundingClientRect().width
    dispatch(
      setSidebarWidth(Math.min(Math.max(newWidth, MIN_WIDTH), MAX_WIDTH)),
    )
  }
  return (
    <Drawer
      open={isSidebarOpen}
      variant="permanent"
      anchor="left"
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        overflow: "hidden",
        "& .MuiDrawer-paper": {
          width: sidebarWidth,
          boxSizing: "border-box",
          bgcolor: neutral[900],
          color: neutral[300],
          borderRight: 0,
          overflowY: "auto",
        },
      }}
    >
      <Rnd
        minWidth={MIN_WIDTH}
        maxWidth={MAX_WIDTH}
        enableResizing={{ right: true }}
        disableDragging
        onResize={handleResize}
        default={{
          x: 0,
          y: 0,
          width: sidebarWidth,
          height: "100%",
        }}
        style={{ zIndex: 1300 }}
      >
        <AppBar position="static" color="transparent">
          <Toolbar>
            <Box pl={1} pt={1}></Box>
          </Toolbar>
        </AppBar>
        <Navigator />
      </Rnd>
    </Drawer>
  )
}

export default Sidebar
