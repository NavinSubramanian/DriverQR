import React, { useEffect, useState } from 'react';


const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch data from local storage on component mount
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className='dash-container'>
      <h2>User Dashboard</h2>
      {userData ? (
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Contact no</th>
              <th>Emergency contact</th>
              <th>Blood group</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{userData.name}</td>
              <td>{userData.gender}</td>
              <td>{userData.primary}</td>
              <td>{userData.secondary}</td>
              <td>{userData.group}</td>
              <td>{userData.address}</td>

            </tr>
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Dashboard;
