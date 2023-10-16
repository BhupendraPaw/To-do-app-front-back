import { useHistory } from "react-router-dom";
import { useState } from "react";
import Navbartry from "./components/navbartry";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { makePostRequest } from "./util/utils";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import tasktable from "./components/tasktable";
import TaskTable from "./components/tasktable";

function Home() {
    const history = useHistory();
    const [task, setTask] = useState('');

    async function addTask() {
        try {
            const requestData = { title: task };
            const response = await makePostRequest('/', requestData);

            if (response.data.status === "1") {
                toast.success('Task added successfully', {
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
    }



    return (
        <div>
            <Navbartry />
            <Container>
                <Row className="d-flex align-items-center">
                    <Col></Col>
                    <Col>
                        <Form.Control
                            type="text"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            placeholder="Add Task..."
                        />
                    </Col>
                    <Col>
                        <Button variant="primary" onClick={addTask}>
                            Add Task
                        </Button>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col></Col>
                    <Col className="text-center">
                        <h5>To-Do List</h5>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
            <TaskTable></TaskTable>
        </div>
    );
}

export default Home;
