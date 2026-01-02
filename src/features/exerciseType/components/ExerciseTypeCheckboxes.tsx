import {
  useGetExerciseTypesQuery,
  type ExerciseType,
} from "../exerciesTypeApiSlice"
import { Checkbox, FormControlLabel } from "@mui/material"

interface ExerciseTypeSelectProps {
  value: ExerciseType["id"][]
  disabled: boolean
  onChange: (value: ExerciseType["id"][]) => void
}

const ExerciseTypeCheckboxes = ({
  value,
  disabled,
  onChange,
}: ExerciseTypeSelectProps) => {
  const { data: exerciseTypes = [] } = useGetExerciseTypesQuery({
    isActive: true,
  })

  const handleChange = (exerciseType: ExerciseType, checked: boolean) => {
    if (checked) {
      onChange([...value, exerciseType.id])
    } else {
      onChange(value.filter(value => value !== exerciseType.id))
    }
  }
  return exerciseTypes.map(exerciseType => (
    <FormControlLabel
      key={exerciseType.id}
      disabled={disabled}
      control={<Checkbox />}
      label={exerciseType.name}
      checked={value.includes(exerciseType.id)}
      onChange={(_event, checked) => handleChange(exerciseType, checked)}
      slotProps={{
        typography: {
          variant: "body2",
        },
      }}
    />
  ))
}
export default ExerciseTypeCheckboxes
