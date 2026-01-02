import { Button, Card } from "@mui/material"
import ContentHeader from "../../features/layout/components/ContentHeader"
import DataTable from "../../features/layout/components/DataTable"
import {
  useGetScenariosQuery,
  type Scenario,
} from "../../features/scenario/scenarioApiSlice"
import type { GridColDef, GridRowParams } from "@mui/x-data-grid"
import { useNavigate } from "react-router-dom"
import { Add } from "@mui/icons-material"

const columns: GridColDef<Scenario>[] = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    align: "center",
    headerAlign: "center",
  },
  { field: "name", headerName: "교육 제목", flex: 1 },
  {
    field: "date",
    headerName: "날짜",
    width: 150,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "weather",
    headerName: "날씨",
    width: 100,
    align: "center",
    headerAlign: "center",
  },
]

const ScenarioListPage = () => {
  const { data: scenarios = [] } = useGetScenariosQuery()
  const navigate = useNavigate()

  const handleRowClick = (row: GridRowParams<Scenario>) => {
    navigate(`/scenario/${row.id}`)
  }

  const handleAddScenario = () => {
    navigate("/scenario/new")
  }

  return (
    <>
      <ContentHeader
        title="시나리오 목록"
        breadcrumbs={[]}
        action={
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddScenario}
          >
            <Add />
          </Button>
        }
      />
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
