import { Box, Button, Grid, TextField, Typography } from "@mui/material";

import { AuthLayout } from "../layout/AuthLayout";

export const RegisterPage = () => {
  return (
    <AuthLayout title="Register">
      <Box component="form">
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
          gap={2}
        >
          <Grid item xs={12}>
            <TextField
              label="Full Name"
              type="text"
              placeholder="Insert your full name..."
              name="fullName"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              placeholder="Insert your password..."
              name="password"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              placeholder="Insert your email..."
              name="email"
              fullWidth
            />
          </Grid>
          <Grid container sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Button variant="contained" fullWidth>
                <Typography>Create Account</Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};
