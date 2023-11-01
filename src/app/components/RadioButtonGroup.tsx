import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React from "react";

interface Props {
  options: any[];
  onChange: (event: any) => void;
  selectedvalue: string;
}

const RadioButtonGroup = (props: Props) => {
  return (
    <FormControl component="fieldset">
      <RadioGroup onChange={props.onChange} value={props.selectedvalue}>
        {props.options.map(({ value, label }) => (
          <FormControlLabel
            key={value}
            value={value}
            control={<Radio />}
            label={label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtonGroup;
