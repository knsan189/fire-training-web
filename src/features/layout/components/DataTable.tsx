import { styled, type Theme } from "@mui/material"
import { DataGrid, type DataGridProps } from "@mui/x-data-grid"

interface Props extends DataGridProps {}

const StyledDataGrid = styled(DataGrid)(({ theme }: { theme: Theme }) => ({
  // borderRadius: 0,
  // border: "none",
  // backgroundColor: theme.palette.background.paper,
  "--unstable_DataGrid-radius": 0,

  // // },
  // "& .MuiDataGrid-main": {
  //   border: "none",
  // },
  // "& .MuiDataGrid-columnsContainer": {
  //   backgroundColor: theme.palette.background.default,
  // },
  // "& .MuiDataGrid-columnHeader": {
  //   borderBottom: `2px solid ${theme.palette.primary.main}`,
  //   color: theme.palette.primary.main,
  //   backgroundColor: theme.palette.background.default,
  // },

  "& .MuiDataGrid-cell": {
    // borderRight: `1px solid ${theme.palette.divider}`,
    // backgroundColor: theme.palette.background.paper,
    // cursor: "pointer",
  },

  "& .MuiDataGrid-row": {
    cursor: "pointer",
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  "& .MuiDataGrid-row:last-child": {
    borderBottom: "none",
  },
  "& .MuiDataGrid-row:first-of-type": {
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  "& .MuiDataGrid-columnHeaders": {
    background: theme.palette.divider,
  },
  "& .MuiDataGrid-withBorderColor": {
    borderColor: theme.palette.divider,
  },
}))

const DataTable = ({ ...restProps }: Props) => {
  return (
    <StyledDataGrid
      disableColumnMenu
      // disableColumnFilter
      // disableEval
      // disableVirtualization
      // hideFooter
      localeText={{
        footerRowSelected: (count: number) => `${count}건 선택됨`,
        noRowsLabel: "데이터가 존재하지 않습니다.",
        paginationRowsPerPage: "페이지당 행 수",
        paginationDisplayedRows: ({ from, to, count }) =>
          `총 ${count}건 중 ${from}-${to}`,
      }}
      {...restProps}
    />
  )
}

export default DataTable
