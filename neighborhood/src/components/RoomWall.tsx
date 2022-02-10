/* eslint-disable react/require-render-return */
import React, { FC, useCallback } from 'react';
import * as web3 from '@solana/web3.js';
import * as metadata from "@metaplex-foundation/mpl-token-metadata";
import PictureComponent from './Picture';
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { useNavigate, useParams  } from 'react-router-dom';

const axios = require('axios').default;
var connection = new web3.Connection(
    web3.clusterApiUrl('mainnet-beta'),
    'confirmed',
  );
class RoomWallComponent extends React.Component<any,any> {
    constructor(props: any) {
        super(props);
        this.state = {
          loading: true,
          data: []
        };
    }
    loadData() {
        //var isHomeOwner = metadata.Metadata.getInfo()
        var promise = metadata.Metadata.findDataByOwner(connection, "ckFTtPQAVcHsWmdRKX5i49mUyVCRGTjLQ3VpKzgJk4Z").then(async (resp) =>{
                console.log(resp)
                return await this.getImageForEachString(resp)
        });
        return promise;
    }
    
    async getImageForEachString(resp: any[]) {
        let promiseList: any[] = [];
        resp.forEach(async nft => {
            promiseList.push(axios.get(nft.data.uri));
        })
        
        const bar = await Promise.all(promiseList);
        return bar;
    }

    componentDidMount() {
      debugger;
        this.setState({ loading: true });
        this.loadData()
        .then((data) => {
          this.setState({
            data: data,
            loading: false
          });
          console.log(this.state)
        });
      }  

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
        
        if(this.state.loading === false){
          return ( <>
            <div>
                {this.state.data.map((item: { data: { image: React.Key | null | undefined; }; }) => {
                    return <PictureComponent key={item.data.image} nft={item.data.image} />
                })}
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
      <h2 style={{color: 'white', paddingLeft: '20px', paddingTop:'10px', fontFamily: 'cursive', cursor: 'pointer'}}>House # {number}</h2>
      <h2 style={{color: 'white', paddingLeft: '20px', paddingTop:'10px', fontFamily: 'cursive', cursor: 'pointer'}}>Owner {publicKey?.toLocaleString()}</h2>
      <h2 onClick={onClick} style={{color: 'white', paddingRight: '20px', paddingTop:'10px', fontFamily: 'cursive', cursor: 'pointer', float: 'right'}}>Login</h2>
      <div>
        <WalletMultiButton />
      </div>
     <div>
       <WalletDisconnectButton  />
     </div>
    </>
  );
};

export default RoomWallComponent;


