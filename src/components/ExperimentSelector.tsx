import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React from 'react';

interface Props {
  experiments: string[];
  selected: string[];
  onSelect: (selected: string[]) => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 6.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

const ExperimentSelector: React.FC<Props> = ({ experiments, selected, onSelect }) => {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    onSelect(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="experiment-select-label">Select Experiments</InputLabel>
      <Select
        labelId="experiment-select-label"
        multiple
        value={selected}
        onChange={handleChange}
        input={<OutlinedInput label="Select Experiments" />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
      >
        {experiments.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={selected.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ExperimentSelector;
