import React, { useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import VerticalNav from '../components/VerticalNav'
import TodoContainer from '../components/TodoContainer'
import { getAllTasks ,filterList } from '../services/todo'
import { useLocation, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = location.state?.isLoggedIn; 
  if(!isLoggedIn) {
    navigate("/");
  }

  const [todos,setTodos] = useState([]);
  
  const getTasks = async () => {
    try {
      const response = await getAllTasks(); 
      console.log(response);
      
      setTodos(filterList(response,'pending')); 
      
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTodos([]); 
    }
  };
  
  

  useEffect(() => {
    getTasks('pending')
  }, [])


  return (
    <div>
      <Navbar />
      <VerticalNav
        setTodos = {setTodos}
      />
      <TodoContainer 
        todos = {todos} 
        setTodos = {setTodos}
      />
    </div>
  )
}
