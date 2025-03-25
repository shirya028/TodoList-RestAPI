import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserDetails } from '../services/todo';

const Navbar = () => {
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const user = await getUserDetails();
        setFirstName(user.firstName);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserName();
  }, []);

  const profileStyle = {
    backgroundColor: 'grey',
    width: 35,
    height: 35,
    borderRadius: "50%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    marginRight: '10px'
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{ fontFamily: "Satisfy", marginLeft: 10 }}>TO-DO List</Link>

        <div className="d-flex ms-auto align-items-center">
          <span style={{ color: 'white', marginRight: '10px' }}>Welcome! {firstName}</span>
          <Link style={profileStyle} to="/profile">
            <i className="fa-regular fa-user" style={{ color: "#ffffff" }}></i>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
