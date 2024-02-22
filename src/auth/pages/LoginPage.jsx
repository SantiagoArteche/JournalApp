import { Google } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  startGoogleSignIn,
  startLoginWithEmailPassword,
} from "../../store/auth/thunks";
import { useFormik } from "formik";
import { useMemo } from "react";

export const LoginPage = () => {
  const { handleChange, handleSubmit, values, resetForm, errors } = useFormik({
    initialValues: { email: "", password: "" },
    validateOnChange: false,
    onSubmit: (data) => {
      dispatch(
        startLoginWithEmailPassword({
          email: data.email,
          password: data.password,
        })
      );
      resetForm();
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is a required field").min(5),
      password: Yup.string().required("Password is a required field").min(3),
    }),
  });

  const { status, errorMessage } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const isAuthenticated = useMemo(() => status === "checking", [status]);

  return (
    <AuthLayout title="Login">
      <Box
        component="form"
        onSubmit={handleSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={6} sx={{ pr: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="Insert your email..."
              name="email"
              fullWidth
              value={values.email}
              onChange={handleChange}
              error={errors.email ? true : false}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={6} sx={{ pl: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="Insert your password..."
              name="password"
              fullWidth
              value={values.password}
              onChange={handleChange}
              error={errors.password ? true : false}
              helperText={errors.password}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                disabled={isAuthenticated}
              >
                <Typography>Login</Typography>
              </Button>
            </Grid>
            <Grid item sx={{ display: "flex", width: "100%" }}>
              <Box
                sx={{
                  borderBottom: "1px solid gray",
                  width: "48%",
                  marginBottom: 1.6,
                }}
              />
              <Typography
                sx={{
                  textAlign: "center",
                  width: "4%",
                }}
              >
                Or
              </Typography>
              <Box
                sx={{
                  borderBottom: "1px solid gray",
                  width: "48%",
                  marginBottom: 1.6,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                disabled={isAuthenticated}
                onClick={() => dispatch(startGoogleSignIn())}
              >
                <Google sx={{ width: 20 }} />
                <Typography sx={{ ml: 1 }}> Google</Typography>
              </Button>
            </Grid>
          </Grid>
          {errorMessage && (
            <Grid item xs={12} marginTop={3}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
          )}
          <Grid container direction="row" justifyContent="end" sx={{ mt: 1 }}>
            <Link component={RouterLink} to="/auth/register">
              Create an account
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};
