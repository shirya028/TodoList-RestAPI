import React, {useRef, useState } from "react";
import styles from "../css/Todo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";
import { getAllTasks, filterList, updateTodo, deleteTodo } from "../services/todo";

export default function Todo(props) {
  const { id, title, description, due, currentState, todos, setTodos } = props;
  const modalRef = useRef(null);
  const [title_, setTitle] = useState(title);
  const [description_, setDescription] = useState(description);
  const [dueDate, setDueDate] = useState(due);

  const handleSubmit = async () => {
    try {
        await updateTodo(id, title_, description_, dueDate, "pending");
        const allTasks = await getAllTasks();
        setTodos(filterList(allTasks, "pending"));

    } catch (error) {
        console.log("Error while updating: " + error);
    }

    const modal = window.bootstrap.Modal.getInstance(document.getElementById(`editModal${id}`));
    if (modal) modal.hide();
  };

  const handleComplete = async () => {
    try {
      await updateTodo(id, title, description, due, "completed");
      const allTasks = await getAllTasks();
      setTodos(filterList(allTasks, "pending"));
    } catch (error) {
      console.log("Error while completing: " + error);
    }
  };

  const handleEdit = () => {
    setTitle(title);
    setDescription(description);
    setDueDate(due);
    const modal = window.bootstrap.Modal.getOrCreateInstance(document.getElementById(`editModal${id}`));
    modal.show();
  };

  const handleDelete = () => {
    const modal = new window.bootstrap.Modal(modalRef.current);
    modal.show();
  };

  const handleFinalDelete = async () => {
    try {
      const result = await deleteTodo(id);
      if (result === "Todo deleted successfully") {
        const allTasks = await getAllTasks();
        setTodos(filterList(allTasks, "pending"));
      }
      const modal = window.bootstrap.Modal.getInstance(modalRef.current);
      modal.hide();
    } catch (error) {
      console.log("Error while deleting: " + error);
    }
  };

  return (
    <div className={styles.card}>
      {currentState === "pending" && (
        <p style={{ fontSize: "10px", margin: "5px", color: "#F9CB43", position: "absolute", top: 0, right: "5%" }}>Pending</p>
      )}
      <h4>{title}</h4>
      <p style={{ fontSize: "10px", margin: "5px" }}>{description}</p>
      <p style={{ fontSize: "10px", margin: "5px" }}>Due {due}</p>

      {currentState !== "completed" && (
        <div className={styles.todoComponents}>
          <button className={styles.btn} style={{ backgroundColor: "red", color: "white" }} onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <button className={styles.btn} style={{ backgroundColor: "#FFB22C", color: "white" }} onClick={handleEdit}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className={styles.btn} style={{ backgroundColor: "#77B254", color: "white" }} onClick={handleComplete}>
            <FontAwesomeIcon icon={faCheck} />
          </button>
        </div>
      )}

      {currentState === "completed" && (
        <p style={{ fontSize: "10px", margin: "5px", color: "green", position: "absolute", bottom: 0, right: "5%" }}>Completed</p>
      )}

      {/* Delete Confirmation Modal */}
      <div className="modal fade" ref={modalRef} id={`deleteModal${id}`} tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete Item</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-danger" onClick={handleFinalDelete}>Delete</button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Task Modal */}
      <div className="modal fade" id={`editModal${id}`} tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit TODO Task: {id}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor={`title${id}`} className="col-form-label">Title:</label>
                  <input type="text" className="form-control" id={`title${id}`} value={title_} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor={`description${id}`} className="col-form-label">Description:</label>
                  <textarea className="form-control" id={`description${id}`} value={description_} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor={`dueDate${id}`} className="col-form-label">Due Date:</label>
                  <input type="date" className="form-control" id={`dueDate${id}`} value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-success" onClick={handleSubmit}>Update</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
