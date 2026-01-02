import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
} from "@mui/material"
import {
  type ExerciseType,
  useGetExerciseTypesQuery,
} from "../exerciesTypeApiSlice"
import { IconButton } from "@mui/material"
import { Add } from "@mui/icons-material"
import { useState } from "react"
import ExerciseTypeDialog from "./ExerciseTypeDialog"

const ExerciseTypeCard = () => {
  const { data: exerciseTypes = [] } = useGetExerciseTypesQuery({})
  const [dialog, setDialog] = useState<boolean | ExerciseType>(false)

  return (
    <>
      <Card>
        <CardHeader
          title="훈련 종류 관리"
          subheader="Exercise Type"
          action={
            <IconButton onClick={() => setDialog(true)}>
              <Add />
            </IconButton>
          }
        />
        <Divider />
        <CardContent>
          <Stack direction="row" spacing={1} flexWrap="wrap" rowGap={1}>
            {exerciseTypes.map(exerciseType => (
              <Button
                key={exerciseType.id}
                onClick={() => setDialog(exerciseType)}
                color={exerciseType.isActive ? "primary" : "secondary"}
              >
                {exerciseType.name}
              </Button>
            ))}
          </Stack>
        </CardContent>
      </Card>
      <ExerciseTypeDialog open={dialog} onClose={() => setDialog(false)} />
    </>
  )
}

export default ExerciseTypeCard
