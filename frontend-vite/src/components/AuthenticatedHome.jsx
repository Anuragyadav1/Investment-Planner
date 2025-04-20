import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Grid,
  Box,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import {
  TrendingUp as TrendingUpIcon,
  Security as SecurityIcon,
  AutoGraph as AutoGraphIcon,
  Dashboard as DashboardIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";

const AuthenticatedHome = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          pt: 8,
          pb: 6,
          textAlign: "center",
        }}
      >
        <Typography
          component="h1"
          variant="h2"
          color="text.primary"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Welcome back, {user.name}!
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Manage your investment plans and create new ones to grow your wealth.
        </Typography>
        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Button
            component={RouterLink}
            to="/dashboard"
            variant="contained"
            size="large"
            startIcon={<DashboardIcon />}
          >
            View Dashboard
          </Button>
          <Button
            component={RouterLink}
            to="/create-plan"
            variant="outlined"
            size="large"
            startIcon={<AddIcon />}
          >
            Create New Plan
          </Button>
        </Box>
      </Box>

      {/* Quick Stats Section */}
      <Box sx={{ py: 8 }}>
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Your Investment Overview
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  <TrendingUpIcon
                    sx={{ fontSize: 60, color: "primary.main" }}
                  />
                </Box>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h3"
                  align="center"
                >
                  Active Plans
                </Typography>
                <Typography align="center" variant="h4">
                  0
                </Typography>
                <Typography align="center" color="text.secondary">
                  Create your first plan to get started
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                <Button size="small" component={RouterLink} to="/create-plan">
                  Create Plan
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  <SecurityIcon sx={{ fontSize: 60, color: "primary.main" }} />
                </Box>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h3"
                  align="center"
                >
                  Total Investment
                </Typography>
                <Typography align="center" variant="h4">
                  ₹0
                </Typography>
                <Typography align="center" color="text.secondary">
                  Start investing to see your total
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                <Button size="small" component={RouterLink} to="/dashboard">
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  <AutoGraphIcon sx={{ fontSize: 60, color: "primary.main" }} />
                </Box>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h3"
                  align="center"
                >
                  Portfolio Growth
                </Typography>
                <Typography align="center" variant="h4">
                  0%
                </Typography>
                <Typography align="center" color="text.secondary">
                  Track your growth over time
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                <Button size="small" component={RouterLink} to="/dashboard">
                  Track Progress
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AuthenticatedHome;
