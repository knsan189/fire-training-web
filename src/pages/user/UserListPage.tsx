import { Button, Card, CardContent, Divider, TextField } from "@mui/material"
import ContentHeader from "../../features/layout/components/ContentHeader"
import {
  useGetUsersQuery,
  type GetUsersRequest,
  type User,
} from "../../features/user/userApiSlice"
import DataTable from "../../features/layout/components/DataTable"
import type { GridColDef, GridRowParams } from "@mui/x-data-grid"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Add } from "@mui/icons-material"

const columns: GridColDef<User>[] = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    align: "center",
    headerAlign: "center",
  },
  { field: "name", headerName: "이름", flex: 1 },
  {
    field: "createdAt",
    headerName: "생성일",
    width: 150,
    align: "center",
    headerAlign: "center",
    valueFormatter: value => new Date(value).toLocaleDateString(),
  },
  {
    field: "isActive",
    headerName: "활성화",
    width: 100,
    align: "center",
    headerAlign: "center",
    valueFormatter: value => (value ? "활성" : "비활성"),
  },
]

const UserListPage = () => {
  const navigate = useNavigate()
  const [request, setRequest] = useState<GetUsersRequest>({ name: "" })
  const { data: users = [] } = useGetUsersQuery(request)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRequest({ ...request, [event.target.name]: event.target.value })
  }

  const handleRowClick = (row: GridRowParams<User>) => {
    navigate(`/user/${row.id}`)
  }

  return (
    <>
      <ContentHeader
        title="사용자 목록"
        breadcrumbs={[{ label: "사용자 목록" }]}
        action={
          <Button onClick={() => void navigate("/user/new")}>
            <Add />
          </Button>
        }
      />
      <Card>
        <CardContent>
          <TextField
            fullWidth
            label="이름"
            name="name"
            value={request.name}
            onChange={handleChange}
          />
        </CardContent>
        <Divider />
        <DataTable rows={users} columns={columns} onRowClick={handleRowClick} />
      </Card>
    </>
  )
}

export default UserListPage
