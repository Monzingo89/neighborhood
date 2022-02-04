/* eslint-disable react/require-render-return */
import React from 'react';
import * as web3 from '@solana/web3.js';
import * as metadata from "@metaplex-foundation/mpl-token-metadata";
import PictureComponent from './Picture';

const axios = require('axios').default;
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
        this.setState({ loading: 'true' });
        this.loadData()
        .then((data) => {
          this.setState({
            data: data,
            loading: 'false'
          });
        });
      }  

      render() {
        if (this.state.loading === 'initial') {
            return <h2>Intializing...</h2>;
        }

        if (this.state.loading === 'true') {
            return <h2>Loading...</h2>;
          }
          
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


