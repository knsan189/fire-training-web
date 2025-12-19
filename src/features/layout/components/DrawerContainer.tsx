import { styled } from "@mui/material"

const DrawerContainer = styled("div", {
  shouldForwardProp: prop =>
    prop !== "isSidebarOpen" && prop !== "sidebarWidth" && prop !== "anchor",
})<{
  anchor: "left" | "right"
  isSidebarOpen: boolean
  sidebarWidth: number
}>(({ isSidebarOpen, sidebarWidth, theme, anchor }) => ({
  position: "relative",
  flexGrow: 1,
  height: "100%",
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: anchor === "left" ? `-${sidebarWidth}px` : undefined,
  marginRight: anchor === "right" ? `-${sidebarWidth}px` : undefined,
  ...(isSidebarOpen && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: anchor === "left" ? 0 : undefined,
    marginRight: anchor === "right" ? 0 : undefined,
  }),
}))

export default DrawerContainer
