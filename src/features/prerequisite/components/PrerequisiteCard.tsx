import { Button, Card, CardContent, CardHeader, Stack } from "@mui/material"
import {
  type Prerequisite,
  useGetPrerequisitesQuery,
} from "../prerequisiteApiSlice"
import { IconButton } from "@mui/material"
import { Add } from "@mui/icons-material"
import { useState } from "react"
import PrerequisiteDialog from "./PrerequisiteDialog"

const PrerequisiteCard = () => {
  const { data: prerequisites = [] } = useGetPrerequisitesQuery({})
  const [dialog, setDialog] = useState<boolean | Prerequisite>(false)

  return (
    <>
      <Card>
        <CardHeader
          title="사전 조건 관리"
          action={
            <IconButton onClick={() => setDialog(true)}>
              <Add />
            </IconButton>
          }
        />
        <CardContent>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {prerequisites.map(prerequisite => (
              <Button
                key={prerequisite.id}
                onClick={() => setDialog(prerequisite)}
                color={prerequisite.isActive ? "primary" : "secondary"}
              >
                {prerequisite.name}
              </Button>
            ))}
          </Stack>
        </CardContent>
      </Card>
      <PrerequisiteDialog open={dialog} onClose={() => setDialog(false)} />
    </>
  )
}

export default PrerequisiteCard
