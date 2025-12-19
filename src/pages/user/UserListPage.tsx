import { Card } from "@mui/material"
import ContentHeader from "../../features/layout/components/ContentHeader"
import { useGetUsersQuery, type User } from "../../features/user/userApiSlice"
import DataTable from "../../features/layout/components/DataTable"
import type { GridColDef } from "@mui/x-data-grid"

const columns: GridColDef<User>[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "email", headerName: "이메일", width: 200 },
  { field: "name", headerName: "이름", width: 200 },
  { field: "role", headerName: "역할", width: 200 },
  { field: "isActive", headerName: "활성화", width: 200 },
]

const UserListPage = () => {
  const { data: users = [] } = useGetUsersQuery()
  return (
    <>
      <ContentHeader title="사용자 목록" breadcrumbs={[]} />
      <Card>
        <DataTable rows={users} columns={columns} />
      </Card>
    </>
  )
}

export default UserListPage
