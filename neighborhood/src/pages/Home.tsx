import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import "../home.css";
import NeighborhoodPage from './Neighborhood';

export interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
    return (
        <>
        <Navbar>
            <Navbar.Brand href="#home">
                GENTIES NEIGHBORHOOD 
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Nav.Link href="#home">MAGIC EDEN</Nav.Link>
                <Nav.Link href="#link">TWITTER</Nav.Link>
                <Nav.Link href="#link">DISCORD</Nav.Link>
            </Navbar.Collapse>
        </Navbar>
       
        <NeighborhoodPage/>
        </>
       
    );
};

export default HomePage;