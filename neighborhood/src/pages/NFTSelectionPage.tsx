import React from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import * as web3 from '@solana/web3.js';
import * as metadata from "@metaplex-foundation/mpl-token-metadata";
import PictureComponent from '../components/Picture';

const axios = require('axios').default;
var connection = new web3.Connection(
    web3.clusterApiUrl('mainnet-beta'),
    'confirmed',
);

export interface INFTSelectionPageProps {}

const welcomeHeader = 'WELCOME HOME DADDY!' + ' <3';

const NFTCollectionPage: React.FunctionComponent<INFTSelectionPageProps> = (props) => {
    //TODO change this to not allow users to manually go to selection page
    const { pathname } = useLocation();
    let pubKey = pathname.split("/").pop();
    return (
        <div style={{ backgroundColor: '#B1C3F5', backgroundSize: '100% 100%', height: '100%', textAlign: 'center' }}>
            <div>
                <h1 style={{ color: 'white', paddingTop: '40px', fontFamily: 'cursive' }}>{welcomeHeader}</h1>
            </div>
            <div>
                <h1 style={{ color: 'white', paddingTop: '40px', fontFamily: 'cursive' }}>SELECT WHOM TO PUT ON DISPLAY</h1>
            </div>
            <RenderNFTs pubKey={pubKey}/>
            <Outlet />
        </div>
    )
};

class RenderNFTs extends React.Component<any,any> {
    constructor(props: any) {
        super(props);
        console.log(props);
        this.state = {
          loading: 'initial',
          data: [],
          pubKey: props.pubKey
        };
    }

    loadData() {
        var promise = metadata.Metadata.findDataByOwner(connection, this.state.pubKey.toLocaleString()).then(async (resp) =>{
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
        this.setState({ loading: 'true' });
        this.loadData()
        .then((data) => {
          this.setState({
            data: data,
            loading: 'false'
          });
          console.log(this.state)
        });
      }  

      render() {
        
        if (this.state.loading === 'initial') {
            return ( <>
              <h2>INITIALIZING</h2>
            </>);
          }
  
          if (this.state.loading === 'true') {
            return ( <>
                <h2>LOADING NFTs</h2>
              </>);
          }
          
          if(this.state.loading === 'false'){
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

export default NFTCollectionPage;