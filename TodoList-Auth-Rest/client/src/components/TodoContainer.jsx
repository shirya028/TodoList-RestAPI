import React from 'react'
import styles from '../css/TodoContainer.module.css'
import Todo from './Todo'
import AddTodoBtn from './AddTodoBtn'

export default function TodoContainer({ todos, setTodos }) {
  return (
    <div className={styles.myContainer}>
      {todos.length > 0 ? (
        todos.map((todo) => (
          
          
          <Todo
            key={todo.id}
            id={todo.id}
            todos = {todos}
            title={todo.title}
            description={todo.description}
            due={todo.dueDate}
            setTodos={setTodos}
            currentState={todo.currentState}
          />
        ))
      ) : (
        <p>No tasks available</p> 
      )}
      <AddTodoBtn setTodos={setTodos} />
    </div>
  );
}
