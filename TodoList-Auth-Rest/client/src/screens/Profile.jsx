import React, {useEffect, useState} from 'react';
import styles from '../css/Signup.module.css'
import { getUserDetails } from '../services/todo';
import { useNavigate } from 'react-router-dom';


export default function Profile() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

    useEffect(() => {
      const fetchUser= async () => {
        try {
          const u = await getUserDetails();
          setUser(u);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };
      fetchUser();
    }, []);
  
    const handleLogout = () => {
        localStorage.clear(); 
        navigate("/")
    }
  return (
    <div className={`card ${styles.card} text-center my-3`}>
            
            <div className="m-auto text-center d-flex flex-column align-items-center">
            <h3>Your profile</h3>
            <img className={styles.img} src="/profile.jpg" alt="" />
            <h6>{`${user.firstName} ${user.lastName}`}</h6>
            <div className="d-flex flex-column align-items-start mt-3">
              <p style={{ fontSize: 13 }}>{`Email: ${user.email}`}</p>
              <p style={{ fontSize: 13 }}>{`Phone: ${user.phone}`}</p>
            </div>

            <button className='btn btn-danger mb-3' onClick={handleLogout}>Logout</button>
          </div>

    </div>
  )
}
