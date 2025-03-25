import React, { useState } from 'react'
import styles from '../css/Login.module.css'
import {Link , useNavigate } from 'react-router-dom'
export default function Login() {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] =useState("");
  const navigate = useNavigate();
  const handleSubmit = async() =>  {
    if(username === "" || password==="") setError("Enter valid details")
    else {
      try {
        const response = await fetch("http://localhost:4000/users/login",{
          method : 'POST',
          headers : {
            "Content-Type": "application/json",
          },
          body : JSON.stringify({
            email: username,
            password: password,
          }),
          credentials : 'include'
        });
        let result;
        try {
          result = await response.json();
        } catch {
          setError("Server error: Could not process response");
          return;
        }
        if(response.ok) {
          const token = await result.token;
          localStorage.setItem("token" , token);
          localStorage.setItem("userEmail" , username);
          const isLoggedIn = true
          navigate("/dashboard",  { state: { isLoggedIn } });
        }
        else {
          console.log(result);
          setError(result.message);
        }
      }
      catch(err) {
        setError("error :"+err.message);
      }
      
    }
  }
  return (
    <div>
        <div className= {`${styles.mycard} card text-center`}>
            <div className=" text-center mt-3">
              <h2>Welcome User!!</h2>
              <h5>Login here</h5>
              {error && <p style={{fontSize: "10px", margin: "5px",color: "red"}}>{error}</p>}
                  <div className='mt-4'>
                    
                      <input className={styles.input} placeholder ='user name' onChange={(e)=> setUsername(e.target.value)} type="text" value={username} />
                      <input className={styles.input} placeholder = 'password' type='password'  onChange={(e)=> setPassword(e.target.value)} value={password} />
                      <input className={`${styles.input} btn btn-success`} style={{ height:40, marginTop : "25px"}} type='button' onClick={handleSubmit} value={`login`} />
                      
                  </div>
                  <div className={`${styles.loginIcons}`}>
                      
                      <i className={`fa-brands fa-google ${styles.i}` }></i>
                      <i className={`fa-brands fa-facebook ${styles.i}` }></i>
                      <i className={`fa-brands fa-linkedin ${styles.i}` }></i>
                  </div>
            </div>
            <div className={styles.loginAnchors}>
              <Link to='' style={{color : 'green'}}>Forgotten password?</Link>
              <Link to='/signup' style={{color : 'green'}}>New User?</Link>
            </div>
        </div>
        
    </div>
  )
}
