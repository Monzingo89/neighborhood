import React from 'react';
import * as web3 from '@solana/web3.js';
import { Button } from 'react-bootstrap';
import * as metadata from "@metaplex-foundation/mpl-token-metadata";
import PictureComponent from './Picture';

export interface IRoomWallComponentProps {}

const RoomWallComponent: React.FunctionComponent<IRoomWallComponentProps> = (props) => {
    const axios = require('axios').default;
    //TODO: wrap this in a wallet adapter for nice UI sign in and then create a metadata object
    let nftsmetadata: any[];
    let nftImages: any[] = [];
    const onClick = async () => {
        var connection = new web3.Connection(
            web3.clusterApiUrl('mainnet-beta'),
            'confirmed',
          );
  
          nftsmetadata = await metadata.Metadata.findDataByOwner(connection, "ckFTtPQAVcHsWmdRKX5i49mUyVCRGTjLQ3VpKzgJk4Z");
          nftImages = [];
          let response = '';
          for (var i = 0; i < nftsmetadata.length; i++) { 
              debugger;
                response = axios.get(nftsmetadata[i].data.uri)
                .then(function(obj: any) {
                    console.log(obj.data.image)
                  nftImages.push(obj.data.image)
                }).catch(function(err: any){
                    console.log(err);
                })
          }
    }
    return (
        
        <div>
            {nftImages.map((nft, o) => {
                console.log(nft);
                return <PictureComponent key={nft[o]} response={nft[o]}/>;
            })}
           <Button onClick={async () => {await onClick();} }/>
        </div>
    );
};

interface MyObj {
    image: string;
    name: string;
}

export default RoomWallComponent;