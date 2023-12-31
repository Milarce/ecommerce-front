import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import agent from "../../api/agent";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors, isValid },
  } = useForm({ mode: "onTouched" }); //Configures the validation mode: onBlur | onChange | onSubmit | onTouched

  const handleRegister = async (data: FieldValues) => {
    try {
      await agent.Account.register(data);
      toast.success("Registration Successful");
      navigate("/login");
    } catch (error: any) {
      error.forEach((error: string) => {
        if (error.includes("Password"))
          setError("password", { message: error });
        if (error.includes("Email")) setError("email", { message: error });
        if (error.includes("Username")) setError("email", { message: error });
      });
    }
  };

  return (
    <Container
      component={Paper}
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(handleRegister)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            autoFocus
            {...register("username", { required: "Username is required" })} //register comes with 'onChange' and 'name' properties inside
            error={!!errors.username} //!! operator is a way of casting a "truthy" or "falsy" value to true or false, respectively.
            helperText={errors?.username?.message as string}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
                message: "Not a valid email address",
              },
            })} //register comes with 'onChange' and 'name' properties inside
            error={!!errors.email} //!! operator is a way of casting a "truthy" or "falsy" value to true or false, respectively.
            helperText={errors?.email?.message as string}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value:
                  /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                message: "Password does not meet complexity requirements",
              },
            })}
            error={!!errors.password} //!! operator is a way of casting a "truthy" or "falsy" value to true or false, respectively.
            helperText={errors?.password?.message as string}
          />
          <LoadingButton
            disabled={!isValid}
            loading={isSubmitting}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </LoadingButton>
          <Grid container>
            <Grid item>
              <Link to="/login">{"Already have an account? Sign In"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
