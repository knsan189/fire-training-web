import { Card } from "@mui/material"
import ContentHeader from "../../features/layout/components/ContentHeader"
import DataTable from "../../features/layout/components/DataTable"
import {
  useGetScenariosQuery,
  type Scenario,
} from "../../features/scenario/scenarioApiSlice"
import type { GridColDef, GridRowParams } from "@mui/x-data-grid"
import { useNavigate } from "react-router-dom"

const columns: GridColDef<Scenario>[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "이름", width: 200 },
  { field: "briefDescription", headerName: "간략한 설명", width: 200 },
  { field: "startedAt", headerName: "시작 시간", width: 200 },
  { field: "date", headerName: "날짜", width: 200 },
  { field: "weather", headerName: "날씨", width: 200 },
]

const ScenarioListPage = () => {
  const { data: scenarios = [] } = useGetScenariosQuery()
  const navigate = useNavigate()

  const handleRowClick = (row: GridRowParams<Scenario>) => {
    navigate(`/scenario/${row.id}`)
  }

  return (
    <>
      <ContentHeader title="시나리오 목록" breadcrumbs={[]} />
      <Card>
        <DataTable
          rows={scenarios}
          columns={columns}
          onRowClick={handleRowClick}
        />
      </Card>
    </>
  )
}

export default ScenarioListPage
