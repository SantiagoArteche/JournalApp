import { Google } from "@mui/icons-material";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";

export const LoginPage = () => {
  return (
    <AuthLayout title="Login">
      <Box component="form">
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
            />
          </Grid>
          <Grid item xs={6} sx={{ pl: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="Insert your password..."
              name="password"
              fullWidth
            />
          </Grid>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Button variant="contained" fullWidth>
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
              <Button variant="contained" fullWidth>
                <Google sx={{ width: 20 }} />
                <Typography sx={{ ml: 1 }}> Google</Typography>
              </Button>
            </Grid>
          </Grid>
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
