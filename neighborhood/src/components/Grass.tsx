import React from 'react';
export interface IGrassComponentProps {
    house: any;
}

const GrassComponent: React.FunctionComponent<IGrassComponentProps> = (props) => {
    return (
        <img key="house.runningCount" className='squareStyle' src={props.house.image} />
    );
};

export default GrassComponent;