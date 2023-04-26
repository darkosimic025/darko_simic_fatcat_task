import { useState } from 'react';

import { MatrixContext, MatrixContextValue } from 'src/components/Context/Context';

import { Coordinate, Move } from '/types/common';

interface MatrixProviderProps {
  children: React.ReactNode;
}

export const MatrixProvider: React.FC<MatrixProviderProps> = ({ children }) => {
  const initialMatrixSize = parseInt(import.meta.env.VITE_APP_MATRIX_SIZE || '10');
  const initialStartCoordinates = (import.meta.env.VITE_APP_START_COORDINATES || '0,0')
    .split(',')
    .map(Number) as Coordinate;
  const initialEndCoordinates = (import.meta.env.VITE_APP_END_COORDINATES || '9,9')
    .split(',')
    .map(Number) as Coordinate;
  const initialNumBlockingObjects = parseInt(import.meta.env.VITE_APP_NUM_BLOCKING_OBJECTS || '3');

  const [matrixSize, setMatrixSize] = useState(initialMatrixSize);
  const [start, setStart] = useState<Coordinate>(initialStartCoordinates);
  const [end, setEnd] = useState<Coordinate>(initialEndCoordinates);
  const [numBlockingObjects, setNumBlockingObjects] = useState(initialNumBlockingObjects);
  const [path, setPath] = useState<Move[]>([]);
  const [currentMove, setCurrentMove] = useState(0);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('A*');
  const [isRunning, setIsRunning] = useState(false);

  const value: MatrixContextValue = {
    matrixSize,
    setMatrixSize,
    start,
    setStart,
    end,
    setEnd,
    numBlockingObjects,
    setNumBlockingObjects,
    path,
    setPath,
    currentMove,
    setCurrentMove,
    selectedAlgorithm,
    setSelectedAlgorithm,
    isRunning,
    setIsRunning,
  };

  return <MatrixContext.Provider value={value}>{children}</MatrixContext.Provider>;
};
