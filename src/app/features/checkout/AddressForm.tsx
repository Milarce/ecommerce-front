import { Typography, Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import AppTextInput from "../../components/AppTextInput";
import AppCheckBox from "../../components/AppCheckBox";

export default function AddressForm() {
  const { control } = useFormContext(); //using the FormContext to store the inputs values while moving forward/backward between steps

  //The name's value of all these input text must math with the property names of the Address model class in the API
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <AppTextInput name="fullName" label="Full name" control={control} />
        </Grid>
        <Grid item xs={12}>
          <AppTextInput name="address1" label="Address 1" control={control} />
        </Grid>
        <Grid item xs={12}>
          <AppTextInput name="address2" label="Address 2" control={control} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput name="city" label="City" control={control} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput name="state" label="State" control={control} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput name="zip" label="Zip" control={control} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput name="country" label="Country" control={control} />
        </Grid>
        <Grid item xs={12}>
          <AppCheckBox
            name="saveAddress"
            label="Save this as the default address"
          />
        </Grid>
      </Grid>
    </>
  );
}
