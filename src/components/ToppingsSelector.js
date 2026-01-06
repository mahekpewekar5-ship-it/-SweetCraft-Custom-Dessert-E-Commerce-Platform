import React from "react";
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox
} from "@mui/material";

export default function ToppingsSelector({ title, options = [], selected = [], onChange }) {

  const selectedIds = selected.map(String);

  const formatLabel = (opt) => {
const price = opt.extra_price ?? opt.extraPrice ?? 0;
    return price ? `${opt.value} (+₹${price})` : opt.value;
  };

  const toggle = (id) => {
    const updated = selectedIds.includes(id)
      ? selectedIds.filter((x) => x !== id)
      : [...selectedIds, id];

    onChange(updated.map(Number));
  };

  return (
    <FormControl component="fieldset" sx={{ mt: 3 }}>
      <FormLabel sx={{ mb: 1, fontWeight: 600 }}>{title}</FormLabel>

      <FormGroup>
        {options.map((opt) => (
          <FormControlLabel
            key={opt.id}
            control={
              <Checkbox
                checked={selectedIds.includes(opt.id.toString())}
                onChange={() => toggle(opt.id.toString())}
              />
            }
            label={formatLabel(opt)}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}
