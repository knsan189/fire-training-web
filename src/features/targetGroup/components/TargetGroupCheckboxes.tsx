import { Checkbox, FormControlLabel } from "@mui/material"
import {
  useGetTargetGroupsQuery,
  type TargetGroup,
} from "../targetGroupApiSlice"

interface TargetGroupCheckboxesProps {
  value: TargetGroup["id"][]
  disabled: boolean
  onChange: (value: TargetGroup["id"][]) => void
}

const TargetGroupCheckboxes = ({
  value,
  disabled,
  onChange,
}: TargetGroupCheckboxesProps) => {
  const { data: targetGroups = [] } = useGetTargetGroupsQuery({
    isActive: true,
  })

  const handleChange = (targetGroup: TargetGroup, checked: boolean) => {
    if (checked) {
      onChange([...value, targetGroup.id])
    } else {
      onChange(value.filter(value => value !== targetGroup.id))
    }
  }
  return targetGroups.map(targetGroup => (
    <FormControlLabel
      key={targetGroup.id}
      disabled={disabled}
      control={<Checkbox />}
      label={targetGroup.name}
      checked={value.includes(targetGroup.id)}
      onChange={(_event, checked) => handleChange(targetGroup, checked)}
      slotProps={{
        typography: {
          variant: "body2",
        },
      }}
    />
  ))
}

export default TargetGroupCheckboxes
