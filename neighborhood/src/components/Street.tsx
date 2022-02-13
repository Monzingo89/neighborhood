import React from 'react';
import "../home.css";
import { SquareObject } from '../models/SquareRowObject';
export interface IHouseComponentProps {
    house: SquareObject;
}

const StreetComponent: React.FunctionComponent<IHouseComponentProps> = (props) => {
    return (
        <img key="house.runningCount" className='squareStyle' src={props.house.image} alt=""/>
    );
};

export default StreetComponent;