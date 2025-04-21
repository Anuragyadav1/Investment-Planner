import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
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
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(ArcElement, ChartTooltip, Legend);

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
      const response = await axiosInstance.get("/investment/plans");
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
        await axiosInstance.delete(`/investment/plans/${planId}`);
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

  const handleDownloadPDF = async (plan) => {
    try {
      // Create a temporary container for PDF generation
      const tempContainer = document.createElement("div");
      tempContainer.style.width = "800px";
      tempContainer.style.position = "absolute";
      tempContainer.style.left = "-9999px";
      tempContainer.style.top = "-9999px";
      document.body.appendChild(tempContainer);

      // Create the content for PDF
      const content = document.createElement("div");
      content.style.padding = "20px";
      content.style.backgroundColor = "white";

      // Add plan details
      content.innerHTML = `
        <h1 style="text-align: center; margin-bottom: 20px;">${
          plan.planName || "Investment Plan"
        }</h1>
        <div style="margin-bottom: 20px;">
          <p><strong>Monthly Investment:</strong> ₹${
            plan.monthlyIncome?.toLocaleString() || 0
          }</p>
          <p><strong>Risk Level:</strong> ${plan.riskLevel}</p>
          <p><strong>Created:</strong> ${new Date(
            plan.createdAt
          ).toLocaleDateString()}</p>
        </div>
        <div style="margin-bottom: 20px;">
          <h2>Investment Allocation</h2>
          <p><strong>SIPs:</strong> ${
            plan.allocation?.sips?.percentage || 50
          }% (₹${(
        (plan.monthlyIncome * (plan.allocation?.sips?.percentage || 50)) /
        100
      ).toLocaleString()})</p>
          <p><strong>Cryptocurrency:</strong> ${
            plan.allocation?.cryptocurrency?.percentage || 30
          }% (₹${(
        (plan.monthlyIncome *
          (plan.allocation?.cryptocurrency?.percentage || 30)) /
        100
      ).toLocaleString()})</p>
          <p><strong>Gold:</strong> ${
            plan.allocation?.gold?.percentage || 20
          }% (₹${(
        (plan.monthlyIncome * (plan.allocation?.gold?.percentage || 20)) /
        100
      ).toLocaleString()})</p>
        </div>
        <div style="margin-bottom: 20px;">
          <h2>Investment Recommendations</h2>
          <p>${
            plan.recommendations ||
            "Based on your risk profile and monthly investment amount, we recommend diversifying your portfolio across different asset classes to balance risk and potential returns."
          }</p>
        </div>
      `;

      // Add chart
      const chartContainer = document.createElement("div");
      chartContainer.style.width = "400px";
      chartContainer.style.height = "300px";
      chartContainer.style.margin = "0 auto";

      const canvas = document.createElement("canvas");
      chartContainer.appendChild(canvas);

      // Prepare chart data
      const chartData = {
        labels: ["SIPs", "Cryptocurrency", "Gold"],
        datasets: [
          {
            data: [
              plan.allocation?.sips?.percentage || 50,
              plan.allocation?.cryptocurrency?.percentage || 30,
              plan.allocation?.gold?.percentage || 20,
            ],
            backgroundColor: [
              "rgba(54, 162, 235, 0.8)",
              "rgba(255, 99, 132, 0.8)",
              "rgba(255, 206, 86, 0.8)",
            ],
            borderColor: [
              "rgba(54, 162, 235, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(255, 206, 86, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };

      const chartOptions = {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
        animation: false,
      };

      // Create and render the chart
      new ChartJS(canvas, {
        type: "pie",
        data: chartData,
        options: chartOptions,
      });

      content.appendChild(chartContainer);
      tempContainer.appendChild(content);

      // Wait for chart to render
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Generate PDF
      const pdfCanvas = await html2canvas(tempContainer, {
        scale: 2,
        useCORS: true,
        logging: false,
        width: 800,
        height: tempContainer.scrollHeight,
      });

      // Remove temporary container
      document.body.removeChild(tempContainer);

      const imgData = pdfCanvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${plan.planName || "Investment Plan"}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
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
                    <IconButton
                      size="small"
                      onClick={() => handleDownloadPDF(plan)}
                    >
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
