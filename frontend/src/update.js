import React, { useState } from "react";
import Navbartry from "./components/navbartry";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import { makePostRequest } from "./util/utils";
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';

function Update() {
    const history = useHistory();
    const [task, setTask] = useState('');
    const [status, setStatus] = useState('');
    const { id } = useParams();

    async function updateTask() {
        try {
            const requestData = { id: id, title: task, task_status: status };
            const response = await makePostRequest(`/edit/${id}`, requestData);

            if (response.data.status === "1") {
                toast.success('Task updated successfully', {
                    position: 'top-center',
                    autoClose: 3000,
                    onClose: () => history.push('/')
                });
            } else {
                toast.warning('Error: ' + response.data.message);
            }
        } catch (error) {
            toast.error('Error: ' + error.message);
        }
        finally {
            history.push("/")
        }
    }

    return (
        <div>
            <Navbartry></Navbartry>
            <form>
                <Container>
                    <Row>
                        <Col><Form.Control
                            type="text"
                            placeholder="Task ID"
                            value={id}
                            readOnly
                        /></Col>
                        <Col xs={5}><Form.Control type="text" placeholder="Task..." onChange={(e) => setTask(e.target.value)} /></Col>
                        <Col><Form.Select aria-label="Select Status" onChange={(e) => setStatus(e.target.value)}>
                            <option>Status menu</option>
                            <option value="Start">Start</option>
                            <option value="In-progress">In-progress</option>
                            <option value="delayed">delayed</option>
                            <option value="Closed">Closed</option>
                        </Form.Select></Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col></Col>
                        <Col xs={5}><Button variant="dark" onClick={() => { updateTask(); history.push("/"); }}>Update</Button>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </form>
        </div>
    );
}

export default Update;
