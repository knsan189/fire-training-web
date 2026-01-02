import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
} from "@mui/material"
import { type Equipment, useGetEquipmentsQuery } from "../equipmentApiSlice"
import { IconButton } from "@mui/material"
import { Add } from "@mui/icons-material"
import { useState } from "react"
import EquipmentDialog from "./EquipmentDialog"

const EquipmentCard = () => {
  const { data: equipments = [] } = useGetEquipmentsQuery({})
  const [dialog, setDialog] = useState<boolean | Equipment>(false)

  return (
    <>
      <Card>
        <CardHeader
          title="장비 관리"
          subheader="Equipment"
          action={
            <IconButton onClick={() => setDialog(true)}>
              <Add />
            </IconButton>
          }
        />
        <Divider />
        <CardContent>
          <Stack direction="row" spacing={1} flexWrap="wrap" rowGap={1}>
            {equipments.map(equipment => (
              <Button
                key={equipment.id}
                onClick={() => setDialog(equipment)}
                color={equipment.isActive ? "primary" : "secondary"}
              >
                {equipment.name}({equipment.unit})
              </Button>
            ))}
          </Stack>
        </CardContent>
      </Card>
      <EquipmentDialog open={dialog} onClose={() => setDialog(false)} />
    </>
  )
}

export default EquipmentCard
