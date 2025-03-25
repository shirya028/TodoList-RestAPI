import React, { useState } from "react";
import styles from "../css/AddTodoBtn.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { addTodo, getAllTasks, filterList } from "../services/todo";

export default function AddTodoBtn(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { setTodos } = props;

  const openModal = () => {
    const modal = new window.bootstrap.Modal(document.getElementById("addModal"));
    modal.show();
  };

  const handleSubmit = async () => {
    try {
      const response = await addTodo(title, description, dueDate, "pending"); 

      if (response) {
        const allTasks = await getAllTasks(); 
        setTodos(filterList(allTasks, "pending")); 
        setTitle("");
        setDescription("");
        setDueDate("");
      } else {
        alert("Error adding task.");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }

    
    const modalElement = document.getElementById("addModal");
    const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
      modalInstance.hide();
    }
  };

  return (
    <>
      <div className={styles.AddBtn} onClick={openModal}>
        <FontAwesomeIcon icon={faPlus} style={{ color: "#ffffff" }} />
      </div>

      {/* Modal */}
      <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addModalLabel">New TODO Task</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="col-form-label">Title:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="col-form-label">Description:</label>
                  <textarea
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="dueDate" className="col-form-label">Due till:</label>
                  <input
                    type="date"
                    className="form-control"
                    id="dueDate"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-success" onClick={handleSubmit}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
