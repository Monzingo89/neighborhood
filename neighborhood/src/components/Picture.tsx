import React from 'react';
import "../home.css";
export interface IPictureComponentProps {
    nft:any
}

const PictureComponent: React.FunctionComponent<IPictureComponentProps> = (props) => {
    return (
        <img style={{padding: '10px', cursor: 'pointer',  height: '200px', width: '200px' }} className='nftSyle' src={props.nft} alt="" />
    );
};

export default PictureComponent;