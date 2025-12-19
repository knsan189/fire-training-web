import {
  useGetExerciseTypesQuery,
  type ExerciseType,
} from "../exerciesTypeApiSlice"
import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
} from "@mui/material"

interface ExerciseTypeSelectProps {
  value: ExerciseType["id"][]
  onChange: (value: ExerciseType["id"][]) => void
}

const ExerciseTypeCheckboxCard = ({
  value,
  onChange,
}: ExerciseTypeSelectProps) => {
  const { data: exerciseTypes = [] } = useGetExerciseTypesQuery()

  const handleChange = (exerciseType: ExerciseType, checked: boolean) => {
    if (checked) {
      onChange([...value, exerciseType.id])
    } else {
      onChange(value.filter(value => value !== exerciseType.id))
    }
  }
  return (
    <Card>
      <CardHeader title="훈련 유형" />
      <CardContent>
        {exerciseTypes.map(exerciseType => (
          <FormControlLabel
            key={exerciseType.id}
            control={<Checkbox />}
            label={exerciseType.name}
            checked={value.includes(exerciseType.id)}
            onChange={(_event, checked) => handleChange(exerciseType, checked)}
          />
        ))}
      </CardContent>
    </Card>
  )
}

export default ExerciseTypeCheckboxCard
