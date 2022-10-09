import React from 'react';
import moralis from 'moralis';

moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL;

const StudentDashboard = () => {
  return (
    <div>
      <h1>Student Dash!</h1>
    </div>
  )
}

export default StudentDashboard
