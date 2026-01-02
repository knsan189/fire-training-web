import { useGetEquipmentsQuery } from "../equipmentApiSlice"
import { Grid, InputAdornment, TextField, Typography } from "@mui/material"

const EquipmentInputList = () => {
  const { data: equipments = [] } = useGetEquipmentsQuery({
    isActive: true,
  })
  return equipments.map(equipment => (
    <Grid size={3} key={equipment.id}>
      <TextField
        label={equipment.name}
        fullWidth
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <Typography variant="caption">{equipment.unit}</Typography>
              </InputAdornment>
            ),
          },
        }}
      />
    </Grid>
  ))
}

export default EquipmentInputList
