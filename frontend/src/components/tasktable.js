import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { makeGetRequest, makePostRequest } from "../util/utils";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'; // Import Link

function TaskTable() {
    const history = useHistory();
    const [tasks, setTasks] = useState([]);

    async function getTasks() {
        try {
            const response = await makeGetRequest("/"); // Pass the correct endpoint

            // Ensure that the response structure matches the data sent from Flask
            if (response && response.tasks) {
                setTasks(response.tasks);
            } else {
                setTasks([]); // Clear tasks on error
            }
        } catch (err) {
            console.error("Error:", err);
            // Handle the error, e.g., display a message to the user
        }
    }

    useEffect(() => {
        getTasks();
    }, []);

    const deleteTask = async (id) => {
        try {
            const requestData = { id };
            const response = await makePostRequest(`/delete/${id}`, requestData);

            if (response.data.status === "1") {
                // Refresh the task list after deletion
                getTasks();
            } else {
                console.error('Error: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error: ' + error.message);
        }
        finally {
            history.push("/");
        }
    };

    return (
        <div>
            <h1>Task List</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Task Id</th>
                        <th>Task</th>
                        <th>Task Created</th>
                        <th>Status</th>
                        <th>Operation</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => (
                        <tr key={index}>
                            <td>{task.id}</td>
                            <td>{task.title}</td>
                            <td>{task.created_date}</td>
                            <td>{task.curr_status}</td>
                            <td>
                                <Link to={`/update/${task.id}`}>
                                    <Button variant="warning">Update</Button>
                                </Link>
                                {' '}
                            </td>
                            <td>
                                <Button variant="danger" onClick={() => deleteTask(task.id)}>Delete</Button>{' '}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TaskTable;

