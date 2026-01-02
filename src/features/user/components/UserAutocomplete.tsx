import { Autocomplete, Box, Chip, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useGetUsersQuery, type User } from "../userApiSlice"

interface UserAutocompleteProps {
  value: User | null
  onChange: (value: User | null) => void
  label?: string
  placeholder?: string
  disabled: boolean
  required?: boolean
}

interface UserAutocompleteMultipleProps {
  disabled: boolean
  value: User[]
  onChange: (value: User[]) => void
  label?: string
  placeholder?: string
  multiple: true
  required?: boolean
}

type Props = UserAutocompleteProps | UserAutocompleteMultipleProps

const isMultipleProps = (
  props: Props,
): props is UserAutocompleteMultipleProps => {
  return "multiple" in props && props.multiple
}

const UserAutocomplete = (props: Props) => {
  const { label, placeholder, disabled, required } = props
  const [inputValue, setInputValue] = useState("")

  const { data: users = [] } = useGetUsersQuery({
    name: inputValue,
    isActive: true,
  })

  if (isMultipleProps(props)) {
    const { value, onChange } = props

    const handleChange = (_event: React.SyntheticEvent, newValue: User[]) => {
      onChange(newValue)
    }

    return (
      <Autocomplete
        multiple
        inputValue={inputValue}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        onInputChange={(_event, value) => setInputValue(value)}
        renderInput={params => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder}
            required={required}
          />
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
                key={option.id}
              />
            ))}
          </Box>
        )}
      />
    )
  }

  const { value, onChange } = props

  const handleChange = (_event: React.SyntheticEvent, value: User | null) => {
    onChange(value)
  }

  return (
    <Autocomplete
      inputValue={inputValue}
      value={value}
      onChange={handleChange}
      onInputChange={(_event, value) => setInputValue(value)}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          required={required}
        />
      )}
      options={users}
      getOptionLabel={user => user.name ?? user.email}
      renderOption={(props, user) => (
        <li {...props} key={user.id}>
          <Typography variant="body2">{user.name ?? user.email}</Typography>
        </li>
      )}
    />
  )
}

export default UserAutocomplete
