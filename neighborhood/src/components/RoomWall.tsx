import { useWallet } from '@solana/wallet-adapter-react';
import React from 'react';
import * as web3 from '@solana/web3.js';
import { Button } from 'react-bootstrap';
import * as metadata from "@metaplex-foundation/mpl-token-metadata";

export interface IRoomWallComponentProps {}

const RoomWallComponent: React.FunctionComponent<IRoomWallComponentProps> = (props) => {

    //TODO: wrap this in a wallet adapter for nice UI sign in and then create a metadata object so that we can display the nfts
    const onClick = async () => {
        var connection = new web3.Connection(
            web3.clusterApiUrl('mainnet-beta'),
            'confirmed',
          );
  
          const nftsmetadata: metadata.MetadataData[] = await metadata.Metadata.findDataByOwner(connection, "ckFTtPQAVcHsWmdRKX5i49mUyVCRGTjLQ3VpKzgJk4Z");

          console.log(nftsmetadata);
    }
    return (
        <Button onClick={async () => {await onClick();} }/>

    );
};

export default RoomWallComponent;