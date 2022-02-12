import { client, q } from '../config/db';

export const createNFTForRoom = (wallet: any) =>
    client
        .query(
            q.Create(q.Collection('GentieHodler'), {
                data: {
                    wallet,
                }
            })
        )
        .then(ret => ret)
        .catch(error => console.error('Error: ', error.message));