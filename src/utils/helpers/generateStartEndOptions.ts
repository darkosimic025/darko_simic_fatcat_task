import { Coordinate } from '/types/common';

export function getStartEndOptions(matrixSize: number, otherPoint: Coordinate) {
  const options = [];
  for (let i = 0; i < matrixSize; i++) {
    for (let j = 0; j < matrixSize; j++) {
      const point: Coordinate = [i, j];
      if (point.toString() === otherPoint.toString()) {
        continue;
      }
      options.push({ value: point.toString(), label: `${i}, ${j}` });
    }
  }
  return options;
}
