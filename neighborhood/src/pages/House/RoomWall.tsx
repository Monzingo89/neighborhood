/* eslint-disable react/require-render-return */
import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { Link, Outlet, useNavigate, useParams  } from 'react-router-dom';
import { getDataForHouse, getArweaveForHouse } from '../../api';
import * as metadata from "@metaplex-foundation/mpl-token-metadata";
import * as web3 from '@solana/web3.js';

var connection = new web3.Connection(
    web3.clusterApiUrl('mainnet-beta'),
    'confirmed',
);

class RoomWallComponent extends React.Component<any,any> {
        constructor(props: any) {
          super(props);
          this.state = {
            loading: true,
            imageForRoom: '',
            houseNumber: parseInt(props.houseNumber),
            houseOwner: ''
          };
      }
  
      componentDidMount(){
        getDataForHouse(this.state.houseNumber.toString()).then((res: any) => {
          this.setState({ imageForRoom: res?.data?.imageUrl, loading: false, houseOwner: res?.data?.wallet ?? 'None'});
        });
      }

      render() {
          if(!this.state.loading && !this.state.imageForRoom){
            return ( 
              <>
                <Househeader houseOwner={this.state.houseOwner}/>
                <div id='main-picture' style={{marginLeft: '36%', backgroundColor: 'white', height:'40%', width:'17%'}}>
                  
                </div>           
              </>);
          } else{
            return ( 
              <>
                  <Househeader houseOwner={this.state.houseOwner}/>
                  <img src={this.state.imageForRoom} alt="" id='main-picture' style={{marginLeft: '36%', height:'40%', width:'17%'}}/>         
              </>);
          }
      }
}

export const Househeader = (props: { houseOwner: string }) => {
  const { number } = useParams();
  const { publicKey } = useWallet();
  const navigate = useNavigate();

  const getShortWalletString = (houseOwner: string) => {
    return houseOwner === 'None' ? 'None' : houseOwner.substring(0, 4) + '...' + houseOwner.slice(houseOwner.length - 4);
  }

  return (
    <>
      <div style={{paddingRight: '30px', paddingTop:'20px', float: 'right'}}>
        <WalletMultiButton />
      </div>
      <h2 style={{color: 'white', paddingLeft: '20px', paddingTop:'10px', fontFamily: 'cursive'}}>House # {number}</h2>
      <h2 style={{color: 'white', paddingLeft: '20px', paddingTop:'10px', fontFamily: 'cursive'}}>Owner: {getShortWalletString(props.houseOwner)}</h2>
      {!publicKey?.toString() ? <></> : <RoomWallLinkComponent pubKey={publicKey.toString()} houseNumber={number}/>}
      <h2 style={{color: 'white', paddingLeft: '20px', paddingTop:'10px', fontFamily: 'cursive', cursor: 'pointer'}} onClick={() => navigate('/') }>Go Back</h2>
    </>
  );
};

export default RoomWallComponent;

export class RoomWallLinkComponent extends React.Component<any,any> {
    constructor(props: any) {
      super(props);
      this.state = {
        loading: true,
        isHouseOwner: false,
        pubKey: props.pubKey,
        houseNumber: props.houseNumber,
        arweaveReference: '',
      };
  }

  loadData() {
      getArweaveForHouse(this.state.houseNumber.toString()).then((res: any) => {
        this.setState({ arweaveReference: res?.data?.link });
        metadata.Metadata.findDataByOwner(connection, this.state.pubKey).then((resp) =>{
          resp.forEach(nft => {
            if(nft.data.uri === this.state.arweaveReference){
                this.setState({ isHouseOwner: true});
            }
          })
          this.setState({ loading: false});
        });
      });
      
  }

  componentDidMount(){
    this.loadData();
  }

  render() {
        if(!this.state.loading && this.state.isHouseOwner){
          return(
            <>
            <Link to={'/neighborhood/house/' + this.state.houseNumber + '/selection/' + this.state.pubKey}>
            <h2 style={{color: 'white', paddingRight: '20px', fontFamily: 'cursive', cursor: 'pointer', float: 'right'}}>Chose Image</h2>  
                <Outlet />
            </Link>
            </>
           )
        } else {
          return( 
            <>
            </>
          )
        }
  } 
}


