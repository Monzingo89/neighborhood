import React from 'react';
import { Outlet } from 'react-router-dom';
import "../home.css";
export interface IPictureComponentProps {
    nft:any
}

const PictureComponent: React.FunctionComponent<IPictureComponentProps> = (props) => {
    return (
        <img className='nftSyle' src={props.nft} alt="" />
    );
};

export default PictureComponent;