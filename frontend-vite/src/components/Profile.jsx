import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Grid,
  Divider,
  Button,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TrendingUp as TrendingUpIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";
import axiosInstance from "../utils/axios";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // console.log("User date:", user.createdAt);
  // console.log("User date:", user.email);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      // const response = await axiosInstance.get("/investment/plans");
      // setPlans(response.data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              bgcolor: "primary.main",
              fontSize: "2.5rem",
            }}
          >
            {user?.name?.charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ ml: 3 }}>
            <Typography variant="h4" component="h1">
              {user?.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Account Information
            </Typography>
            <Typography variant="body1">
              <strong>Member since:</strong>{" "}
              {new Date(user?.createdAt).toLocaleDateString()}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6" sx={{ mr: 2 }}>Investment Plans</Typography>
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                onClick={handleViewDashboard}
              >
                View All Plans
              </Button>
            </Box>

            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                <CircularProgress />
              </Box>
            ) : plans.length > 0 ? (
              <Grid container spacing={2}>
                {plans.slice(0, 3).map((plan) => (
                  <Grid item xs={12} key={plan._id}>
                    <Card>
                      <CardContent>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 1 }}
                        >
                          <TrendingUpIcon
                            sx={{ mr: 1, color: "primary.main" }}
                          />
                          <Typography variant="h6">
                            Plan -{" "}
                            {new Date(plan.createdAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          Monthly Investment: ₹
                          {plan.monthlyIncome.toLocaleString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Risk Level: {plan.riskLevel}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          onClick={() => navigate(`/view-plan/${plan._id}`)}
                        >
                          View Details
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ textAlign: "center", py: 3 }}
              >
                {/* You haven't created any investment plans yet. */}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Profile;
