import { useParams } from "react-router-dom"
import {
  type Scenario,
  useGetScenarioDetailsQuery,
} from "../../features/scenario/scenarioApiSlice"
import { Card, CardContent, CardHeader, Stack, TextField } from "@mui/material"
import ContentHeader from "../../features/layout/components/ContentHeader"
import { useEffect, useState } from "react"
import ExerciseTypeSelectCheckboxCard from "../../features/exerciseType/components/ExerciseTypeCheckboxCard"
import TargetGroupCheckboxCard from "../../features/targetGroup/components/TargetGroupCheckboxCard"
import PrerequisiteCheckboxCard from "../../features/prerequisite/components/PrerequisiteCheckboxCard"
import { type ExerciseType } from "../../features/exerciseType/exerciesTypeApiSlice"
import { type TargetGroup } from "../../features/targetGroup/targetGroupApiSlice"
import { type Prerequisite } from "../../features/prerequisite/prerequisiteApiSlice"
import UserAutocomplete from "../../features/user/components/UserAutocomplete"

const initialValues: Omit<Scenario, "id" | "createdAt" | "updatedAt"> = {
  name: "",
  briefDescription: "",
  startedAt: null,
  date: null,
  weather: null,
  temperature: null,
  humidity: null,
  duration: null,
  officeInCharge: null,
  targetGroupIds: [],
  prerequisiteIds: [],
  numberOfStudents: null,
  notes: null,
  exerciseTypeIds: [],
}

const ScenarioDetailPage = () => {
  const { id = "" } = useParams()
  const [values, setValues] = useState(initialValues)
  const { data: scenario } = useGetScenarioDetailsQuery(Number(id))

  const handleChangeExerciseType = (exerciseTypeIds: ExerciseType["id"][]) => {
    setValues({ ...values, exerciseTypeIds })
  }

  const handleChangeTargetGroup = (targetGroupIds: TargetGroup["id"][]) => {
    setValues({ ...values, targetGroupIds })
  }

  const handleChangePrerequisite = (prerequisiteIds: Prerequisite["id"][]) => {
    setValues({ ...values, prerequisiteIds })
  }

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  useEffect(() => {
    if (scenario) {
      setValues({ ...scenario })
    }
  }, [scenario])

  return (
    <>
      <ContentHeader
        title="훈련 상세"
        breadcrumbs={[
          { label: "훈련 목록", href: "/scenario" },
          { label: scenario?.name ?? "" },
        ]}
      />
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Stack spacing={2} direction="row">
              <TextField
                label="날씨"
                name="weather"
                value={values.weather}
                onChange={handleChangeInput}
              />
              <TextField
                label="온도"
                name="temperature"
                value={values.temperature}
                onChange={handleChangeInput}
              />
              <TextField
                label="습도"
                name="humidity"
                value={values.humidity}
                onChange={handleChangeInput}
              />
              <TextField label="소요 시간" name="duration" />
            </Stack>
            <TextField
              label="훈련 제목"
              name="name"
              value={values.name}
              onChange={handleChangeInput}
            />
            <TextField
              label="훈련 개요"
              name="briefDescription"
              value={values.briefDescription}
              onChange={handleChangeInput}
            />
            <TextField
              label="훈련 시작 시간"
              name="startedAt"
              value={values.startedAt}
              onChange={handleChangeInput}
            />
          </Stack>
        </CardContent>
      </Card>
      <ExerciseTypeSelectCheckboxCard
        value={values.exerciseTypeIds}
        onChange={handleChangeExerciseType}
      />
      <TargetGroupCheckboxCard
        value={values.targetGroupIds}
        onChange={handleChangeTargetGroup}
      />
      <PrerequisiteCheckboxCard
        value={values.prerequisiteIds}
        onChange={handleChangePrerequisite}
      />
      <Card>
        <CardHeader title="교관" />
        <CardContent>
          <UserAutocomplete
            value={values.officeInCharge}
            onChange={handleChangeOfficeInCharge}
          />
        </CardContent>
      </Card>
    </>
  )
}

export default ScenarioDetailPage
