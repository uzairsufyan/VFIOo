import React from 'react';
import { Box } from '@mui/material';

const Dashboard = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
      }}
    >
      <Box
        sx={{
          width: 200,
          marginLeft: '120px',
          marginTop: '50px',
          height: 200,
          borderRadius: 3,
          p: 1,
          backgroundColor: 'white',
        }}
      >
        <h3>Products</h3>
        <p>Total Products: 200</p>
        <p>Quantity Sold: 100</p>
      </Box>
      <Box
        sx={{
          width: 200,
          height: 200,
          marginTop: '50px',
          marginLeft: '45px',
          borderRadius: 3,
          p: 1,
          backgroundColor: 'white',
        }}
      >
        <h3>Users</h3>
        <p>Registered Users: 200</p>
        <p>Verified Users: 100</p>
      </Box>
      <Box
        sx={{
          width: 200,
          height: 200,
          marginTop: '50px',
          borderRadius: 3,
          p: 1,
          backgroundColor: 'white',
        }}
      >
        <h3>Orders</h3>
        <p>Total Orders: 200</p>
        
      </Box>
      <Box
        sx={{
          width: 200,
          marginLeft: '120px',
          marginTop: '50px',
          height: 200,
          borderRadius: 3,
          p: 1,
          backgroundColor: 'white',
        }}
      >
        <h3>Delivered Orders</h3>
        <p>Delivered: 100</p>
        
      </Box>
      <Box
        sx={{
          width: 200,
          marginLeft: '45px',
          marginTop: '50px',
          height: 200,
          borderRadius: 3,
          p: 1,
          backgroundColor: 'white',
        }}
      >
        <h3>Pending Orders</h3>
        
        <p>Pending: 60</p>
      </Box>
      <Box
        sx={{
          width: 200,
          marginLeft: '2px',
          marginTop: '50px',
          height: 200,
          borderRadius: 3,
          p: 1,
          backgroundColor: 'white',
        }}
      >
        <h3>Cancelled Orders</h3>
        <p>Cancelled Orders: 20</p>
        
      </Box>
    </Box>
  );
};

export default Dashboard;
