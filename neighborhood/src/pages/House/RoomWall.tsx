/* eslint-disable react/require-render-return */
import React, { FC } from 'react';
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { Link, Outlet, useParams  } from 'react-router-dom';
import { getNFTForRoom } from '../../api';

class RoomWallComponent extends React.Component<any,any> {
        constructor(props: any) {
          super(props);
          console.log(props);
          this.state = {
            loading: true,
            imageForRoom: '',
          };
      }

      componentDidMount(){
        debugger;
        getNFTForRoom(342).then((res: any) => {
          console.log(res.data)
          this.setState({ imageForRoom: res.data.imageUrl, loading: false });
        });
      }

      render() {
          
          if(this.state.loading){
            return ( 
              <>
                <div id='main-picture' style={{marginLeft: '36%', backgroundColor: 'white', height:'40%', width:'17%'}}>
                  <img src="" alt=""/>
                </div>           
              </>);
          } else{
            return ( 
              <>
              <SendOneLamportToRandomAddress />
                  <img src={this.state.imageForRoom} alt="" id='main-picture' style={{marginLeft: '36%', height:'40%', width:'17%'}}/>         
              </>);
          }
         
      }
}

export const SendOneLamportToRandomAddress: FC = props => {
  let { number } = useParams();
  
  const { publicKey } = useWallet();
  const isHouseOwner: boolean = true;

  const getShortWalletString = () => {
    return publicKey?.toString().substring(0, 4) + '...' + publicKey?.toString().slice(publicKey?.toString().length - 4);
  }
  const shortWallet = publicKey ? getShortWalletString() : '';
  
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
      <Link to={'/neighborhood/house/selection/' + publicKey?.toString()}>
      <h2 style={{color: 'white', paddingRight: '20px', fontFamily: 'cursive', cursor: 'pointer', float: 'right', visibility: publicKey === undefined || publicKey?.toString() === '' || publicKey === null ? 'hidden' : 'visible'}}>Chose Image</h2>  
          <Outlet />
      </Link>
     
    </>
  );
};

export default RoomWallComponent;


