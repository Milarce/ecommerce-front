import * as yup from "yup";

//property names must match (is case sensitive) with the property "name" of the form
//If we make the validationSchema an array of yup objects, we can treat the forms separately even if there is a unique response
export const validationSchema = [
  yup.object({
    fullName: yup.string().required("Full name is required"),
    address1: yup.string().required("Address is required"),
    address2: yup.string(),
    city: yup.string().required(),
    state: yup.string().required(),
    zip: yup.string().required(),
    country: yup.string().required(),
  }),
  yup.object(),
  yup.object({
    nameOnCard: yup.string().required("The name is required"),
  }),
];
