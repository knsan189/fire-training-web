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
  useCreateTargetGroupMutation,
  useDeleteTargetGroupMutation,
  useUpdateTargetGroupMutation,
  type CreateTargetGroupRequest,
  type TargetGroup,
} from "../targetGroupApiSlice"
import { type ChangeEvent, type FormEvent, useEffect, useState } from "react"
import { Close, Delete, Save } from "@mui/icons-material"
import { useSnackbar } from "notistack"
import ConfirmButton from "../../layout/components/ConfirmButton"

interface TargetGroupDialogProps {
  open: TargetGroup | boolean
  onClose: () => void
}

const initialValues: CreateTargetGroupRequest = {
  name: "",
  description: "",
  isActive: true,
}

const TargetGroupDialog = ({ open, onClose }: TargetGroupDialogProps) => {
  const [values, setValues] = useState(initialValues)
  const [createTargetGroup, { isLoading: isCreating }] =
    useCreateTargetGroupMutation()
  const [updateTargetGroup, { isLoading: isUpdating }] =
    useUpdateTargetGroupMutation()
  const [deleteTargetGroup, { isLoading: isDeleting }] =
    useDeleteTargetGroupMutation()
  const { enqueueSnackbar } = useSnackbar()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (typeof open === "object") {
        await updateTargetGroup({ id: open.id, ...values }).unwrap()
      } else {
        await createTargetGroup(values).unwrap()
      }
      handleClose()
      enqueueSnackbar("교육 대상 관리가 성공적으로 저장되었습니다.", {
        variant: "success",
      })
    } catch {
      enqueueSnackbar("교육 대상 관리 저장에 실패했습니다.", {
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
    console.log(open)
    try {
      await deleteTargetGroup(open.id).unwrap()
      handleClose()
      enqueueSnackbar("교육 대상 관리가 성공적으로 삭제되었습니다.", {
        variant: "success",
      })
    } catch {
      enqueueSnackbar("교육 대상 관리 삭제에 실패했습니다.", {
        variant: "error",
      })
    }
  }
  return (
    <Dialog open={Boolean(open)} onClose={handleClose} fullWidth>
      <form onSubmit={e => void handleSubmit(e)}>
        <DialogTitle>교육 대상 관리</DialogTitle>
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

export default TargetGroupDialog
