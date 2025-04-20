import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  AccountCircle,
  Dashboard as DashboardIcon,
  Add as AddIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenu = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMobileMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate("/");
  };

  const handleProfile = () => {
    handleClose();
    navigate("/profile");
  };

  const handleCreatePlan = () => {
    handleClose();
    navigate("/create-plan");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to={user ? "/" : "/home"}
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
          }}
        >
          <DashboardIcon sx={{ mr: 1 }} />
          Investment Planner
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="mobile-menu"
              aria-haspopup="true"
              onClick={handleMobileMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="mobile-menu"
              anchorEl={mobileMenuAnchor}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(mobileMenuAnchor)}
              onClose={handleClose}
            >
              {user
                ? [
                    <MenuItem key="dashboard" component={RouterLink} to="/dashboard">
                      Dashboard
                    </MenuItem>,
                    <MenuItem key="create-plan" component={RouterLink} to="/create-plan">
                      Create Plan
                    </MenuItem>,
                    <MenuItem key="profile" onClick={handleProfile}>
                      Profile
                    </MenuItem>,
                    <MenuItem key="logout" onClick={handleLogout}>
                      Logout
                    </MenuItem>,
                  ]
                : [
                    <MenuItem key="login" component={RouterLink} to="/login">
                      Login
                    </MenuItem>,
                    <MenuItem key="register" component={RouterLink} to="/register">
                      Register
                    </MenuItem>,
                  ]}

            </Menu>
          </>
        ) : (
          <>
            {user ? (
              <>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Button
                    color="inherit"
                    component={RouterLink}
                    to="/dashboard"
                    startIcon={<DashboardIcon />}
                    sx={{ mr: 2 }}
                  >
                    Dashboard
                  </Button>
                  <Button
                    color="inherit"
                    component={RouterLink}
                    to="/create-plan"
                    startIcon={<AddIcon />}
                    sx={{ mr: 2 }}
                  >
                    Create Plan
                  </Button>
                  <Tooltip title="Account settings">
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      {user.avatar ? (
                        <Avatar
                          alt={user.name}
                          src={user.avatar}
                          sx={{ width: 32, height: 32 }}
                        />
                      ) : (
                        <AccountCircle />
                      )}
                    </IconButton>
                  </Tooltip>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleProfile}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </Box>
              </>
            ) : (
              <Box>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/login"
                  sx={{ mr: 1 }}
                >
                  Login
                </Button>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/register"
                  variant="outlined"
                >
                  Register
                </Button>
              </Box>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
