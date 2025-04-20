import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Grid,
  Divider,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
} from "@mui/icons-material";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";

// Register ChartJS components
ChartJS.register(ArcElement, ChartTooltip, Legend);

const ViewPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);
  const planRef = useRef(null);

  useEffect(() => {
    fetchPlan();
  }, [id]);

  const fetchPlan = async () => {
    try {
      const response = await axiosInstance.get(`/investment/plans/${id}`);
      setPlan(response.data);
    } catch (err) {
      setError("Failed to load investment plan");
      console.error("Error fetching plan:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/plan/${id}`;
    navigator.clipboard.writeText(shareUrl);
    alert("Plan link copied to clipboard!");
  };

  const handleDownloadPDF = async () => {
    if (!planRef.current) return;

    setDownloading(true);
    try {
      const canvas = await html2canvas(planRef.current, {
        scale: 2,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${plan.name || "Investment Plan"}.pdf`);
    } catch (err) {
      console.error("Error generating PDF:", err);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !plan) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error || "Plan not found"}</Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mt: 2 }}
        >
          Back to Dashboard
        </Button>
      </Container>
    );
  }

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
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Button startIcon={<ArrowBackIcon />} onClick={handleBack}>
          Back to Dashboard
        </Button>
        <Box>
          <Tooltip title="Share Plan">
            <IconButton onClick={handleShare} sx={{ mr: 1 }}>
              <ShareIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download PDF">
            <IconButton onClick={handleDownloadPDF} disabled={downloading}>
              {downloading ? <CircularProgress size={24} /> : <DownloadIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Paper ref={planRef} sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {plan.name || "Investment Plan"}
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: 300,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Pie data={chartData} options={chartOptions} />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Plan Details
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1">
                <strong>Monthly Investment:</strong> ₹
                {plan.monthlyIncome.toLocaleString()}
              </Typography>
              <Typography variant="body1">
                <strong>Risk Level:</strong>{" "}
                {plan.riskLevel.charAt(0).toUpperCase() +
                  plan.riskLevel.slice(1)}
              </Typography>
              <Typography variant="body1">
                <strong>Created:</strong>{" "}
                {new Date(plan.createdAt).toLocaleDateString()}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              Investment Allocation
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1">
                <strong>SIPs:</strong> {plan.allocation?.sips?.percentage || 50}
                % (₹
                {(
                  (plan.monthlyIncome *
                    (plan.allocation?.sips?.percentage || 50)) /
                  100
                ).toLocaleString()}
                )
              </Typography>
              <Typography variant="body1">
                <strong>Cryptocurrency:</strong>{" "}
                {plan.allocation?.cryptocurrency?.percentage || 30}% (₹
                {(
                  (plan.monthlyIncome *
                    (plan.allocation?.cryptocurrency?.percentage || 30)) /
                  100
                ).toLocaleString()}
                )
              </Typography>
              <Typography variant="body1">
                <strong>Gold:</strong> {plan.allocation?.gold?.percentage || 20}
                % (₹
                {(
                  (plan.monthlyIncome *
                    (plan.allocation?.gold?.percentage || 20)) /
                  100
                ).toLocaleString()}
                )
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Investment Recommendations
        </Typography>
        <Typography variant="body1" paragraph>
          {plan.recommendations ||
            "Based on your risk profile and monthly investment amount, we recommend diversifying your portfolio across different asset classes to balance risk and potential returns."}
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          SIP Recommendations:
        </Typography>
        <Typography variant="body1" paragraph>
          {plan.sipRecommendations ||
            "Consider investing in a mix of equity mutual funds, debt funds, and index funds to create a balanced portfolio."}
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          Cryptocurrency Recommendations:
        </Typography>
        <Typography variant="body1" paragraph>
          {plan.cryptoRecommendations ||
            "Consider established cryptocurrencies like Bitcoin and Ethereum for long-term investment, with a smaller portion allocated to promising altcoins."}
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          Gold Recommendations:
        </Typography>
        <Typography variant="body1" paragraph>
          {plan.goldRecommendations ||
            "Consider investing in gold ETFs or sovereign gold bonds for better liquidity and returns compared to physical gold."}
        </Typography>
      </Paper>
    </Container>
  );
};

export default ViewPlan;
