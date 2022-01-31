import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
    const navigate = useNavigate();

    return (
        <div>
            <p>This is the home page.</p>
            <Link to="/neighborhood">Go to the Genties Neighborhood!</Link>
            <br />
            <button onClick={() => navigate('/layout/55')}>Go to House, with a number</button>
        </div>
    );
};

export default HomePage;