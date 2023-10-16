import React, { useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom'; // Import useParams and useHistory
import { makePostRequest } from "../util/utils";
import { ToastContainer, toast } from 'react-toastify';

function DeleteTask() { // Renamed to start with an uppercase letter
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        async function deleteTask() {
            try {
                const requestData = { id };
                const response = await makePostRequest(`/delete/${id}`, requestData);

                if (response.data.status === "1") {
                    toast.success('Task deleted successfully', {
                        position: 'top-center',
                        autoClose: 3000,
                        onClose: () => history.push('/')
                    });
                } else {
                    toast.warning('Error: ' + response.data.message);
                }
            } catch (error) {
                toast.error('Error: ' + error.message);
            } finally {
                history.push("/");
            }
        }

        deleteTask();
    }, [id, history]);

    return null; // Return null, as this component doesn't render any UI
}

export default DeleteTask;
