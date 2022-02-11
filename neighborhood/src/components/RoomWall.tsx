/* eslint-disable react/require-render-return */
import React, { FC, useCallback } from 'react';
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { useNavigate, useParams  } from 'react-router-dom';

class RoomWallComponent extends React.Component<any,any> {
    
      render() {
        if (this.state.loading === true) {
          return ( <>
            <h2>Loading</h2>
            <span>PublicKey: </span>
          </>);
        }

        if (this.state.loading === false) {
          return ( 
          <>
            <SendOneLamportToRandomAddress />
            <div id='main-picture' style={{marginLeft: '36%', backgroundColor: 'white', height:'40%', width:'17%'}}>

            </div>
           
          </>);
        }
      }
}

export const SendOneLamportToRandomAddress: FC = props => {
  let { number } = useParams();
  
  let navigate = useNavigate();
  const { publicKey } = useWallet();
  const isHouseOwner: boolean = true;

  const getShortWalletString = () => {
    return publicKey?.toString().substring(0, 4) + '...' + publicKey?.toString().slice(publicKey?.toString().length - 4);
  }
  const shortWallet = publicKey?.toLocaleString() !== null ? getShortWalletString() : '';

  const onClick = useCallback(() => {
      if(publicKey?.toLocaleString() !== undefined && isHouseOwner){
        //logic says house owner so redirect to room
        renderRedirect(publicKey.toLocaleString())
      }
      console.log(publicKey?.toLocaleString());
  }, [publicKey]);

  const renderRedirect = (publicKey: string) => {
    navigate("/neighborhood/room/selection/" + publicKey, { state: publicKey });
  }
  return (
    <>
      <div style={{paddingRight: '30px', paddingTop:'20px', float: 'right'}}>
        <WalletMultiButton />
      </div>
      <div style={{paddingRight: '30px', paddingTop:'20px', float: 'right', visibility: publicKey === undefined || publicKey?.toLocaleString() === '' || publicKey === null ? 'hidden' : 'visible' }}>
       <WalletDisconnectButton  />
     </div>
      <h2 style={{color: 'white', paddingLeft: '20px', paddingTop:'10px', fontFamily: 'cursive', cursor: 'pointer'}}>House # {number}</h2>
      <h2 style={{color: 'white', paddingLeft: '20px', paddingTop:'10px', fontFamily: 'cursive', cursor: 'pointer'}}>Owner {shortWallet}</h2>
      <h2 onClick={onClick} style={{color: 'white', paddingRight: '20px', fontFamily: 'cursive', cursor: 'pointer', float: 'right', visibility: publicKey === undefined || publicKey?.toString() === '' || publicKey === null ? 'hidden' : 'visible'}}>Chose Image</h2>  
    </>
  );
};

export default RoomWallComponent;


