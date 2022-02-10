import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import "../home.css";
import logo from "../gentie.gif";
import NeighborhoodPage from './Neighborhood';

export interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
    return (
        <>
        <Navbar>
            <Navbar.Brand href="#home">
                <div>
                GENTIES <br></br> NEIGHBORHOOD 
                </div>
            </Navbar.Brand>
            <Navbar.Brand>
               <img src={logo} alt="" />
            </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
                <Nav.Link href="https://magiceden.io/marketplace/genties" target="_blank">MAGIC EDEN</Nav.Link>
                <Nav.Link href="https://twitter.com/GentiesNFT" target="_blank">TWITTER</Nav.Link>
                <Nav.Link href="https://discord.com/invite/WU6E8uqQwJ" target="_blank">DISCORD</Nav.Link>
            </Navbar.Collapse>
        </Navbar>
        <NeighborhoodPage/>
        </>
    );
};

export default HomePage;