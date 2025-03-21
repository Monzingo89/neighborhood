import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { SquareObject } from '../../models/SquareRowObject';

export interface IHouseComponentProps {
    house: SquareObject;
}

const HouseComponent: React.FunctionComponent<IHouseComponentProps> = (props) => {
    return (
        <Link className='squareStyle' to={'/neighborhood/house/' + props.house.runningCount} key="house.runningCount" id={props.house.runningCount.toString()}>
            <img className='squareStyle' src={props.house.image} alt=""/>
            <Outlet />
        </Link>
    );
};

export default HouseComponent;