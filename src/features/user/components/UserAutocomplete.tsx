import { Autocomplete, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useGetUsersQuery, type User } from "../userApiSlice"

interface UserAutocompleteProps {
  value: User | null
  onChange: (value: User | null) => void
}

const UserAutocomplete = ({ value, onChange }: UserAutocompleteProps) => {
  const [inputValue, setInputValue] = useState("")

  const { data: users = [] } = useGetUsersQuery(
    { name: inputValue },
    { skip: inputValue.length === 0 },
  )

  const handleChange = (_event: React.SyntheticEvent, value: User | null) => {
    onChange(value)
  }

  return (
    <Autocomplete
      inputValue={inputValue}
      value={value}
      onChange={handleChange}
      onInputChange={(_event, value) => setInputValue(value)}
      renderInput={params => <TextField {...params} />}
      options={users}
      getOptionLabel={user => user.name ?? user.email}
      renderOption={(props, user) => (
        <li {...props} key={user.id}>
          <Typography variant="body2">
            {user.name ?? user.email}
          </Typography>{" "}
        </li>
      )}
    />
  )
}

export default UserAutocomplete
