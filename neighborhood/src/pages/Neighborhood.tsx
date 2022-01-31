import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export interface INeighborhoodPageProps {}

const NeighborhoodPage: React.FunctionComponent<INeighborhoodPageProps> = (props) => {
    const [message, setMessage] = useState('');
    const { number } = useParams();

    useEffect(() => {
        if (number) {
            setMessage('The number is ' + number);
        } else {
            setMessage('No number was provided');
        }
    }, [number]);

    return (
        <div>
            <p>This is the Neighborhood page.</p>
            <p>{message}</p>
        </div>
    );
};

export default NeighborhoodPage;