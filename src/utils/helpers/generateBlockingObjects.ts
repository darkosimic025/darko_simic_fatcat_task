import { Coordinate, Move } from '/types/common';

import { isValidCoordinate } from 'src/utils/helpers/coordinateValidation';

interface BlockingObjectGenerator {
  current: Coordinate;
  currentMoves: Move[];
  start: Coordinate;
  end: Coordinate;
  matrixSize: number;
  moves: Coordinate[];
  numBlockingObjects: number;
}

export function generateBlockingObjects({
  current,
  currentMoves,
  start,
  end,
  matrixSize,
  moves,
  numBlockingObjects,
}: BlockingObjectGenerator): Coordinate[] {
  const blockingObjects: Coordinate[] = [];

  function pathExists(start: Coordinate, end: Coordinate, blockingObjects: Coordinate[]): boolean {
    const visited = Array(matrixSize)
      .fill(null)
      .map(() => Array(matrixSize).fill(false));

    const queue: Coordinate[] = [start];
    visited[start[0]][start[1]] = true;

    while (queue.length > 0) {
      const current = queue.shift();
      if (!current) continue;

      for (const move of moves) {
        const newX = current[0] + move[0];
        const newY = current[1] + move[1];
        const newCoord: Coordinate = [newX, newY];

        if (
          isValidCoordinate(newCoord, blockingObjects, matrixSize) &&
          !visited[newX][newY] &&
          !blockingObjects.some(([bx, by]) => bx === newX && by === newY)
        ) {
          if (newX === end[0] && newY === end[1]) {
            return true;
          }

          visited[newX][newY] = true;
          queue.push(newCoord);
        }
      }
    }

    return false;
  }

  for (let i = 0; i < numBlockingObjects; i++) {
    let x: number, y: number;
    let invalidCoord: boolean;
    do {
      x = Math.floor(Math.random() * matrixSize);
      y = Math.floor(Math.random() * matrixSize);
      invalidCoord =
        (x === current[0] && y === current[1]) ||
        (x === start[0] && y === start[1]) ||
        (x === end[0] && y === end[1]) ||
        blockingObjects.some(([bx, by]) => bx === x && by === y) ||
        currentMoves.some(
          (move) => move.movingObjectCoordinates[0] === x && move.movingObjectCoordinates[1] === y
        );
    } while (invalidCoord);

    const newBlockingObject: Coordinate = [x, y];
    const tempBlockingObjects = [...blockingObjects, newBlockingObject];

    if (pathExists(start, end, tempBlockingObjects)) {
      blockingObjects.push(newBlockingObject);
    }
  }

  return blockingObjects;
}
