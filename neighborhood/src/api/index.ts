import { client, q } from '../config/db';

export const setRoomDisplayForHouse = ({wallet, imageUrl, houseNumber}: any) =>
    client
        .query(
            q.Create(q.Ref(q.Collection('HouseImage'), houseNumber),{
                data: {
                    wallet,
                    imageUrl,
                    houseNumber
                }
            })
        )
        .then(ret => ret)
        .catch(error => {
            console.error('Error: ', error.message)
        });

export const getDataForHouse = (houseNumber: any) =>
    client
        .query(
            q.Get(q.Ref(q.Collection('HouseImage'), houseNumber))
        )
        .then(ret => ret)
        .catch(error => {
            console.error('Error: ', error.message)
        });

export const getArweaveForHouse = (number: any) =>
    client
        .query(
        q.Get(q.Match(q.Index('house_by_number'), number))
        )
        .then(ret => ret)
        .catch(error => {
            console.error('Error: ', error.message)
        });

export const updateRoomDisplayForHouse = ({wallet, imageUrl, houseNumber}: any) =>
    client
        .query(
            q.Update(q.Ref(q.Collection('HouseImage'), houseNumber),{
                data: {
                    wallet,
                    imageUrl
                }
            })
        )
        .then(ret => ret)
        .catch(error => {
            console.error('Error: ', error.message)
});