import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
} from "@mui/material"
import {
  useGetTargetGroupsQuery,
  type TargetGroup,
} from "../targetGroupApiSlice"

interface TargetGroupCheckboxCardProps {
  value: TargetGroup["id"][]
  onChange: (value: TargetGroup["id"][]) => void
}

const TargetGroupCheckboxCard = ({
  value,
  onChange,
}: TargetGroupCheckboxCardProps) => {
  const { data: targetGroups = [] } = useGetTargetGroupsQuery()

  const handleChange = (targetGroup: TargetGroup, checked: boolean) => {
    if (checked) {
      onChange([...value, targetGroup.id])
    } else {
      onChange(value.filter(value => value !== targetGroup.id))
    }
  }
  return (
    <Card>
      <CardHeader title="훈련 대상" />
      <CardContent>
        {targetGroups.map(targetGroup => (
          <FormControlLabel
            key={targetGroup.id}
            control={<Checkbox />}
            label={targetGroup.name}
            checked={value.includes(targetGroup.id)}
            onChange={(_event, checked) => handleChange(targetGroup, checked)}
          />
        ))}
      </CardContent>
    </Card>
  )
}

export default TargetGroupCheckboxCard
