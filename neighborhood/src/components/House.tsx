import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { SquareObject } from '../models/SquareRowObject';

export interface IHouseComponentProps {
    house: SquareObject;
}

const pStyle = {
    width: '15px',
    height: '15px'
  };

const HouseComponent: React.FunctionComponent<IHouseComponentProps> = (props) => {
    return (
        <Link to={'/neighborhood/room/' + props.house.runningCount} key="house.runningCount" >
            <img style= {pStyle} src={props.house.image} />
            <Outlet />
        </Link>
    );
};

export default HouseComponent;