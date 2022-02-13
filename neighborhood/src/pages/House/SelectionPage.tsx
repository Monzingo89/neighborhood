import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import * as web3 from '@solana/web3.js';
import * as metadata from "@metaplex-foundation/mpl-token-metadata";
import { createNFTForRoom } from '../../api';

const axios = require('axios').default;
var connection = new web3.Connection(
    web3.clusterApiUrl('mainnet-beta'),
    'confirmed',
);

export interface ISelectionPageProps {}

const welcomeHeader = 'WELCOME HOME ZADDY!' + ' <3';

const SelectionPage: React.FunctionComponent<ISelectionPageProps> = (props) => {

    //TODO change this to not allow users to manually go to selection page
    const { pathname } = useLocation();
    let pubKey = pathname.split("/").pop();

    return (
        <div style={{ backgroundColor: '#B1C3F5', backgroundSize: '100% 100%', height: '200vh', textAlign: 'center' }}>
            <div>
                <h1 style={{ color: 'white', paddingTop: '40px', fontFamily: 'cursive' }}>{welcomeHeader}</h1>
            </div>
            <div>
                <h1 style={{ color: 'white', paddingTop: '40px', fontFamily: 'cursive', paddingBottom: '20px' }}>SELECT WHO TO PUT ON DISPLAY:</h1>
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
          pubKey: props.pubKey.toLocaleString(),
        };
    }

    loadData() {
        var promise = metadata.Metadata.findDataByOwner(connection, this.state.pubKey).then(async (resp) =>{
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
        const handleNFTSave = (nftImageUrl: any) => {
          createNFTForRoom({wallet: this.state.pubKey, imageUrl: nftImageUrl, houseNumber: 342}).then((res: any) => {
            console.log(res);
          });
        }
        if (this.state.loading === 'initial') {
            return ( <>
              <h2 style={{color: 'white', paddingLeft: '20px', paddingTop:'10px', fontFamily: 'cursive', cursor: 'pointer'}}>INITIALIZING</h2>
            </>);
          }
  
          if (this.state.loading === 'true') {
            return ( <>
                <h2 style={{color: 'white', paddingLeft: '20px', paddingTop:'10px', fontFamily: 'cursive', cursor: 'pointer'}}>LOADING NFTs</h2>
              </>);
          }
          
          if(this.state.loading === 'false'){
            return ( <>
            <div className='container' style={{borderStyle: 'dashed', borderColor: 'purple'}}>
                    {this.state.data.map((item: { data: { image: React.Key | null | undefined; }; }) => {
                        return <img style={{padding: '10px', cursor: 'pointer',  height: '200px', width: '200px' }} className='nftSyle' src={`${item.data.image}`} onClick={() => handleNFTSave(item.data.image)} alt="" key={item.data.image} />
                    })}
            </div>
              
            </>);
          }
      }
}

export default SelectionPage;