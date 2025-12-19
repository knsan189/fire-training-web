// import {
//   AppBar,
//   Toolbar,
//   Avatar,
//   IconButton,
//   Stack,
//   Box,
//   Menu,
//   MenuItem,
//   Typography,
// } from "@mui/material"
// import { useAppDispatch, useAppSelector } from "../../../app/hooks"
// import { logout, selectUser } from "../../auth/authSlice"
// import { Settings } from "@mui/icons-material"
// import AuthTimer from "../../auth/components/AuthTimer"
// import { useState } from "react"

// const Header = () => {
//   const dispatch = useAppDispatch()
//   // const user = useAppSelector(selectUser)
//   const [menu, setMenu] = useState<HTMLElement | null>(null)

//   return (
//     <AppBar position="static" color="inherit">
//       <Toolbar>
//         <Box flex={1} />
//         <Stack direction="row" alignItems="center" spacing={2}>
//           <AuthTimer />
//           <IconButton>
//             <Settings />
//           </IconButton>
//           <Box width={50}>
//             <Avatar
//               onClick={e => {
//                 setMenu(e.currentTarget)
//               }}
//               src={user?.imgUrl}
//               sx={{ width: 32, height: 32 }}
//             />
//             <Menu
//               open={Boolean(menu)}
//               anchorEl={menu}
//               disableAutoFocus
//               disableRestoreFocus
//               onClose={() => {
//                 setMenu(null)
//               }}
//             >
//               <MenuItem onClick={() => dispatch(logout())}>
//                 <Typography variant="body2">로그아웃</Typography>
//               </MenuItem>
//             </Menu>
//           </Box>
//         </Stack>
//       </Toolbar>
//     </AppBar>
//   )
// }

// export default Header
