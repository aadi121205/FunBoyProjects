import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';

const Home: React.FC = () => {
  return (
    <div>
      <Box
        sx={{
          minHeight: '80vh',
          backgroundColor: '#f0f0f0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          px: 2,
        }}
      >
        <Container>
          <Typography variant="h3" gutterBottom>
            Welcome to My Awesome Website
          </Typography>
          <Typography variant="h6" gutterBottom>
            Built with Bootstrap and Material UI in React TSX
          </Typography>
          <Button variant="contained" color="primary" size="large">
            Get Started
          </Button>
        </Container>
      </Box>
    </div>
  );
};

export default Home;
