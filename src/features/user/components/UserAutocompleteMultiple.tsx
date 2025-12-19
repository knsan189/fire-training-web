import { Autocomplete, Box, Chip, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useGetUsersQuery, type User } from "../userApiSlice"

interface UserAutocompleteMultipleProps {
  value: User[]
  onChange: (value: User[]) => void
  label?: string
  placeholder?: string
}

const UserAutocompleteMultiple = ({
  value,
  onChange,
  label = "사용자",
  placeholder = "사용자를 선택하세요",
}: UserAutocompleteMultipleProps) => {
  const [inputValue, setInputValue] = useState("")

  const { data: users = [] } = useGetUsersQuery(
    { name: inputValue },
    { skip: inputValue.length === 0 },
  )

  const handleChange = (_event: React.SyntheticEvent, newValue: User[]) => {
    onChange(newValue)
  }

  return (
    <Autocomplete
      multiple
      inputValue={inputValue}
      value={value}
      onChange={handleChange}
      onInputChange={(_event, value) => setInputValue(value)}
      renderInput={params => (
        <TextField {...params} label={label} placeholder={placeholder} />
      )}
      options={users}
      getOptionLabel={user => user.name ?? "이름 없음"}
      renderOption={(props, user) => (
        <li {...props} key={user.id}>
          <Typography variant="body2">{user.name}</Typography>
        </li>
      )}
      renderValue={(selected, getItemProps) => (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {selected.map((option, index) => (
            <Chip
              label={option.name ?? "이름 없음"}
              size="small"
              {...getItemProps({ index })}
            />
          ))}
        </Box>
      )}
    />
  )
}

export default UserAutocompleteMultiple
