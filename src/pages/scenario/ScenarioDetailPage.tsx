import { useParams } from "react-router-dom"
import {
  ScenarioInstructorRole,
  type ScenarioDetail,
  useGetScenarioDetailsQuery,
  ScenarioLevel,
  type ScenarioNozzleSetting,
  NozzleSettingPurpose,
  useCreateScenarioMutation,
  type CreateScenarioRequest,
  useUpdateScenarioMutation,
} from "../../features/scenario/scenarioApiSlice"
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import ContentHeader from "../../features/layout/components/ContentHeader"
import { type FormEvent, useEffect, useState } from "react"
import ExerciseTypeCheckboxes from "../../features/exerciseType/components/ExerciseTypeCheckboxes"
import TargetGroupCheckboxes from "../../features/targetGroup/components/TargetGroupCheckboxes"
import PrerequisiteCheckboxes from "../../features/prerequisite/components/PrerequisiteCheckboxes"
import { type ExerciseType } from "../../features/exerciseType/exerciesTypeApiSlice"
import { type TargetGroup } from "../../features/targetGroup/targetGroupApiSlice"
import { type Prerequisite } from "../../features/prerequisite/prerequisiteApiSlice"
import UserAutocomplete from "../../features/user/components/UserAutocomplete"
import type { User } from "../../features/user/userApiSlice"
import { Add, Save } from "@mui/icons-material"
import ScenarioNozzelSettingItem from "../../features/scenario/components/ScenarioNozzelSettingItem"
import { skipToken } from "@reduxjs/toolkit/query"
import { useSnackbar } from "notistack"
import { useMinimumLoading } from "../../features/layout/hooks/useMinimumLoading"

const initialValues: Omit<ScenarioDetail, "id" | "createdAt" | "updatedAt"> = {
  name: "",
  briefDescription: "",
  startedAt: new Date().toISOString(),
  date: new Date().toISOString(),
  weather: "",
  temperature: 0,
  humidity: 0,
  duration: 0,
  officeInCharge: null,
  equipments: [],
  targetGroupIds: [],
  prerequisiteIds: [],
  numberOfStudents: 0,
  notes: null,
  level: ScenarioLevel.low,
  exerciseTypeIds: [],
  instructors: {
    [ScenarioInstructorRole.Ignition]: [],
    [ScenarioInstructorRole.Safety]: [],
    [ScenarioInstructorRole.Main]: [],
    [ScenarioInstructorRole.Assistant]: [],
    [ScenarioInstructorRole.Water]: [],
  },
  nozzleSettings: [],
}

const initialNozzleSetting: ScenarioNozzleSetting = {
  hoseCount: 0,
  pressure: 0,
  waterSource: "",
  purpose: NozzleSettingPurpose.EDUCATION,
  note: "",
}

const valuesToScenarioRequest = (
  values: typeof initialValues,
): CreateScenarioRequest => {
  return {
    name: values.name,
    nozzleSettings: values.nozzleSettings,
    targetGroupIds: values.targetGroupIds,
    prerequisiteIds: values.prerequisiteIds,
    exerciseTypeIds: values.exerciseTypeIds,
    briefDescription: values.briefDescription ?? undefined,
    startedAt: values.startedAt ?? undefined,
    date: values.date ?? undefined,
    weather: values.weather ?? undefined,
    temperature: values.temperature ?? undefined,
    humidity: values.humidity ?? undefined,
    duration: values.duration ?? undefined,
    level: values.level ?? ScenarioLevel.low,
    numberOfStudents: values.numberOfStudents ?? undefined,
    notes: values.notes ?? undefined,
    officeInChargeId: values.officeInCharge?.id ?? 0,
    instructors: {
      [ScenarioInstructorRole.Ignition]: values.instructors[
        ScenarioInstructorRole.Ignition
      ].map(user => user.id),
      [ScenarioInstructorRole.Safety]: values.instructors[
        ScenarioInstructorRole.Safety
      ].map(user => user.id),
      [ScenarioInstructorRole.Main]: values.instructors[
        ScenarioInstructorRole.Main
      ].map(user => user.id),
      [ScenarioInstructorRole.Assistant]: values.instructors[
        ScenarioInstructorRole.Assistant
      ].map(user => user.id),
      [ScenarioInstructorRole.Water]: values.instructors[
        ScenarioInstructorRole.Water
      ].map(user => user.id),
    },
  }
}

