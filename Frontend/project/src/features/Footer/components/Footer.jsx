import { Box, Container, Typography, Grid, Link, IconButton } from "@mui/material";
import { Facebook, Instagram, Twitter, LinkedIn } from "@mui/icons-material";

export const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#81C784", color: "#fff", py: 6 }}>
      <Container>
        <Grid container spacing={4} justifyContent="center" alignItems="center" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* Column 1 - Contact Information */}
          <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: "1.3rem" }}>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ fontSize:"1.1rem" , mb: 1 }}>
              Email: <Link href="mailto:support@tiffintrack.com" color="inherit">support@tiffintrack.com</Link>
            </Typography>
            <Typography variant="body2" sx={{ fontSize:"1.1rem" , mb: 1 }}>
              Phone: +1 (123) 456-7890
            </Typography>
          </Grid>

          {/* Column 2 - Social Media */}
          <Grid item xs={12} sm={6} md={3}sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: "1.2rem" }}>
              Follow Us
            </Typography>
            <Grid container spacing={2}>
              <Grid item>
                <IconButton color="inherit" href="https://facebook.com" target="_blank">
                  <Facebook />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton color="inherit" href="https://www.instagram.com/__ritika__tomar__/"target="_blank">
                  <Instagram />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton color="inherit" href="https://twitter.com" target="_blank">
                  <Twitter />
                </IconButton>
              </Grid>
              
            </Grid>
          </Grid>

        </Grid>

        {/* Copyright Section */}
        <Box mt={4} textAlign="center">
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            &copy; {new Date().getFullYear()} TiffinTrack. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
