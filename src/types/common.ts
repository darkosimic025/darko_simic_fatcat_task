export type Coordinate = [number, number];

export interface Move {
  movingObjectCoordinates: Coordinate;
  blockingObjectCoordinates: Coordinate[];
}
