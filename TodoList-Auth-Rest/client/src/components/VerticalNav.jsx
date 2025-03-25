import React from 'react';
import styles from '../css/VerticalNav.module.css';
import { getAllTasks ,filterList } from '../services/todo'

export default function VerticalNav(props) {
  const {
    setTodos
  } = props;

  const handlePending = async ()=> {
    const tasks = await getAllTasks();
    setTodos(filterList(tasks , 'pending'));
  }
  const handleCompleted = async ()=> {
    const tasks = await getAllTasks();
    setTodos(filterList(tasks , 'completed'));
  }
  const handleAll = async()=> {
    const tasks = await getAllTasks();
    setTodos(tasks );
  }
  
  return (
    <div className={styles.navContainer}>
      <div className={styles.btnGroup}>
        <button className={styles.button} onClick={handlePending} style={{color:'#FFB22C'}}> Pending ⌛</button>
        <button className={styles.button} onClick={handleCompleted} style={{color:'Green'}}>Completed ✅</button>
        <button className={styles.button} onClick={handleAll} style={{color:'Blue'}}>All 👈</button>
      </div>
    </div>
  );
}
