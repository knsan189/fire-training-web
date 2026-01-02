import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Button,
  MenuItem,
} from "@mui/material"
import {
  useCreateExerciseTypeMutation,
  useUpdateExerciseTypeMutation,
  type CreateExerciseTypeRequest,
  type ExerciseType,
} from "../exerciesTypeApiSlice"
import { type ChangeEvent, type FormEvent, useEffect, useState } from "react"
import { Close, Save } from "@mui/icons-material"
import { useSnackbar } from "notistack"

interface ExerciseTypeDialogProps {
  open: ExerciseType | boolean
  onClose: () => void
}

const initialValues: CreateExerciseTypeRequest = {
  name: "",
  description: "",
  isActive: true,
}

const ExerciseTypeDialog = ({ open, onClose }: ExerciseTypeDialogProps) => {
  const [values, setValues] = useState(initialValues)
  const [createExerciseType, { isLoading: isCreating }] =
    useCreateExerciseTypeMutation()
  const [updateExerciseType, { isLoading: isUpdating }] =
    useUpdateExerciseTypeMutation()

  const { enqueueSnackbar } = useSnackbar()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (typeof open === "object") {
        await updateExerciseType({ id: open.id, ...values }).unwrap()
      } else {
        await createExerciseType(values).unwrap()
      }
      handleClose()
      enqueueSnackbar("운동 유형 관리가 성공적으로 저장되었습니다.", {
        variant: "success",
      })
    } catch {
      enqueueSnackbar("운동 유형 관리 저장에 실패했습니다.", {
        variant: "error",
      })
    }
  }
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "isActive") {
      setValues({ ...values, isActive: event.target.value === "true" })
    } else {
      setValues({ ...values, [event.target.name]: event.target.value })
    }
  }

  const handleClose = () => {
    setValues(initialValues)
    onClose()
  }

  useEffect(() => {
    if (typeof open === "object") {
      setValues({
        name: open.name,
        description: open.description ?? "",
        isActive: open.isActive,
      })
    }
  }, [open])

  const isLoading = isCreating || isUpdating
  return (
    <Dialog open={Boolean(open)} onClose={handleClose} fullWidth>
      <form onSubmit={e => void handleSubmit(e)}>
        <DialogTitle>운동 유형 관리</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <TextField
              label="이름"
              name="name"
              value={values.name}
              onChange={handleChange}
              disabled={isLoading}
            />
            <TextField
              label="설명"
              name="description"
              value={values.description}
              onChange={handleChange}
              disabled={isLoading}
            />
            <TextField
              select
              label="활성"
              name="isActive"
              value={values.isActive}
              onChange={handleChange}
              disabled={isLoading}
            >
              <MenuItem value="true">활성</MenuItem>
              <MenuItem value="false">비활성</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button type="submit" startIcon={<Save />} loading={isLoading}>
            저장
          </Button>
          <Button
            onClick={onClose}
            color="inherit"
            startIcon={<Close />}
            disabled={isLoading}
          >
            취소
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default ExerciseTypeDialog

