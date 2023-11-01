import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import React, { useState } from "react";

interface Props {
  items: string[];
  checked?: string[]; //Checking one of the checkboxes is optional
  onChange: (items: string[]) => void;
}

const CheckboxButtons = (props: Props) => {
  const [checkedItems, setCheckedItems] = useState(props.checked || []);

  const handleChecked = (value: string) => {
    const currentItem = checkedItems.findIndex((item) => item === value);
    let newChecked: string[] = [];

    currentItem === -1 //If is -1 the button is not checked
      ? (newChecked = [...checkedItems, value]) //Set to checked
      : (newChecked = checkedItems.filter((item) => item !== value)); //Set to unckecked

    setCheckedItems(newChecked);
    props.onChange(newChecked);
  };

  return (
    <FormGroup>
      {props.items.map((item) => (
        <FormControlLabel
          key={item}
          control={
            <Checkbox
              checked={checkedItems.indexOf(item) !== -1}
              onClick={() => handleChecked(item)}
            />
          }
          label={item}
        />
      ))}
    </FormGroup>
  );
};

export default CheckboxButtons;
