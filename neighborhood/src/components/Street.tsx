import React from 'react';

export interface IStreetComponentProps {
    house: any;
}

const pStyle = {
    width: '15px',
    height: '15px'
  };
const StreetComponent: React.FunctionComponent<IStreetComponentProps> = (props) => {
    return (
        <span key="house.runningCount">
            <img style= {pStyle} src={props.house.image} />
        </span>
    );
};

export default StreetComponent;