import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';
import { Facebook, Twitter, LinkedIn } from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'rgb(0,75,140)', color: 'white', py: 2, marginTop: "auto" }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems={"center"} justifyContent={"flex-end"}>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2">
              © {new Date().getFullYear()} Patient - Physician Portal. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="h6" mr={2} mt={0} >
                Follow Us
              </Typography>
              <Link href="#" color="inherit" sx={{ mr: 2 }}>
                <Facebook />
              </Link>
              <Link href="#" color="inherit" sx={{ mr: 2 }}>
                <Twitter />
              </Link>
              <Link href="#" color="inherit">
                <LinkedIn />
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
