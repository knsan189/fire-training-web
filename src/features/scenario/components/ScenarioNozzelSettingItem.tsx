import { Grid, IconButton, MenuItem, TextField } from "@mui/material"
import {
  NozzleSettingPurpose,
  type ScenarioNozzleSetting,
} from "../scenarioApiSlice"
import { Remove } from "@mui/icons-material"

export interface ScenarioNozzelSettingItemProps {
  nozzleSetting: ScenarioNozzleSetting
  disabled: boolean
  onChange: (nozzleSetting: ScenarioNozzleSetting) => void
  onDelete: () => void
}

const ScenarioNozzelSettingItem = ({
  nozzleSetting,
  disabled,
  onChange,
  onDelete,
}: ScenarioNozzelSettingItemProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...nozzleSetting, [event.target.name]: event.target.value })
  }
  return (
    <Grid container spacing={2}>
      <Grid size={4}>
        <TextField
          select
          name="purpose"
          value={nozzleSetting.purpose}
          onChange={handleChange}
          fullWidth
          required
          disabled={disabled}
        >
          <MenuItem value={NozzleSettingPurpose.EDUCATION}>교육훈련</MenuItem>
          <MenuItem value={NozzleSettingPurpose.EMERGENCY}>긴급훈련</MenuItem>
          <MenuItem value={NozzleSettingPurpose.SAFETY}>안전 통제</MenuItem>
        </TextField>
      </Grid>
      <Grid size={2}>
        <TextField
          label="호스 개수"
          name="hoseCount"
          value={nozzleSetting.hoseCount}
          onChange={handleChange}
          fullWidth
          required
          type="number"
          disabled={disabled}
        />
      </Grid>
      <Grid size={2}>
        <TextField
          label="압력"
          name="pressure"
          value={nozzleSetting.pressure}
          onChange={handleChange}
          fullWidth
          required
          type="number"
          disabled={disabled}
        />
      </Grid>
      <Grid size={3}>
        <TextField
          label="수원"
          name="waterSource"
          value={nozzleSetting.waterSource}
          onChange={handleChange}
          fullWidth
          required
          disabled={disabled}
        />
      </Grid>
      <Grid size={1}>
        <IconButton color="error" onClick={onDelete} disabled={disabled}>
          <Remove />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default ScenarioNozzelSettingItem
