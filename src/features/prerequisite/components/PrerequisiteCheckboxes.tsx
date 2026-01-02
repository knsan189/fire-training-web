import { Checkbox, FormControlLabel } from "@mui/material"
import {
  type Prerequisite,
  useGetPrerequisitesQuery,
} from "../prerequisiteApiSlice"

interface PrerequisiteCheckboxesProps {
  value: Prerequisite["id"][]
  disabled: boolean
  onChange: (value: Prerequisite["id"][]) => void
}

const PrerequisiteCheckboxes = ({
  value,
  disabled,
  onChange,
}: PrerequisiteCheckboxesProps) => {
  const { data: prerequisites = [] } = useGetPrerequisitesQuery({})
  const handleChange = (prerequisite: Prerequisite, checked: boolean) => {
    if (checked) {
      onChange([...value, prerequisite.id])
    } else {
      onChange(value.filter(value => value !== prerequisite.id))
    }
  }
  return prerequisites.map(prerequisite => (
    <FormControlLabel
      key={prerequisite.id}
      disabled={disabled}
      control={<Checkbox />}
      label={prerequisite.name}
      checked={value.includes(prerequisite.id)}
      onChange={(_event, checked) => handleChange(prerequisite, checked)}
      slotProps={{
        typography: {
          variant: "body2",
        },
      }}
    />
  ))
}

export default PrerequisiteCheckboxes
