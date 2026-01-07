import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@mui/material";

export default function SingleOptionSelector({ title, options = [], selected, onChange }) {

  const formatLabel = (opt) => {
    const text = opt.value;
const price = opt.extra_price ?? opt.extraPrice ?? 0;
    return price ? `${text} (+₹${price})` : text;
  };

  return (
    <FormControl component="fieldset" sx={{ mt: 3 }}>
      <FormLabel sx={{ mb: 1, fontWeight: 600 }}>{title}</FormLabel>

      <RadioGroup
        value={selected?.toString() ?? ""}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {options.map((opt) => (
          <FormControlLabel
            key={opt.id}
            value={opt.id.toString()}
            control={<Radio />}
            label={formatLabel(opt)}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
