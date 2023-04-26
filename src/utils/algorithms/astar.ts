import { moves } from 'src/constants/moves';

import { Coordinate, Move } from '/types/common';

import { isValidCoordinate } from 'src/utils/helpers/coordinateValidation';
import { generateBlockingObjects } from 'src/utils/helpers/generateBlockingObjects';

export class PriorityQueue<T> {
  private readonly items: T[] = [];
  private readonly compare: (a: T, b: T) => number;

  constructor(compare: (a: T, b: T) => number) {
    this.compare = compare;
  }

  enqueue(item: T): void {
    let added = false;
    for (let i = 0; i < this.items.length; i++) {
      if (this.compare(item, this.items[i]) < 0) {
        this.items.splice(i, 0, item);
        added = true;
        break;
      }
    }
    if (!added) {
      this.items.push(item);
    }
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

export function findPathAStar(
  matrixSize: number,
  start: Coordinate,
  end: Coordinate,
  numBlockingObjects: number
): [path: Move[], executionTime: number] {
  const visited: boolean[][] = Array(matrixSize)
    .fill(null)
    .map(() => Array(matrixSize).fill(false));
  const path: Move[] = [];

  function manhattanDistance(a: Coordinate, b: Coordinate): number {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
  }

  function aStar(start: Coordinate, end: Coordinate): boolean {
    const openSet = new PriorityQueue<{ coord: Coordinate; moves: Move[] }>((a, b) => {
      const f1 = a.moves.length + manhattanDistance(a.coord, end);
      const f2 = b.moves.length + manhattanDistance(b.coord, end);
      return f1 - f2;
    });

    openSet.enqueue({ coord: start, moves: [] });

    while (!openSet.isEmpty()) {
      const current = openSet.dequeue();
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
          openSet.enqueue({ coord: newCoord, moves: newMoves });
        }
      }
    }

    return false;
  }

  const startTime = performance.now();
  aStar(start, end);
  const endTime = performance.now();
  const executionTime = endTime - startTime;

  return [path, executionTime];
}
