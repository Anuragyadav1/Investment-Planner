import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Box,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Add as AddIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Dashboard = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get("/api/investment/plans");
      setPlans(response.data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlan = () => {
    navigate("/create-plan");
  };

  const handleViewPlan = (planId) => {
    navigate(`/view-plan/${planId}`);
  };

  const handleDeletePlan = async (planId) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      try {
        await axios.delete(`/api/investment/plans/${planId}`);
        setPlans(plans.filter((plan) => plan._id !== planId));
      } catch (error) {
        console.error("Error deleting plan:", error);
      }
    }
  };

  const handleSharePlan = (planId) => {
    const shareUrl = `${window.location.origin}/view-plan/${planId}`;
    navigator.clipboard.writeText(shareUrl);
    alert("Plan link copied to clipboard!");
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4" component="h1">
          My Investment Plans
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCreatePlan}
        >
          Create New Plan
        </Button>
      </Box>

      {loading ? (
        <Typography>Loading your plans...</Typography>
      ) : plans.length === 0 ? (
        <Card>
          <CardContent>
            <Typography variant="h6" align="center" color="textSecondary">
              You don't have any investment plans yet.
            </Typography>
            <Box display="flex" justifyContent="center" mt={2}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleCreatePlan}
              >
                Create Your First Plan
              </Button>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {plans.map((plan) => (
            <Grid item xs={12} sm={6} md={4} key={plan._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {plan.planName || "My Investment Plan"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Monthly Investment: ₹
                    {plan.monthlyIncome?.toLocaleString() || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Risk Level: {plan.riskLevel}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Created: {new Date(plan.createdAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleViewPlan(plan._id)}>
                    View Details
                  </Button>
                  <Box sx={{ flexGrow: 1 }} />
                  <Tooltip title="Download PDF">
                    <IconButton size="small">
                      <DownloadIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Share Plan">
                    <IconButton
                      size="small"
                      onClick={() => handleSharePlan(plan._id)}
                    >
                      <ShareIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Plan">
                    <IconButton
                      size="small"
                      onClick={() => handleDeletePlan(plan._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Dashboard;
