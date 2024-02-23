import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";
import * as Yup from "yup";
import { AuthLayout } from "../layout/AuthLayout";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";
import { useMemo } from "react";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
  const { handleChange, handleSubmit, values, resetForm, errors } = useFormik({
    initialValues: { displayName: "", password: "", email: "" },
    validateOnChange: false,
    onSubmit: (data) => {
      dispatch(startCreatingUserWithEmailPassword(data));
      resetForm();
    },
    validationSchema: Yup.object({
      displayName: Yup.string()
        .required("Full name is a required field")
        .min(3),
      password: Yup.string().required("Password is a required field").min(3),
      email: Yup.string().required("Email is a required field").min(4),
    }),
  });

  const { status, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const isCheckingAuthentication = useMemo(
    () => status === "checking",
    [status]
  );
  document.title = "Journal App - Register";
  return (
    <AuthLayout title="Register">
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
          gap={2}
        >
          <Grid item xs={12}>
            <TextField
              label="Name"
              type="text"
              placeholder="Insert your name..."
              name="displayName"
              fullWidth
              error={errors.displayName ? true : false}
              onChange={handleChange}
              value={values.displayName}
              helperText={errors.displayName}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              placeholder="Insert your password..."
              name="password"
              fullWidth
              error={errors.password ? true : false}
              onChange={handleChange}
              value={values.password}
              helperText={errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              placeholder="Insert your email..."
              name="email"
              fullWidth
              onChange={handleChange}
              error={errors.email ? true : false}
              value={values.email}
              helperText={errors.email}
            />
          </Grid>
          {errorMessage && (
            <Grid>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
          )}
          <Grid container sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                disabled={isCheckingAuthentication}
              >
                <Typography>Create Account</Typography>
              </Button>
            </Grid>
            <Grid item xs={12} mt={1.5} display="flex" justifyContent="end">
              <Link to="/auth/login">
                <Typography sx={{ textDecoration: "underline" }}>
                  Back to login
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};
