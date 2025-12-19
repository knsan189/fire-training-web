import { Box, Container, Stack } from "@mui/material"
import { useAppSelector } from "../../../app/hooks"
import {
  selectIsSidebarOpen,
  selectMaxWidth,
  selectSidebarWidth,
} from "../layoutSlice"
import Sidebar from "./Sidebar"
// import Header from "./Header"
import DrawerContainer from "./DrawerContainer"

interface Props {
  children?: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const maxWidth = useAppSelector(selectMaxWidth)
  const isSidebarOpen = useAppSelector(selectIsSidebarOpen)
  const sidebarWidth = useAppSelector(selectSidebarWidth)
  return (
    <>
      <Box component="main" display="flex" height="100vh">
        <Sidebar />
        <DrawerContainer
          isSidebarOpen={isSidebarOpen}
          sidebarWidth={sidebarWidth}
          anchor="left"
        >
          {/* <Header /> */}
          <Container maxWidth={maxWidth} sx={{ transition: "all 0.3s ease" }}>
            <Stack pt={8} pb={4} spacing={4} position="relative">
              {children}
            </Stack>
          </Container>
        </DrawerContainer>
      </Box>
    </>
  )
}

export default Layout
