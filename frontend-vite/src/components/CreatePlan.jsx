import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Alert,
  CircularProgress,
  Grid,
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import axiosInstance from "../utils/axios";

const steps = ["Basic Information", "Review & Generate Plan"];

const CreatePlan = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    planName: "",
    monthlyIncome: "",
    riskLevel: "Medium",
    investmentGoal: "",
    timeHorizon: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (activeStep === 0) {
      // Validate first step
      if (
        !formData.monthlyIncome ||
        isNaN(formData.monthlyIncome) ||
        formData.monthlyIncome <= 0
      ) {
        setError("Please enter a valid monthly income");
        return;
      }
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!token) {
      setError("Please log in to create an investment plan");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post(
        "/investment/create",
        {
          planName: formData.planName || "My Investment Plan",
          monthlyIncome: Number(formData.monthlyIncome),
          riskLevel:
            formData.riskLevel.charAt(0).toUpperCase() +
            formData.riskLevel.slice(1).toLowerCase(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate(`/view-plan/${response.data._id}`);
    } catch (err) {
      console.error("Error creating plan:", err);
      if (err.response?.status === 401) {
        setError("Your session has expired. Please log in again.");
      } else {
        setError(
          err.response?.data?.message || "Failed to create investment plan"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Plan Name"
                  name="planName"
                  value={formData.planName}
                  onChange={handleChange}
                  placeholder="Enter a name for your investment plan"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Monthly Income"
                  name="monthlyIncome"
                  type="number"
                  value={formData.monthlyIncome}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Risk Level</InputLabel>
                  <Select
                    name="riskLevel"
                    value={formData.riskLevel}
                    onChange={handleChange}
                    label="Risk Level"
                  >
                    <MenuItem value="Low">Low Risk</MenuItem>
                    <MenuItem value="Medium">Medium Risk</MenuItem>
                    <MenuItem value="High">High Risk</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Review Your Plan Details
            </Typography>
            <Paper sx={{ p: 2, mt: 2 }}>
              <Typography variant="body1">
                <strong>Plan Name:</strong>{" "}
                {formData.planName || "Unnamed Plan"}
              </Typography>
              <Typography variant="body1">
                <strong>Monthly Income:</strong> ₹
                {Number(formData.monthlyIncome).toLocaleString()}
              </Typography>
              <Typography variant="body1">
                <strong>Risk Level:</strong>{" "}
                {formData.riskLevel.charAt(0).toUpperCase() +
                  formData.riskLevel.slice(1)}
              </Typography>
            </Paper>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
              Click "Generate Plan" to create your personalized investment plan
              based on your inputs.
            </Typography>
          </Box>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create Investment Plan
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {getStepContent(activeStep)}

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
          )}
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              Generate Plan
            </Button>
          ) : (
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default CreatePlan;
