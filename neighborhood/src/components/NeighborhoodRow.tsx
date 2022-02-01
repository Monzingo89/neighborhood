import React from 'react';
import { SquareObject, SquareRowObject, SquareTypeEnum } from '../models/SquareRowObject';
import Grass from './Grass';
import House from './House';
import Street from './Street';

export interface INeighborhoodRowComponentProps {
    row: SquareRowObject[];
}

const NeighborhoodRowComponent: React.FunctionComponent<INeighborhoodRowComponentProps> = (props) => {
    let squareObjects: SquareObject[] = props.row[0].houses;
    
    return (
        <div>
            {squareObjects.map((finalHouse, o) => {
                if(finalHouse.squareType === SquareTypeEnum.Grass){
                    return <Grass key={finalHouse.runningCount} house={finalHouse}/>
                } else if(finalHouse.squareType === SquareTypeEnum.House){
                    return <House key={finalHouse.runningCount} house={finalHouse}/>
                } else if(finalHouse.squareType === SquareTypeEnum.Street){
                    return <Street key={finalHouse.runningCount} house={finalHouse}/>
                }
            })}
        </div>
    );
};

export default NeighborhoodRowComponent;

