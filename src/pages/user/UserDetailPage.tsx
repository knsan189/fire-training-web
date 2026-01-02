import {
  Button,
  Card,
  CardActions,
  CardContent,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material"
import ContentHeader from "../../features/layout/components/ContentHeader"
import { useNavigate, useParams } from "react-router-dom"
import {
  useCreateUserMutation,
  useGetUserDetailsQuery,
  UserRole,
  useUpdateUserMutation,
} from "../../features/user/userApiSlice"
import { useEffect, useState } from "react"
import { List, Save } from "@mui/icons-material"
import { useAppDispatch } from "../../app/hooks"
import { setMaxWidth } from "../../features/layout/layoutSlice"
import { skipToken } from "@reduxjs/toolkit/query"
import { useSnackbar } from "notistack"

interface Values {
  name: string
  email: string
  password: string
  role: UserRole
  isActive: boolean
  notes: string
}

const initialValues: Values = {
  name: "",
  email: "test@test.com",
  password: "",
  role: UserRole.Instructor,
  isActive: true,
  notes: "",
}

const UserDetailPage = () => {
  const { id = "" } = useParams()
  const navigate = useNavigate()
  const { data: user } = useGetUserDetailsQuery(
    id === "new" ? skipToken : Number(id),
  )
  const [values, setValues] = useState<Values>(initialValues)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "isActive") {
      setValues({ ...values, isActive: event.target.value === "true" })
    } else {
      setValues({ ...values, [event.target.name]: event.target.value })
    }
  }

  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    dispatch(setMaxWidth("md"))
    return () => {
      dispatch(setMaxWidth("lg"))
    }
  }, [dispatch])

  useEffect(() => {
    if (user) {
      setValues({
        name: user.name ?? "",
        email: user.email ?? "",
        password: user.password ?? "",
        role: user.role ?? UserRole.Instructor,
        isActive: user.isActive ?? true,
        notes: user.notes ?? "",
      })
    }
  }, [user])

  const [createUser, { isLoading: isCreating }] = useCreateUserMutation()
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (id === "new") {
        await createUser(values).unwrap()
        navigate("/user")
      } else {
        await updateUser({ id: Number(id), ...values }).unwrap()
      }
      enqueueSnackbar("사용자 저장에 성공했습니다.", {
        variant: "success",
      })
    } catch {
      enqueueSnackbar("사용자 저장에 실패했습니다.", {
        variant: "error",
      })
    }
  }

  return (
    <>
      <ContentHeader
        title="사용자 상세"
        breadcrumbs={[
          { label: "사용자 목록", href: "/user" },
          { label: "사용자 상세" },
        ]}
        action={
          <Button color="inherit" onClick={() => void navigate("/user")}>
            <List />
          </Button>
        }
      />
      <Card component="form" onSubmit={event => void handleSubmit(event)}>
        <CardContent>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="이름"
              name="name"
              value={values.name}
              onChange={handleChange}
              required
            />
            {/* <TextField
              fullWidth
              label="이메일"
              name="email"
              value={values.email}
              onChange={handleChange}
            /> */}
            <TextField
              fullWidth
              label="활성화"
              name="isActive"
              value={values.isActive}
              onChange={handleChange}
              select
            >
              <MenuItem value="true">활성</MenuItem>
              <MenuItem value="false">비활성</MenuItem>
            </TextField>
            <TextField
              fullWidth
              label="메모"
              name="notes"
              value={values.notes}
              onChange={handleChange}
              multiline
              minRows={3}
            />
          </Stack>
        </CardContent>
        <CardActions>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<Save />}
            disabled={isCreating || isUpdating}
          >
            저장
          </Button>
        </CardActions>
      </Card>
    </>
  )
}

export default UserDetailPage
