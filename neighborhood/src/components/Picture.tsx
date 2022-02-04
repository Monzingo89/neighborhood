import React from 'react';
import "../home.css";
export interface IPictureComponentProps {
    response:any
}

const PictureComponent: React.FunctionComponent<IPictureComponentProps> = (props) => {
    console.log(props);
    let nftString = props;
    return (
        <div>  </div>
      
    );
};

export default PictureComponent;