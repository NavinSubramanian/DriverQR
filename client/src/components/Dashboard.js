// Dashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://driver-qr.vercel.app/users');
        console.log(response)
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className='dash-container'>
      <h2>User Dashboard</h2>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Contact no</th>
            <th>Emergency contact</th>
            <th>Blood group</th>
            <th>Address</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.userDetails.personName}</td>
              <td>{user.userDetails.gender}</td>
              <td>{user.userDetails.phoneNumber}</td>
              <td>{user.userDetails.emergencyNumber}</td>
              <td>{user.userDetails.bloodGroup}</td>
              <td>{user.userDetails.address}</td>
              <td>
                <button>?</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
