import { Dispatch, SetStateAction, createContext } from 'react';

import { Coordinate, Move } from '/types/common';

export interface MatrixContextValue {
  matrixSize: number;
  setMatrixSize: Dispatch<SetStateAction<number>>;
  start: Coordinate;
  setStart: Dispatch<SetStateAction<Coordinate>>;
  end: Coordinate;
  setEnd: Dispatch<SetStateAction<Coordinate>>;
  numBlockingObjects: number;
  setNumBlockingObjects: Dispatch<SetStateAction<number>>;
  path: Move[];
  setPath: Dispatch<SetStateAction<Move[]>>;
  currentMove: number;
  setCurrentMove: Dispatch<SetStateAction<number>>;
  isRunning: boolean;
  setIsRunning: Dispatch<SetStateAction<boolean>>;
  selectedAlgorithm: string;
  setSelectedAlgorithm: Dispatch<SetStateAction<string>>;
}

export const MatrixContext = createContext<MatrixContextValue | null>(null);
