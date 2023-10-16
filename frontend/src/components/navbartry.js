import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Navbartry() {
    return (
        <Container>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#">To-Do App</Navbar.Brand>
                </Container>
            </Navbar>
        </Container>
    );
}

export default Navbartry;