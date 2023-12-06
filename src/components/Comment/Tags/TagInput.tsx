import React, { useState } from 'react';
import { Autocomplete, TextField, createFilterOptions } from '@mui/material';
import { Tag } from '@/src/types';
import TAG_LIST from './tagList';

interface Props {
  value: Tag[];
  onChange: (value: Tag[]) => void;
}

const filter = createFilterOptions<Tag>();

const TagInput: React.FC<Props> = ({ value, onChange }) => {
  const [userInputValue, setUserInputValue] = useState('');

  return (
    <Autocomplete
      sx={{ margin: '10px 0' }}
      open={!!userInputValue}
      inputValue={userInputValue}
      onInputChange={(_event, value) => setUserInputValue(value)}
      value={value}
      onChange={(_event, newValue) => {
        if (typeof newValue === 'string') {
          onChange([
            ...value,
            {
              title: newValue,
            },
          ]);
          // TODO: apply a right type instead of 'any' (need to investigate, looks like MUI issue)
        } else if (newValue && (newValue as any).inputValue) {
          // Create a new value from the user input
          onChange([
            ...value,
            {
              title: (newValue as any).inputValue,
            },
          ]);
        } else {
          onChange(newValue as Tag[]);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some(
          (option) => inputValue === option.title,
        );
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            title: inputValue,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      options={TAG_LIST}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.title;
      }}
      renderOption={(props, option) => <li {...props}>{option.title}</li>}
      fullWidth
      freeSolo
      multiple
      renderInput={(params) => (
        <TextField {...params} autoFocus label="Enter tag" variant="standard" />
      )}
    />
  );
};

export default TagInput;
