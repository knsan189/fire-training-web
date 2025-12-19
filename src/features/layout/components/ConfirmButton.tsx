import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  type ButtonProps,
} from "@mui/material"
import { useState } from "react"
import { Close, Check } from "@mui/icons-material"

interface ConfirmProps extends ButtonProps {
  slotProps?: {
    dialog?: {
      title?: string
      content?: string
    }
  }
}

const ConfirmButton = ({
  children,
  slotProps,
  onClick,
  ...props
}: ConfirmProps) => {
  const [callback, setCallback] = useState<() => void>()

  const handleClose = () => {
    setCallback(undefined)
  }

  const handleConfirm = () => {
    handleClose()
    callback?.()
  }

  const handleClick = () => {
    setCallback(() => onClick)
  }

  return (
    <>
      <Dialog open={callback !== undefined} onClose={handleClose} fullWidth>
        <DialogTitle>
          {slotProps?.dialog?.title ?? "정말로 삭제하시겠습니까?"}
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" color="text.secondary">
            {slotProps?.dialog?.content ?? "삭제하면 복구할 수 없습니다."}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleConfirm}
            color="error"
            variant="contained"
            startIcon={<Check />}
          >
            확인
          </Button>
          <Button onClick={handleClose} color="inherit" startIcon={<Close />}>
            취소
          </Button>
        </DialogActions>
      </Dialog>
      <Button {...props} onClick={handleClick}>
        {children}
      </Button>
    </>
  )
}

export default ConfirmButton
