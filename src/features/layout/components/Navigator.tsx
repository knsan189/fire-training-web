import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import {
  Dashboard,
  ExpandMore,
  ExpandLess,
  ForkRight,
  People,
} from "@mui/icons-material"
import { useEffect, useRef, useState } from "react"
import { neutral } from "../../../app/theme/colors"

interface Path {
  text: string
  to: string
  icon: React.ReactNode
  children?: Path[]
}

const paths: Path[] = [
  {
    text: "대시보드",
    to: "/",
    icon: <Dashboard />,
    children: [],
  },
  {
    to: "/scenario",
    text: "시나리오 관리",
    icon: <ForkRight />,
  },
  {
    to: "/user",
    text: "사용자 관리",
    icon: <People />,
  },
]

const Navigator = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [expanded, setExpanded] = useState<string[]>([])

  const handleExpand = (id: string) => {
    setExpanded(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id],
    )
  }

  const isActive = (id: string) =>
    pathname === id || pathname.startsWith(`${id}/`)

  const isLoadedRef = useRef(false)

  useEffect(() => {
    if (isLoadedRef.current) return
    isLoadedRef.current = true

    setExpanded(
      paths
        .filter(path => pathname.startsWith(path.to) && path.to !== "/")
        .map(path => path.to),
    )
  }, [pathname])
  return (
    <List dense component="div">
      {paths.map(path => {
        const hasChildren = (path.children?.length ?? 0) > 0
        const isExpanded = expanded.includes(path.to)
        const isPathActive = isActive(path.to)
        return (
          <div key={path.to}>
            <ListItem component="div">
              <ListItemButton
                onClick={() => {
                  if (!hasChildren) void navigate(path.to)
                  else handleExpand(path.to)
                }}
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 1.5,
                  ...(isExpanded && {
                    bgcolor: neutral[700],
                  }),
                  ...(isPathActive && {
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                  }),
                  "&:hover": {
                    bgcolor: neutral[800],
                  },
                }}
              >
                <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                  {path.icon}
                </ListItemIcon>
                <ListItemText
                  primary={path.text}
                  slotProps={{
                    primary: {
                      variant: "subtitle1",
                    },
                  }}
                />
                {hasChildren && (isExpanded ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
            </ListItem>
            {hasChildren && (
              <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <List component="div" disablePadding dense>
                  {path.children?.map(child => {
                    const isChildActive = child.to === pathname
                    return (
                      <ListItem key={child.to} sx={{ pl: 4 }}>
                        <ListItemButton
                          onClick={() => void navigate(child.to)}
                          sx={{
                            px: 2,
                            py: 0.5,
                            borderRadius: 1.5,
                            ...(isChildActive && {
                              bgcolor: neutral[600],
                              color: "primary.contrastText",
                            }),
                            "&:hover": {
                              bgcolor: neutral[700],
                            },
                          }}
                        >
                          <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                            {child.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={child.text}
                            slotProps={{
                              primary: {
                                variant: "subtitle2",
                              },
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    )
                  })}
                </List>
              </Collapse>
            )}
          </div>
        )
      })}
    </List>
  )
}

export default Navigator
