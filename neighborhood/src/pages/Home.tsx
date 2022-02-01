import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../home.css";

export interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
    return (
        
        <Navbar className="navbar">
            <Container>
                <Nav className="me-auto">
                    <Link to="/neighborhood"></Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default HomePage;