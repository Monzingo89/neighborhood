import React from 'react';

export interface IGrassComponentProps {
    house: any;
}

const pStyle = {
    width: '15px',
    height: '15px'
  };

const GrassComponent: React.FunctionComponent<IGrassComponentProps> = (props) => {
    return (
        <span key="house.runningCount">
          <img style={pStyle} src={props.house.image} />
        </span>
    );
};

export default GrassComponent;