import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Container } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'personName',
    headerName: 'Name',
    width: 150,
    editable: true,
  },
  {
    field: 'gender',
    headerName: 'Gender',
    width: 100,
    editable: true,
    sortable: false,
  },
  {
    field: 'phoneNumber',
    headerName: 'Phone Number',
    type: 'number',
    width: 130,
    editable: true,
    sortable: false,
  },
  {
    field: 'emergencyNumber',
    headerName: 'Emergency Number',
    sortable: false,
    width: 160,
  },
  {
    field: 'bloodGroup',
    headerName: 'Blood Group',
    sortable: false,
    width: 120,
  },
  {
    field: 'address',
    headerName: 'Address',
    sortable: false,
    width: 300,
  },
];

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://driver-qr.vercel.app/users');
        // Transform the user data to match the column fields
        const transformedUsers = response.data
          .filter(user => user.userDetails && user.userDetails.personName) // Filter out undefined or missing data
          .map((user,index) => ({
            ...user.userDetails,
            id: index + 1,
            _id: user._id,
          }));
        setUsers(transformedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleCellEditCommit = async ({ id, field, value }) => {
    try {
      const updatedUsers = users.map(user =>
        user.id === id ? { ...user, [field]: value } : user
      );
      setUsers(updatedUsers);
      // Make API call to update user data
      await axios.put(`https://driver-qr.vercel.app/users/${id}`, { [field]: value });
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className='dash-container'>
      <Container>
        <Box sx={{ height: 800, width: '100%' }}>
          <DataGrid
            rows={users}
            columns={columns}
            pageSize={10}
            onCellEditCommit={handleCellEditCommit}
          />
        </Box>
      </Container>
    </div>
  );
};

export default Dashboard;
