import React from 'react';
import NeighborhoodRow from '../components/NeighborhoodRow';
import { SquareObject, SquareRowObject, SquareTypeEnum } from '../models/SquareRowObject';

export interface INeighborhoodPageProps {}

const NeighborhoodPage: React.FunctionComponent<INeighborhoodPageProps> = (props) => {
   
    var neighborhoodMatrix = Array.from(Array(2), () => [] as SquareRowObject[]);
    var allSquareTypes = [
        { rowNumber: 1, houses: ['G','G','G','G','G','G','G','G','G','G','S','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G'] },
        { rowNumber: 2, houses: ['H','G','H','G','H','G','H','G','H','G','S','G','G','H','G','H','G','H','G','H','G','H','G','H','G','H','G','H','G','H','G','H'] },
    ];

    var newSquareRowToNeighborHood: SquareRowObject;
    var runningCount = 0;
    for (var i = 0; i < allSquareTypes.length; i++) { 
        let squareObjects = [] as SquareObject[];
        squareObjects = generateSquareRowObjectsFromType(i, allSquareTypes[i].houses);
        newSquareRowToNeighborHood = new SquareRowObject(i, squareObjects);
        neighborhoodMatrix[i].push(newSquareRowToNeighborHood);
    }

    function generateSquareRowObjectsFromType(row: number, types: string[]) {
        let squareObjects = [];
        for (var i = 0; i < types.length; i++) { 
            let squareType = types[i] === 'G' ? SquareTypeEnum.Grass : types[i] === 'S' ? SquareTypeEnum.Street : SquareTypeEnum.House
            let image = types[i] === 'G' ? '../neighborhood/grass.png' : types[i] === 'S' ? '../neighborhood/road.png' : `../houses/${runningCount}.png`
            let coordinates = [row,i];
            let metaData = types[i] === 'H' ? `../houses/${runningCount}.json` : '';
            let squareObject = new SquareObject(squareType,image,coordinates,metaData,runningCount);
            squareObjects.push(squareObject);
            if(types[i] === 'H'){
                runningCount++;
            }
        }
        return squareObjects;
    }

    return (
     
        <div className="neighborhood-container">
            {neighborhoodMatrix.map((row, o) => {
                return <NeighborhoodRow key={o} row={row} />;
            })}
           
        </div>
    );
};

export default NeighborhoodPage;