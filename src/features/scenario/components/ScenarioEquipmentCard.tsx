import { Card, CardContent, Typography, Grid } from "@mui/material"
import EquipmentInputList from "../../equipment/components/EquipmentInputList"

const ScenarioEquipmentCard = () => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Typography variant="subtitle1" gutterBottom>
              훈련 장비
            </Typography>
          </Grid>
          <EquipmentInputList />
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ScenarioEquipmentCard
