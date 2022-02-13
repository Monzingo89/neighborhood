import React from 'react';
import { SquareObject } from '../models/SquareRowObject';
export interface IHouseComponentProps {
    house: SquareObject;
}

const GrassComponent: React.FunctionComponent<IHouseComponentProps> = (props) => {
    return (
        <img key="house.runningCount" className='squareStyle' src={props.house.image} alt="" />
    );
};

export default GrassComponent;