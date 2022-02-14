import { toast } from 'react-toastify';
import { client, q } from '../config/db';

export const setLivingRoomDisplayForHouse = ({wallet, imageUrl, houseNumber}: any) =>
    client
        .query(
            q.Create(q.Collection('GentiesHodlers'), {
                data: {
                    wallet,
                    imageUrl,
                    houseNumber
                }
            })
        )
        .then(ret => ret)
        .catch(error => {
            toast.error("Something Went Wrong :(")
            console.error('Error: ', error.message)
        });

export const getDataForHouse = (houseNumber: any) =>
    client
        .query(
            q.Get(
                q.Match(q.Index('nft_by_house'), houseNumber))
        )
        .then(ret => ret)
        .catch(error => {
            toast.error("Something Went Wrong :(")
            console.error('Error: ', error.message)
        });