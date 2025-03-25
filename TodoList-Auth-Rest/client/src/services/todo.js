import axios from 'axios'; 



export async function registerUser(firstName, lastName, email, phone, password) {
    
}
export async function getAllTasks() {
    try {
        const url = `http://localhost:4000/todolist/`;
        const token = localStorage.getItem("token");

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (ex) {
        console.error("Error fetching tasks:", ex.message);
        return []; 
    }
}



export const filterList = (list, state) => {
    return list.filter((item) => item.currentState === state);
};


export async function addTodo(title, description, dueDate, state) {
  const token = localStorage.getItem("token");
    try {
        const response = await axios.post(
            'http://localhost:4000/todolist/', 
            {
                id: `${Date.now()}`,
                title,
                description,
                dueDate,
                currentState: state
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data;  
    } catch (error) {
        console.error("Error adding task:", error.response ? error.response.data : error.message);
    }
}

export async function updateTodo(id,title, description, dueDate, currentState) {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.put(
            `http://localhost:4000/todolist/${id}`,
            {
                title : title,
                description : description,
                dueDate : dueDate,
                currentState : currentState
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

        );
        return response.data; 
    }
    catch(error) {
        console.error("Error Updating task:", error.response ? error.response.data : error.message);
    }
}

export async function deleteTodo(id) {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.delete(`http://localhost:4000/todolist/${id}`,
            {
                headers:{
                    Authorization : `Bearer ${token}`
                }
            }
        )
        return response.data;
    }catch(error) {
        console.log("error while deleting: "+error);
    }
}

export async function getUserDetails() {
    const userEmail = localStorage.getItem("userEmail");
    const response = await axios.post(`http://localhost:4000/users/userDetails`,
        {
            email : userEmail
        });
    return response.data
    
}
