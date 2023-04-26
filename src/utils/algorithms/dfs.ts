import { moves } from 'src/constants/moves';

import { Coordinate, Move } from '/types/common';

import { isValidCoordinate } from 'src/utils/helpers/coordinateValidation';
import { generateBlockingObjects } from 'src/utils/helpers/generateBlockingObjects';

export function findPathDFS(
  matrixSize: number,
  start: Coordinate,
  end: Coordinate,
  numBlockingObjects: number
): [path: Move[], executionTime: number] {
  const visited: boolean[][] = Array(matrixSize)
    .fill(null)
    .map(() => Array(matrixSize).fill(false));
  const path: Move[] = [];
  function dfs(
    currentCoord: Coordinate,
    endCoord: Coordinate,
    visited: boolean[][],
    path: Move[]
  ): boolean {
    const [x, y] = currentCoord;

    if (x === endCoord[0] && y === endCoord[1]) {
      return true;
    }

    visited[x][y] = true;

    for (const move of moves) {
      const newX = x + move[0];
      const newY = y + move[1];
      const newCoord: Coordinate = [newX, newY];

      if (
        isValidCoordinate(
          newCoord,
          path.slice(-1)[0]?.blockingObjectCoordinates || [],
          matrixSize
        ) &&
        !visited[newX][newY]
      ) {
        const blockingObjects = generateBlockingObjects({
          current: newCoord,
          currentMoves: path,
          matrixSize,
          moves,
          end,
          start,
          numBlockingObjects,
        });
        const newMoves: Move[] = [
          ...path,
          {
            movingObjectCoordinates: newCoord,
            blockingObjectCoordinates: blockingObjects,
          },
        ];

        if (dfs(newCoord, endCoord, visited, newMoves)) {
          path.push(...newMoves.slice(path.length));
          return true;
        }
      }
    }

    return false;
  }
  const startTime = performance.now();
  dfs(start, end, visited, path);
  const endTime = performance.now();
  const executionTime = endTime - startTime;

  return [path, executionTime];
}
