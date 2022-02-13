import React from 'react';
import NeighborhoodRow from './NeighborhoodRow';
import { SquareObject, SquareRowObject, SquareTypeEnum } from '../../models/SquareRowObject';

export interface INeighborhoodPageProps {}

const NeighborhoodPage: React.FunctionComponent<INeighborhoodPageProps> = (props) => {
   
    const shouldComponentUpdate = () => false
    
    var neighborhoodMatrix = Array.from(Array(90), () => [] as SquareRowObject[]);
    var allSquareTypes = [
         { rowNumber: 1, houses:['G','G','G','G','G','G','G','G','G','G','S','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G'] },
         { rowNumber: 2, houses:['H','G','H','G','H','G','H','G','H','G','S','G','G','H','G','H','G','H','G','H','G','H','G','H','G','H','G','H','G','H','G','H'] },
         { rowNumber: 3, houses:['S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S'] },
         { rowNumber: 4, houses:['H','G','H','G','H','G','H','G','H','G','S','G','H','G','H','G','H','G','H','G','H','G','H','G','H','G','H','G','H','G','H','G'] },
         { rowNumber: 5, houses:['S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S'] },
         { rowNumber: 6, houses:['G','H','G','H','G','H','G','H','G','H','S','G','S','G','S','G','S','G','S','G','S','G','H','G','H','G','H','G','H','G','G','G'] },
         { rowNumber: 7, houses:['S','S','S','S','S','S','S','S','S','S','S','H','S','H','S','H','S','H','S','H','S','G','S','S','S','S','S','S','S','G','G','G'] },
         { rowNumber: 8, houses:['S','H','G','H','G','H','G','H','G','H','S','G','S','G','S','G','S','G','S','G','S','G','S','G','G','S','G','G','S','H','G','G'], },
        { rowNumber: 9, houses: ['S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','G','H','S','H','G','S','G','G','G'], },
        { rowNumber: 10, houses:['G','G','G','G','G','G','G','G','G','G','S','G','G','G','G','G','G','G','G','G','G','G','S','G','G','S','G','G','S','H','G','G'], },
        { rowNumber: 11, houses:['H','G','H','G','H','G','H','G','H','G','S','G','H','G','H','G','H','G','H','G','H','G','S','G','H','S','H','G','S','G','G','G'], },
        { rowNumber: 12, houses:['S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','G','G','S','G','G','S','H','G','G'], },
        { rowNumber: 13, houses:['H','G','H','G','S','G','H','G','H','G','S','G','H','G','H','G','H','G','H','G','H','G','S','G','H','S','H','G','S','G','G','G'], },
        { rowNumber: 14, houses:['S','S','S','S','S','S','S','S','S','G','S','G','G','G','G','G','G','G','G','G','G','G','S','G','G','S','G','G','S','H','G','G'], },
        { rowNumber: 15, houses:['H','G','H','G','S','G','H','G','H','G','S','S','S','S','S','S','S','S','S','S','S','S','S','G','H','S','H','G','S','G','G','G'], },
        { rowNumber: 16, houses:['S','S','S','S','S','S','S','S','S','G','S','G','H','G','H','G','H','G','H','G','H','G','S','G','G','S','G','G','S','H','G','G'], },
        { rowNumber: 17, houses:['G','H','G','H','S','H','S','H','G','G','S','G','S','S','S','S','S','S','S','S','S','S','S','G','H','S','G','H','S','G','G','G'], },
        { rowNumber: 18, houses:['G','S','S','S','S','G','G','G','G','G','S','G','G','H','G','G','G','G','G','G','G','G','S','G','G','S','G','G','S','H','G','G'], },
        { rowNumber: 19, houses:['H','G','H','G','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','G','G','G'], },
        { rowNumber: 20, houses:['S','S','S','S','S','G','G','G','G','G','S','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G'], },
        { rowNumber: 21, houses:['G','G','G','G','G','G','G','G','G','G','S','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G'], },
        { rowNumber: 22, houses:['G','G','G','G','G','G','G','G','G','G','S','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G'], },
        { rowNumber: 23, houses:['G','G','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','G','G','G','S','S','S','S','S','S','S','S','S','G'], },
        { rowNumber: 24, houses:['G','G','S','G','H','G','H','G','H','G','H','G','H','G','H','G','H','G','S','G','G','G','S','G','H','G','S','G','H','G','S','G'], },
        { rowNumber: 25, houses:['G','G','S','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','S','G','G','G','S','H','G','H','S','H','G','H','S','G'], },
        { rowNumber: 26, houses:['G','G','S','G','H','G','H','G','H','G','H','G','H','G','H','G','G','H','S','G','G','G','S','G','G','G','S','G','G','G','S','G'], },
        { rowNumber: 27, houses:['G','G','S','S','S','S','S','S','S','S','S','S','S','S','S','S','G','G','S','G','G','G','S','H','G','H','S','H','G','H','S','G'], },
        { rowNumber: 28, houses:['G','G','S','G','H','G','H','G','H','G','H','G','H','G','H','G','G','H','S','G','G','G','S','G','G','G','S','G','G','G','S','G'], },
        { rowNumber: 29, houses:['G','G','S','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','S','G','G','G','S','H','G','H','S','H','G','H','S','G'], },
        { rowNumber: 30, houses:['G','G','S','G','H','G','H','G','H','G','H','G','H','G','H','G','G','H','S','G','G','G','S','G','G','G','S','G','G','G','S','G'], },
        { rowNumber: 31, houses:['G','G','S','S','S','S','S','S','S','S','S','S','S','S','S','S','G','G','S','G','G','G','S','H','G','H','S','H','G','H','S','G'], },
        { rowNumber: 32, houses:['G','G','S','G','H','G','H','G','H','G','H','G','H','G','H','G','G','H','S','G','G','G','S','G','G','G','S','G','G','G','S','G'], },
        { rowNumber: 33, houses:['G','G','S','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','S','G','G','G','S','H','G','H','S','H','G','H','S','G'], },
        { rowNumber: 34, houses:['G','G','S','G','H','G','H','G','H','G','H','G','H','G','H','G','G','H','S','G','G','G','S','G','G','G','S','G','G','G','S','G'], },
        { rowNumber: 35, houses:['G','G','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','G'], },
        { rowNumber: 36, houses:['G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G'], },
        { rowNumber: 37, houses:['G','G','S','H','G','H','S','H','G','H','S','H','G','H','S','H','G','H','S','G','G','G','S','H','G','H','S','H','G','H','S','G'], },
        { rowNumber: 38, houses:['G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G'], },
        { rowNumber: 39, houses:['G','G','S','H','G','H','S','H','G','H','S','H','G','H','S','H','G','H','S','G','G','G','S','H','G','H','S','H','G','H','S','G'], },
        { rowNumber: 40, houses:['G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G'], },
        { rowNumber: 41, houses:['G','G','S','H','G','H','S','H','G','H','S','H','G','H','S','H','G','H','S','G','G','G','S','H','G','H','S','H','G','H','S','G'], },
        { rowNumber: 42, houses:['G','G','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','G','G','G','S','S','S','S','S','S','S','S','S','G'], },
        { rowNumber: 43, houses:['G','G','G','G','G','G','G','G','G','G','S','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G'], },
        { rowNumber: 44, houses:['G','G','G','G','G','G','G','G','G','G','S','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G'], },
        { rowNumber: 45, houses:['G','G','G','G','G','G','G','G','G','G','S','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G'], },
        { rowNumber: 46, houses:['G','G','G','G','G','G','G','G','G','G','S','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G'], },
        { rowNumber: 47, houses:['G','G','G','G','G','G','G','G','G','G','S','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G'], },
        { rowNumber: 48, houses:['G','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','G','G'], },
        { rowNumber: 49, houses:['G','S','G','H','G','H','G','H','G','H','G','H','G','S','G','G','G','S','G','H','G','H','G','H','G','H','G','H','G','S','H','G'], },
        { rowNumber: 50, houses:['G','S','G','G','G','G','G','G','G','G','G','G','G','S','H','G','H','S','G','G','G','G','G','G','G','G','G','G','G','S','G','G'], },
        { rowNumber: 51, houses:['G','S','G','H','G','H','G','H','G','H','G','H','G','S','G','G','G','S','G','H','G','H','G','H','G','H','G','H','G','S','H','G'], },
        { rowNumber: 52, houses:['G','S','S','S','S','S','S','S','S','S','S','S','S','S','H','G','H','S','S','S','S','S','S','S','S','S','S','S','S','S','G','G'], },
        { rowNumber: 53, houses:['G','S','G','H','G','H','G','H','G','H','G','H','G','S','G','G','G','S','G','H','G','H','G','H','G','H','G','H','G','S','H','G'], },
        { rowNumber: 54, houses:['G','S','G','G','G','G','G','G','G','G','G','G','G','S','H','G','H','S','G','G','G','G','G','G','G','G','G','G','G','S','G','G'], },
        { rowNumber: 55, houses:['G','S','G','H','G','H','G','H','G','H','G','H','G','S','G','G','G','S','G','H','G','H','G','H','G','H','G','H','G','S','H','G'], },
        { rowNumber: 56, houses:['G','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','G','G'], },
        { rowNumber: 57, houses:['G','S','G','H','G','H','G','H','G','H','G','H','G','S','G','G','G','S','G','H','G','H','G','H','G','H','G','H','G','S','H','G'], },
        { rowNumber: 58, houses:['G','S','G','G','G','G','G','G','G','G','G','G','G','S','H','G','H','S','G','G','G','G','G','G','G','G','G','G','G','S','G','G'], },
        { rowNumber: 59, houses:['G','S','G','H','G','H','G','H','G','H','G','H','G','S','G','G','G','S','G','H','G','H','G','H','G','H','G','H','G','S','H','G'], },
        { rowNumber: 60, houses:['G','S','S','S','S','S','S','S','S','S','S','S','S','S','H','G','H','S','S','S','S','S','S','S','S','S','S','S','S','S','G','G'], },
        { rowNumber: 61, houses:['G','S','G','H','G','H','G','H','G','H','G','H','G','S','G','G','G','S','G','H','G','H','G','H','G','H','G','H','G','S','H','G'], },
        { rowNumber: 62, houses:['G','S','G','G','G','G','G','G','G','G','G','G','G','S','H','G','H','S','G','G','G','G','G','G','G','G','G','G','G','S','G','G'], },
        { rowNumber: 63, houses:['G','S','G','H','G','H','G','H','G','H','G','H','G','S','G','G','G','S','G','H','G','H','G','H','G','H','G','H','G','S','H','G'], },
        { rowNumber: 64, houses:['G','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','G','G'], },
        { rowNumber: 65, houses:['G','G','G','G','G','G','G','G','G','G','S','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G'], },
        { rowNumber: 66, houses:['G','G','G','G','G','G','G','G','G','G','S','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G'], },
        { rowNumber: 67, houses:['G','G','G','G','G','G','G','G','G','G','S','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G'], },
        { rowNumber: 68, houses:['G','G','G','G','G','G','G','G','G','G','S','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G'], },
        { rowNumber: 69, houses:['G','G','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','G'], },
        { rowNumber: 70, houses:['G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G'], },
        { rowNumber: 71, houses:['G','G','S','H','G','H','S','H','G','H','S','H','G','H','S','H','G','H','S','H','G','H','S','H','G','H','S','H','G','H','S','G'], },
        { rowNumber: 72, houses:['G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G'], },
        { rowNumber: 73, houses:['G','G','S','H','G','H','S','H','G','H','S','H','G','H','S','H','G','H','S','H','G','H','S','H','G','H','S','H','G','H','S','G'], },
        { rowNumber: 74, houses:['G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G'], },
        { rowNumber: 75, houses:['G','G','S','H','G','H','S','H','G','H','S','H','G','H','S','H','G','H','S','H','G','H','S','H','G','H','S','H','G','H','S','G'], },
        { rowNumber: 76, houses:['G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G'], },
        { rowNumber: 77, houses:['G','G','S','H','G','H','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','H','G','H','S','G'], },
        { rowNumber: 78, houses:['G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G'], },
        { rowNumber: 79, houses:['G','G','S','H','G','H','S','H','G','H','S','H','G','H','S','H','G','H','S','H','G','H','S','H','G','H','S','H','G','H','S','G'], },
        { rowNumber: 80, houses:['G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G'], },
        { rowNumber: 81, houses:['G','G','S','H','G','H','S','H','G','H','S','H','G','H','S','H','G','H','S','H','G','H','S','H','G','H','S','H','G','H','S','G'], },
        { rowNumber: 82, houses:['G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G'], },
        { rowNumber: 83, houses:['G','G','S','H','G','G','S','H','G','H','S','H','G','H','S','H','G','H','S','H','G','H','S','H','G','H','S','H','G','H','S','G'], },
        { rowNumber: 84, houses:['G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G','G','G','S','G'], },
        { rowNumber: 85, houses:['G','G','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','G'], },
        { rowNumber: 86, houses:['G','G','S','G','H','G','H','G','H','G','H','G','H','G','H','G','H','G','H','G','H','G','H','G','H','G','S','G','H','G','S','G'], },
        { rowNumber: 87, houses:['G','G','S','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','S','G','G','G','S','G'], },
        { rowNumber: 88, houses:['G','G','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','G'], },
        { rowNumber: 89, houses:['G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G'], },
        { rowNumber: 90, houses:['G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G'], },
    ];

    var newSquareRowToNeighborHood: SquareRowObject;
    var runningCountHouse = 0;
    var runningCountNonHouse = 0;
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
            let image = types[i] === 'G' ? '../neighborhood/grass.png' : types[i] === 'S' ? '../neighborhood/road.png' : `../houses/${runningCountHouse}.png`
            let coordinates = [row,i];
            let metaData = types[i] === 'H' ? `../houses/${runningCountHouse}.json` : '';
            let squareObject = types[i] === 'H' ? new SquareObject(squareType,image,coordinates,metaData,runningCountHouse): new SquareObject(squareType,image,coordinates,metaData,runningCountNonHouse);
            squareObjects.push(squareObject);
            if(types[i] === 'H'){
                runningCountHouse++;
            } else{
                runningCountNonHouse++;
            }
        }
        return squareObjects;
    }

    return (
     
        <div>
            {neighborhoodMatrix.map((row, o) => {
                return <NeighborhoodRow key={o} row={row} />;
            })}
           
        </div>
    );
};

export default NeighborhoodPage;