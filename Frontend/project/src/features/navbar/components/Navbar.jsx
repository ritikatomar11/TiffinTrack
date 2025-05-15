import { Link } from "react-router-dom";
import { useState } from "react";

import { selectLoggedInUser } from "../../auth/AuthSlice";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, Typography, IconButton, Button, Drawer, List, ListItem, ListItemButton, ListItemText, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const loggedInUser = useSelector(selectLoggedInUser);
  
   const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

    const menuItems = loggedInUser
    ? [
        { label: "User Details", path: "/profile" },
        { label: "Logout", path: "/logout" },
      ]
    : [
        { label: "Login", path: "/login" },
        { label: "Sign Up", path: "/signup" },
      ];

  return (
     <>
      <AppBar position="sticky" sx={{ bgcolor: "white", color: "black" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ flexGrow: 1, textDecoration: "none", color: "green", fontWeight: "bold" }}
          >
            TiffinTrack
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {menuItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                variant={item.label === "Logout" || item.label === "Sign Up" ? "contained" : "outlined"}
                color="success"
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton component={Link} to={item.path}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
