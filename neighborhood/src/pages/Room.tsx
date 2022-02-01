import React from 'react';

import { useParams } from 'react-router-dom';

export interface IRoomPageProps {}

const RoomPage: React.FunctionComponent<IRoomPageProps> = (props) => {
    let { number } = useParams();
    return (
        <div>
            <label htmlFor="file">{'public/houses/'+number+'.json'}</label>
        </div>
    );
};

export default RoomPage;