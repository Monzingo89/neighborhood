export class SquareRowObject {
    rowNumber: number;
    houses: SquareObject[];
    constructor(rowNumber: number, houses: SquareObject[]) {
      this.rowNumber = rowNumber;
      this.houses = houses;
    }
}

export class SquareObject {
    squareType: SquareTypeEnum;
    image: string;
    coordinates: number[];
    metaData?: any;
    runningCount: number;
    constructor(squareType: SquareTypeEnum, image: string, coordinates: number[], metaData: any, runningCount: number) {
      this.squareType = squareType;
      this.image = image;
      this.coordinates = coordinates;
      this.metaData = metaData;
      this.runningCount = runningCount;
    }
}

export const enum SquareTypeEnum {
    Grass = 1,
    Street = 2,
    House = 3
}



