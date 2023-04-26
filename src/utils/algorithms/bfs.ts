import { moves } from 'src/constants/moves';

import { Coordinate, Move } from '/types/common';

import { isValidCoordinate } from 'src/utils/helpers/coordinateValidation';
import { generateBlockingObjects } from 'src/utils/helpers/generateBlockingObjects';

export function findPathBFS(
  matrixSize: number,
  start: Coordinate,
  end: Coordinate,
  numBlockingObjects: number
): [path: Move[], executionTime: number] {
  const visited: boolean[][] = Array(matrixSize)
    .fill(null)
    .map(() => Array(matrixSize).fill(false));
  const path: Move[] = [];

  function bfs(start: Coordinate, end: Coordinate): boolean {
    const queue: { coord: Coordinate; moves: Move[] }[] = [{ coord: start, moves: [] }];
    visited[start[0]][start[1]] = true;

    while (queue.length > 0) {
      const current = queue.shift();
      if (!current) continue;

      for (const move of moves) {
        const newX = current.coord[0] + move[0];
        const newY = current.coord[1] + move[1];
        const newCoord: Coordinate = [newX, newY];

        if (
          isValidCoordinate(
            newCoord,
            current.moves.slice(-1)[0]?.blockingObjectCoordinates || [],
            matrixSize
          ) &&
          !visited[newX][newY]
        ) {
          const blockingObjects = generateBlockingObjects({
            current: newCoord,
            currentMoves: current.moves,
            matrixSize,
            moves,
            end,
            start,
            numBlockingObjects,
          });
          const newMoves: Move[] = [
            ...current.moves,
            {
              movingObjectCoordinates: newCoord,
              blockingObjectCoordinates: blockingObjects,
            },
          ];

          if (newX === end[0] && newY === end[1]) {
            path.push(...newMoves);
            return true;
          }

          visited[newX][newY] = true;
          queue.push({ coord: newCoord, moves: newMoves });
        }
      }
    }

    return false;
  }
  const startTime = performance.now();
  bfs(start, end);
  const endTime = performance.now();
  const executionTime = endTime - startTime;

  return [path, executionTime];
}
