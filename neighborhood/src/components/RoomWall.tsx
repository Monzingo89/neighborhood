/* eslint-disable react/require-render-return */
import React, { useEffect, useState } from 'react';
import * as web3 from '@solana/web3.js';
import { Button } from 'react-bootstrap';
import * as metadata from "@metaplex-foundation/mpl-token-metadata";
import PictureComponent from './Picture';
import { Outlet } from 'react-router-dom';

const axios = require('axios').default;
//TODO: wrap this in a wallet adapter for nice UI sign in and then create a metadata object
let nftsmetadata: any[];
let nftImages: string[] = [];
var connection = new web3.Connection(
    web3.clusterApiUrl('mainnet-beta'),
    'confirmed',
  );
class RoomWallComponent extends React.Component<any,any> {
    constructor(props: any) {
        super(props);
        console.log('This happens 1st.');  
        this.state = {
          loading: 'initial',
          data: []
        };
    
    }
    loadData() {
        var promise = metadata.Metadata.findDataByOwner(connection, "ckFTtPQAVcHsWmdRKX5i49mUyVCRGTjLQ3VpKzgJk4Z").then(async (resp) =>{
                console.log(resp)
                return await this.getImageForEachString(resp)
        });

        console.log('This happens 4th.');
        return promise;
    }
    
    async getImageForEachString(resp: any[]) {
        let promiseList: any[] = [];
        resp.forEach(async nft => {
            promiseList.push(axios.get(nft.data.uri));
        })
        
        const bar = await Promise.all(promiseList);
        console.log(bar);
        console.log('This happens 6th.');
        return bar;
    }

    componentDidMount() {

        console.log('This happens 3rd.');
    
        this.setState({ loading: 'true' });
        this.loadData()
        .then((data) => {
            console.log(data)
          console.log('This happens 7th.');
          this.setState({
            data: data,
            loading: 'false'
          });
        });
      }  

      render() {
        if (this.state.loading === 'initial') {
            console.log('This happens 2nd - after the class is constructed. You will not see this element because React is still computing changes to the DOM.');
            return <h2>Intializing...</h2>;
        }

        if (this.state.loading === 'true') {
            console.log('This happens 5th - when waiting for data.');
            return <h2>Loading...</h2>;
          }
          
        console.log('This happens 8th - after I get data.');
        console.log(this.state.data);
        return (
          <div>
                {this.state.data.map((item: { data: { image: React.Key | null | undefined; }; }) => {
                    return <PictureComponent key={item.data.image} nft={item.data.image} />
                })}
         </div>
        );
      }
}

export default RoomWallComponent;


