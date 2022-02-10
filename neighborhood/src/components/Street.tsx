import React from 'react';
import "../home.css";
export interface IStreetComponentProps {
    house: any;
}

const StreetComponent: React.FunctionComponent<IStreetComponentProps> = (props) => {
    return (
        <img key="house.runningCount" className='squareStyle' src={props.house.image} alt=""/>
    );
};

export default StreetComponent;