import { Coordinate } from '/types/common';

interface CoordinateValidator {
  (coord: Coordinate, blockingObjects: Coordinate[], matrixSize: number): boolean;
}

export const isValidCoordinate: CoordinateValidator = ([x, y], blockingObjects, matrixSize) => {
  if (x < 0 || x >= matrixSize || y < 0 || y >= matrixSize) {
    return false;
  }
  return !blockingObjects.some(([bx, by]) => bx === x && by === y);
};
