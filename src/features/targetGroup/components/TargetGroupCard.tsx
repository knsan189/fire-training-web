import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
} from "@mui/material"
import {
  type TargetGroup,
  useGetTargetGroupsQuery,
} from "../targetGroupApiSlice"
import { IconButton } from "@mui/material"
import { Add } from "@mui/icons-material"
import { useState } from "react"
import TargetGroupDialog from "./TargetGroupDialog"

const TargetGroupCard = () => {
  const { data: targetGroups = [] } = useGetTargetGroupsQuery({})
  const [dialog, setDialog] = useState<boolean | TargetGroup>(false)

  return (
    <>
      <Card>
        <CardHeader
          title="훈련 대상 관리"
          subheader="Target Group"
          action={
            <IconButton onClick={() => setDialog(true)}>
              <Add />
            </IconButton>
          }
        />
        <Divider />
        <CardContent>
          <Stack direction="row" spacing={1} flexWrap="wrap" rowGap={1}>
            {targetGroups.map(targetGroup => (
              <Button
                key={targetGroup.id}
                onClick={() => setDialog(targetGroup)}
                color={targetGroup.isActive ? "primary" : "secondary"}
              >
                {targetGroup.name}
              </Button>
            ))}
          </Stack>
        </CardContent>
      </Card>
      <TargetGroupDialog open={dialog} onClose={() => setDialog(false)} />
    </>
  )
}

export default TargetGroupCard
