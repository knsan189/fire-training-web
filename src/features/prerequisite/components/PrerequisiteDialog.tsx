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
  useCreatePrerequisiteMutation,
  useDeletePrerequisiteMutation,
  useUpdatePrerequisiteMutation,
  type CreatePrerequisiteRequest,
  type Prerequisite,
} from "../prerequisiteApiSlice"
import { type ChangeEvent, type FormEvent, useEffect, useState } from "react"
import { Close, Delete, Save } from "@mui/icons-material"
import { useSnackbar } from "notistack"
import ConfirmButton from "../../layout/components/ConfirmButton"

interface PrerequisiteDialogProps {
  open: Prerequisite | boolean
  onClose: () => void
}

const initialValues: CreatePrerequisiteRequest = {
  name: "",
  description: "",
  isActive: true,
}

const PrerequisiteDialog = ({ open, onClose }: PrerequisiteDialogProps) => {
  const [values, setValues] = useState(initialValues)
  const [createPrerequisite, { isLoading: isCreating }] =
    useCreatePrerequisiteMutation()
  const [updatePrerequisite, { isLoading: isUpdating }] =
    useUpdatePrerequisiteMutation()
  const [deletePrerequisite, { isLoading: isDeleting }] =
    useDeletePrerequisiteMutation()

  const { enqueueSnackbar } = useSnackbar()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (typeof open === "object") {
        await updatePrerequisite({ id: open.id, ...values }).unwrap()
      } else {
        await createPrerequisite(values).unwrap()
      }
      handleClose()
      enqueueSnackbar("사전 조건 관리가 성공적으로 저장되었습니다.", {
        variant: "success",
      })
    } catch {
      enqueueSnackbar("사전 조건 관리 저장에 실패했습니다.", {
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

  const isLoading = isCreating || isUpdating || isDeleting

  const handleDelete = async () => {
    if (typeof open !== "object") return
    try {
      await deletePrerequisite(open.id).unwrap()
      handleClose()
      enqueueSnackbar("사전 조건 관리가 성공적으로 삭제되었습니다.", {
        variant: "success",
      })
    } catch {
      enqueueSnackbar("사전 조건 관리 삭제에 실패했습니다.", {
        variant: "error",
      })
    }
  }
  return (
    <Dialog open={Boolean(open)} onClose={handleClose} fullWidth>
      <form onSubmit={e => void handleSubmit(e)}>
        <DialogTitle>사전 조건 관리</DialogTitle>
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
          {typeof open === "object" && (
            <ConfirmButton
              onClick={() => void handleDelete()}
              loading={isDeleting}
              color="error"
              startIcon={<Delete />}
            >
              삭제
            </ConfirmButton>
          )}
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

export default PrerequisiteDialog
