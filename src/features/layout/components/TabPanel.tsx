import { type ReactNode } from "react"

interface Props {
  children: ReactNode
  index: number
  value: number
}

const TabPanel = ({ children, index, value }: Props) => {
  if (value !== index) return null
  return children
}

export default TabPanel
