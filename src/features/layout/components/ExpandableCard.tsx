import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { Card, CardHeader, Collapse, Divider, IconButton } from "@mui/material"
import { type ReactNode, useState } from "react"

interface ExpandableCardProps {
  title: string
  children?: ReactNode
  defaultExpanded?: boolean
  subheader?: ReactNode
  id?: string
}

const ExpandableCard = ({
  title,
  children,
  subheader,
  defaultExpanded = true,
  id,
}: ExpandableCardProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  return (
    <Card sx={{ position: "relative" }} id={id}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <IconButton
            onClick={() => {
              setIsExpanded(prev => !prev)
            }}
          >
            {isExpanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        }
      />
      <Collapse in={isExpanded}>
        <div style={{ overflow: "hidden" }}>
          <Divider />
          {children}
        </div>
      </Collapse>
    </Card>
  )
}

export default ExpandableCard
