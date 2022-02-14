/* eslint-disable react/require-render-return */
import React, { FC } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { Link, Outlet, useParams  } from 'react-router-dom';
import { getDataForHouse } from '../../api';
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
            houseOwner: 'None'
          };
      }

      componentDidMount(){
        getDataForHouse(this.state.houseNumber).then((res: any) => {
          //here we get the image url from fauna db, dont need to be owner to look at image
          this.setState({ imageForRoom: res?.data?.imageUrl, loading: false, houseOwner: res?.data?.wallet });
        });
      }

      render() {
          if(!this.state.loading && !this.state.imageForRoom){
            return ( 
              <>
                <Househeader />
                <div id='main-picture' style={{marginLeft: '36%', backgroundColor: 'white', height:'40%', width:'17%'}}>
                  <img src="" alt=""/>
                </div>           
              </>);
          } else{
            return ( 
              <>
                  <Househeader />
                  <img src={this.state.imageForRoom} alt="" id='main-picture' style={{marginLeft: '36%', height:'40%', width:'17%'}}/>         
              </>);
          }
      }
}

export const Househeader: FC = props => {
  const { number } = useParams();
  const { publicKey } = useWallet();
  
  return (
    <>
      <div style={{paddingRight: '30px', paddingTop:'20px', float: 'right'}}>
        <WalletMultiButton />
      </div>
      <h2 style={{color: 'white', paddingLeft: '20px', paddingTop:'10px', fontFamily: 'cursive'}}>House # {number}</h2>
      {!publicKey?.toString() ? <><h2 style={{color: 'white', paddingLeft: '20px', paddingTop:'10px', fontFamily: 'cursive'}}>Owner: None</h2></> : <RoomWallLinkComponent pubKey={publicKey.toString()} houseNumber={number}/>}
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
        houseOwner: ''
      };
  }

  loadData() {
    //will get this from the DB once assigned to house
    //this is the mint key assigned on mint and we check against wallet...
    //i used wallet ck... for testing
    var mintMetaPlexMetadataKey = 'BDgThfAMsPnq1JYQgSMPR2uyQ8ovwdrbSZ47X28qnjzf';
    var promise = metadata.Metadata.findByMint(connection, mintMetaPlexMetadataKey).then(async (resp) => {
            this.setState({ houseOwner:resp.data.updateAuthority, isHouseOwner: resp.data.updateAuthority === this.state.pubKey });
    });
    return promise;
  }

  //Wont need to use this unless we go by arweave data instead
  // async getImageForEachString(resp: any[]) {
  //   let promiseList: any[] = [];
  //   resp.forEach(async nft => {
  //       promiseList.push(axios.get(nft.data.uri));
  //   })
    
  //   const bar = await Promise.all(promiseList);
  //   return bar;
  // }

  componentDidMount(){
    this.loadData()
        .then((data) => {
          this.setState({ data: data, loading: false, });
    });
  }

  getShortWalletString = () => {
    return this.state.houseOwner.substring(0, 4) + '...' + this.state.houseOwner.slice(this.state.houseOwner.length - 4);
  }

  render() {
        if(!this.state.loading && this.state.isHouseOwner){
          return(
            <>
            <h2 style={{color: 'white', paddingLeft: '20px', paddingTop:'10px', fontFamily: 'cursive'}}>Owner: {this.getShortWalletString()}</h2>
            <Link to={'/neighborhood/house/' + this.state.houseNumber + '/selection/' + this.state.pubKey}>
            <h2 style={{color: 'white', paddingRight: '20px', fontFamily: 'cursive', cursor: 'pointer', float: 'right'}}>Chose Image</h2>  
                <Outlet />
            </Link>
            </>
           )
        } else {
          return( 
            <>
            <h2 style={{color: 'white', paddingLeft: '20px', paddingTop:'10px', fontFamily: 'cursive'}}>Owner: {this.getShortWalletString()}</h2>
            </>
          )
        }
  } 
}


