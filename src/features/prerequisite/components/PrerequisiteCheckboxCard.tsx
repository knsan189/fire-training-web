import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
} from "@mui/material"
import {
  type Prerequisite,
  useGetPrerequisitesQuery,
} from "../prerequisiteApiSlice"

interface PrerequisiteCheckboxCardProps {
  value: Prerequisite["id"][]
  onChange: (value: Prerequisite["id"][]) => void
}

const PrerequisiteCheckboxCard = ({
  value,
  onChange,
}: PrerequisiteCheckboxCardProps) => {
  const { data: prerequisites = [] } = useGetPrerequisitesQuery()
  const handleChange = (prerequisite: Prerequisite, checked: boolean) => {
    if (checked) {
      onChange([...value, prerequisite.id])
    } else {
      onChange(value.filter(value => value !== prerequisite.id))
    }
  }
  return (
    <Card>
      <CardHeader title="사전 요구사항" />
      <CardContent>
        {prerequisites.map(prerequisite => (
          <FormControlLabel
            key={prerequisite.id}
            control={<Checkbox />}
            label={prerequisite.name}
            checked={value.includes(prerequisite.id)}
            onChange={(_event, checked) => handleChange(prerequisite, checked)}
          />
        ))}
      </CardContent>
    </Card>
  )
}

export default PrerequisiteCheckboxCard
