import React, { useState } from 'react';
import styles from '../css/Signup.module.css'
import {useNavigate} from 'react-router-dom';
export default function Signup() {

    const [formData, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        cpassword: ""
      });
  const navigate = useNavigate();
  const handleInput = ({target}) => {
    
    setData({
        ...formData,
        [target.name] : target.value
    });
  }
  const handleClear = () => setData({firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    cpassword: ""
  });
  const handleSubmit = async () => {
    if (formData.password !== formData.cpassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Signup Successful!");
        navigate("/")
        handleClear();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form");
    }
  };
     
  
  return (
    <div className={`card text-center ${styles.card} my-3`}>
        <h1>Create an New Account</h1>
        <div >
            <img className={styles.img} src="/profile.jpg" alt="" />
        </div>
        <div >
            <input onChange={handleInput} name='firstName' value={formData.firstName} type="text" placeholder='First Name' />
            <input onChange={handleInput} name='lastName'  value={formData.lastName} type="text" placeholder='Last Name' />
            <input onChange={handleInput} name='email'      value={formData.email} type="email" placeholder='Email' />
            <input onChange={handleInput} name='phone'     value={formData.phone} type="number" placeholder='Phone' />
            <input onChange={handleInput} name='password'  value={formData.password} type="password" placeholder='Password'/>
            <input onChange={handleInput} name='cpassword' value={formData.cpassword} type="password" placeholder='Confirm Password' />
            <input onClick={handleSubmit} type="button"   className='btn btn-success' value={`Sign Up`}/>
            <input onClick={handleClear} type="button"  className='btn btn-warning' value={`Clear all`} />
            
        </div>
    </div>
  )
}
