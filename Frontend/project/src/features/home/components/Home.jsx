import { Box, Typography, Button, Grid, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LocalDiningIcon from '@mui/icons-material/LocalDining';

const features = [
  {
    icon: <RestaurantIcon sx={{ fontSize: 50, color: "primary.main" }} />,
    title: "Fresh Ingredients",
    desc: "We use only fresh vegetables and ingredients to ensure quality meals every day.",
  },
  {
    icon: <LocalDiningIcon sx={{ fontSize: 50, color: "success.main" }} />,
    title: "Flexible Plans",
    desc: "Choose from daily, weekly, or monthly plans that suit your schedule and appetite.",
  },
  {
    icon: <ScheduleIcon sx={{ fontSize: 50, color: "secondary.main" }} />,
    title: "Timely Delivery",
    desc: "Meals delivered hot and on time, so you never have to worry about cooking.",
  },
];


export const Home = () => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
    

      {/* Hero Section */}
      <Box
        sx={{
          minHeight:"100vh" , 
          flex: 1,
          bgcolor: "#e8f5e9",
          py: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: 2,
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          color="primary"
          gutterBottom
          sx={{ fontSize: { xs: "2.5rem", md: "3.5rem" } }}
        >
          Delicious Meals, Delivered Daily
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600 }}>
          Enjoy fresh, homemade, and healthy meals crafted with love and delivered right to your doorstep. Perfect for students, professionals, and families.
        </Typography>
        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/signup"
            sx={{ mx: 1 }}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            color="success"
            component={Link}
            to="/allPlans"
            sx={{ mx: 1 }}
          >
            View All Plans
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
 <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f4f4f4",
        py: 8,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        Why Choose TiffinTrack?
      </Typography>

      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="stretch"
        sx={{ px: { xs: 2, md: 6 }, mt: 2 }}
      >
        {features.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} display="flex">
            <Card
              elevation={3}
              sx={{
                width: 250,
                height: 300,
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                p: 3,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6,
                },
              }}
            >
              <Box mb={2}>{item.icon}</Box>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {item.desc}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
    </Box>
  );
};


