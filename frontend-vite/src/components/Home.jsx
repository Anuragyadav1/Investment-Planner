import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
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

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleFeatureClick = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  if (user) {
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
            Manage your investment plans and create new ones to grow your
            wealth.
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

        {/* Features Section */}
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
                    Personalized Plans
                  </Typography>
                  <Typography align="center">
                    Get investment recommendations tailored to your income and
                    risk tolerance. Our AI analyzes your profile to suggest the
                    optimal allocation.
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                  <Button size="small" component={RouterLink} to="/dashboard">
                    View Plans
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
                    <SecurityIcon
                      sx={{ fontSize: 60, color: "primary.main" }}
                    />
                  </Box>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h3"
                    align="center"
                  >
                    Diversified Portfolio
                  </Typography>
                  <Typography align="center">
                    Balance your investments across SIPs, cryptocurrency, and
                    gold to minimize risk and maximize potential returns.
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
                    <AutoGraphIcon
                      sx={{ fontSize: 60, color: "primary.main" }}
                    />
                  </Box>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h3"
                    align="center"
                  >
                    Track & Manage
                  </Typography>
                  <Typography align="center">
                    Create multiple investment plans, track their performance,
                    and download detailed reports to share with your financial
                    advisor.
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
  }

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
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
          Personal Investment Planner
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Create personalized investment plans with AI-powered recommendations.
          Optimize your portfolio across SIPs, cryptocurrency, and gold based on
          your risk profile.
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
            to="/register"
            variant="contained"
            size="large"
          >
            Get Started
          </Button>
          <Button
            component={RouterLink}
            to="/login"
            variant="outlined"
            size="large"
          >
            Sign In
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8 }}>
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Features
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
                  Personalized Plans
                </Typography>
                <Typography align="center">
                  Get investment recommendations tailored to your income and
                  risk tolerance. Our AI analyzes your profile to suggest the
                  optimal allocation.
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                <Button size="small" component={RouterLink} to="/register">
                  Learn More
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
                  Diversified Portfolio
                </Typography>
                <Typography align="center">
                  Balance your investments across SIPs, cryptocurrency, and gold
                  to minimize risk and maximize potential returns.
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                <Button size="small" component={RouterLink} to="/register">
                  Learn More
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
                  Track & Manage
                </Typography>
                <Typography align="center">
                  Create multiple investment plans, track their performance, and
                  download detailed reports to share with your financial
                  advisor.
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                <Button size="small" component={RouterLink} to="/register">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