const ScenarioDetailPage = () => {
  const { id = "new" } = useParams()
  const [values, setValues] = useState(initialValues)
  const isNew = id === "new"
  const { data: scenario, isLoading } = useGetScenarioDetailsQuery(
    isNew ? skipToken : Number(id),
  )

  const [createScenario, { isLoading: isCreating }] =
    useCreateScenarioMutation()
  const [updateScenario, { isLoading: isUpdating }] =
    useUpdateScenarioMutation()

  const handleChangeExerciseType = (exerciseTypeIds: ExerciseType["id"][]) => {
    setValues({ ...values, exerciseTypeIds })
  }

  const handleChangeTargetGroup = (targetGroupIds: TargetGroup["id"][]) => {
    setValues({ ...values, targetGroupIds })
  }

  const handleChangePrerequisite = (prerequisiteIds: Prerequisite["id"][]) => {
    setValues({ ...values, prerequisiteIds })
  }

  const handleChangeOfficeInCharge = (officeInCharge: User | null) => {
    setValues({ ...values, officeInCharge })
  }

  const handleChangeInstructor = (
    role: ScenarioInstructorRole,
    newUsers: User[],
  ) => {
    setValues({
      ...values,
      instructors: { ...values.instructors, [role]: newUsers },
    })
  }

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const handleAddNozzleSetting = () => {
    setValues({
      ...values,
      nozzleSettings: [...values.nozzleSettings, initialNozzleSetting],
    })
  }

  const handleChangeNozzleSetting = (
    index: number,
    nozzleSetting: ScenarioNozzleSetting,
  ) => {
    setValues({
      ...values,
      nozzleSettings: values.nozzleSettings.map((n, i) =>
        i === index ? nozzleSetting : n,
      ),
    })
  }

  const handleDeleteNozzleSetting = (index: number) => {
    setValues({
      ...values,
      nozzleSettings: values.nozzleSettings.filter((_, i) => i !== index),
    })
  }

  const { enqueueSnackbar } = useSnackbar()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isNew) {
      await updateScenario({
        id: Number(id),
        ...valuesToScenarioRequest(values),
      }).unwrap()
    } else {
      await createScenario(valuesToScenarioRequest(values)).unwrap()
    }
    enqueueSnackbar(
      isNew ? "훈련 등록이 완료되었습니다." : "훈련 수정이 완료되었습니다.",
      {
        variant: "success",
      },
    )
  }
  useEffect(() => {
    if (scenario) {
      setValues({
        ...scenario,
        weather: scenario.weather ?? "",
        temperature: scenario.temperature ?? 0,
        humidity: scenario.humidity ?? 0,
        duration: scenario.duration ?? 0,
        level: scenario.level ?? ScenarioLevel.low,
      })
    }
  }, [scenario])

  const disabled = isLoading || isCreating || isUpdating
  const minimumLoading = useMinimumLoading(disabled, 500)

  return (
    <>
      <ContentHeader
        title="훈련 상세"
        breadcrumbs={[
          { label: "훈련 목록", href: "/scenario" },
          { label: isNew ? "신규 훈련 등록" : (scenario?.name ?? "") },
        ]}
      />
      <Stack
        component="form"
        onSubmit={event => void handleSubmit(event)}
        spacing={3}
      >
        <Card variant="outlined">
          <CardContent>
            <Grid container spacing={3}>
              <Grid size={12}>
                <Typography variant="subtitle1" gutterBottom>
                  훈련 정보
                </Typography>
              </Grid>
              <Grid size={12}>
                <TextField
                  label="훈련 제목"
                  name="name"
                  value={values.name}
                  onChange={handleChangeInput}
                  fullWidth
                  required
                  disabled={minimumLoading}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  label="훈련 개요"
                  name="briefDescription"
                  value={values.briefDescription}
                  onChange={handleChangeInput}
                  fullWidth
                  required
                  disabled={minimumLoading}
                />
              </Grid>
              <Grid size={3}>
                <TextField
                  label="훈련 시작 시간"
                  name="startedAt"
                  value={values.startedAt}
                  onChange={handleChangeInput}
                  fullWidth
                  disabled={minimumLoading}
                />
              </Grid>
              <Grid size={3}>
                <TextField
                  label="날씨"
                  name="weather"
                  value={values.weather}
                  onChange={handleChangeInput}
                  fullWidth
                  disabled={minimumLoading}
                />
              </Grid>
              <Grid size={3}>
                <TextField
                  label="온도"
                  name="temperature"
                  value={values.temperature}
                  onChange={handleChangeInput}
                  type="number"
                  fullWidth
                  disabled={minimumLoading}
                />
              </Grid>
              <Grid size={3}>
                <TextField
                  label="습도"
                  name="humidity"
                  value={values.humidity}
                  onChange={handleChangeInput}
                  type="number"
                  fullWidth
                  disabled={minimumLoading}
                />
              </Grid>
              <Grid size={4}>
                <TextField
                  label="소요 시간"
                  name="duration"
                  value={values.duration}
                  onChange={handleChangeInput}
                  fullWidth
                  disabled={minimumLoading}
                />
              </Grid>
              <Grid size={4}>
                <TextField
                  label="훈련 난이도"
                  name="level"
                  value={values.level}
                  onChange={handleChangeInput}
                  fullWidth
                  select
                  disabled={minimumLoading}
                >
                  <MenuItem value={ScenarioLevel.low}>하</MenuItem>
                  <MenuItem value={ScenarioLevel.medium}>중</MenuItem>
                  <MenuItem value={ScenarioLevel.high}>상</MenuItem>
                </TextField>
              </Grid>
              <Grid size={4}>
                <TextField
                  label="교육 참여자 수"
                  name="numberOfStudents"
                  value={values.numberOfStudents}
                  onChange={handleChangeInput}
                  fullWidth
                  disabled={minimumLoading}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card variant="outlined">
          <CardContent>
            <Grid container spacing={3}>
              <Grid size={12}>
                <Typography variant="subtitle1" gutterBottom>
                  훈련 유형
                </Typography>
                <ExerciseTypeCheckboxes
                  value={values.exerciseTypeIds}
                  onChange={handleChangeExerciseType}
                  disabled={minimumLoading}
                />
              </Grid>
              <Grid size={12}>
                <Typography variant="subtitle1" gutterBottom>
                  훈련 대상
                </Typography>
                <TargetGroupCheckboxes
                  value={values.targetGroupIds}
                  onChange={handleChangeTargetGroup}
                  disabled={minimumLoading}
                />
              </Grid>
              <Grid size={12}>
                <Typography variant="subtitle1" gutterBottom>
                  사전 요구사항
                </Typography>
                <PrerequisiteCheckboxes
                  value={values.prerequisiteIds}
                  onChange={handleChangePrerequisite}
                  disabled={minimumLoading}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card variant="outlined">
          <CardContent>
            <Grid container spacing={3}>
              <Grid
                size={12}
                display="flex"
                justifyContent="space-between"
                alignItems="start"
              >
                <Typography variant="subtitle1" gutterBottom>
                  관창/호스 정보
                </Typography>
                <IconButton onClick={handleAddNozzleSetting}>
                  <Add />
                </IconButton>
              </Grid>
              {values.nozzleSettings.map((nozzleSetting, i) => (
                <Grid size={12} key={i}>
                  <ScenarioNozzelSettingItem
                    disabled={minimumLoading}
                    nozzleSetting={nozzleSetting}
                    onChange={(nozzleSetting: ScenarioNozzleSetting) =>
                      handleChangeNozzleSetting(i, nozzleSetting)
                    }
                    onDelete={() => handleDeleteNozzleSetting(i)}
                  />
                </Grid>
              ))}
              {values.nozzleSettings.length === 0 && (
                <Grid size={12}>
                  <Typography variant="body2" color="textSecondary">
                    등록된 정보가 없습니다. 추가하려면 우측의 버튼을 클릭하세요.
                  </Typography>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
        <Card variant="outlined">
          <CardContent>
            <Grid container spacing={3}>
              <Grid size={12}>
                <Typography variant="subtitle1" gutterBottom>
                  교관 정보
                </Typography>
              </Grid>
              <Grid size={12}>
                <UserAutocomplete
                  value={values.officeInCharge}
                  onChange={handleChangeOfficeInCharge}
                  label="총괄 교관"
                  disabled={minimumLoading}
                />
              </Grid>
              <Grid size={6}>
                <UserAutocomplete
                  multiple
                  label="주 교관"
                  value={values.instructors[ScenarioInstructorRole.Main]}
                  onChange={(newUsers: User[]) =>
                    handleChangeInstructor(
                      ScenarioInstructorRole.Main,
                      newUsers,
                    )
                  }
                  placeholder={`주 교관을 선택하세요`}
                  disabled={minimumLoading}
                />
              </Grid>
              <Grid size={6}>
                <UserAutocomplete
                  multiple
                  label="보조 교관"
                  value={values.instructors[ScenarioInstructorRole.Assistant]}
                  onChange={(newUsers: User[]) =>
                    handleChangeInstructor(
                      ScenarioInstructorRole.Assistant,
                      newUsers,
                    )
                  }
                  placeholder={`보조 교관을 선택하세요`}
                  disabled={minimumLoading}
                />
              </Grid>
              <Grid size={4}>
                <UserAutocomplete
                  multiple
                  label="급수 교관"
                  value={values.instructors[ScenarioInstructorRole.Water]}
                  onChange={(newUsers: User[]) =>
                    handleChangeInstructor(
                      ScenarioInstructorRole.Water,
                      newUsers,
                    )
                  }
                  placeholder={`급수 교관을 선택하세요`}
                  disabled={minimumLoading}
                />
              </Grid>
              <Grid size={4}>
                <UserAutocomplete
                  multiple
                  label="안전 교관"
                  value={values.instructors[ScenarioInstructorRole.Safety]}
                  onChange={(newUsers: User[]) =>
                    handleChangeInstructor(
                      ScenarioInstructorRole.Safety,
                      newUsers,
                    )
                  }
                  placeholder={`안전 교관을 선택하세요`}
                  disabled={minimumLoading}
                />
              </Grid>
              <Grid size={4}>
                <UserAutocomplete
                  multiple
                  label="점화 교관"
                  value={values.instructors[ScenarioInstructorRole.Ignition]}
                  onChange={(newUsers: User[]) =>
                    handleChangeInstructor(
                      ScenarioInstructorRole.Ignition,
                      newUsers,
                    )
                  }
                  disabled={minimumLoading}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Box textAlign="right">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<Save />}
            loading={minimumLoading}
          >
            저장
          </Button>
        </Box>
      </Stack>
    </>
  )
}

export default ScenarioDetailPage
