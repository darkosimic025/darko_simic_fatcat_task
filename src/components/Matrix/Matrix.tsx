import { useEffect } from 'react';

import AlgorithmOptions from 'src/components/AlgorithmOptions/AlgorithmOptions';
import Board from 'src/components/Board/Board';
import { ButtonContainer, PageContainer } from 'src/components/Matrix/Matrix.styled';
import MatrixOptions from 'src/components/MatrixOptions/MatrixOptions';
import Button from 'src/components/UI/Button/Button';

import { Coordinate, Move } from '/types/common';

import useMatrixContext from 'src/hooks/useMatrixContext';
import { findPathAStar } from 'src/utils/algorithms/astar';
import { findPathBFS } from 'src/utils/algorithms/bfs';
import { findPathDFS } from 'src/utils/algorithms/dfs';

const calculatePath = (
  algorithm: string,
  matrixSize: number,
  start: Coordinate,
  end: Coordinate,
  numBlockingObjects: number
): Move[] => {
  let newPath: Move[] = [];
  let executionTime = 0;

  switch (algorithm) {
    case 'A*':
      [newPath, executionTime] = findPathAStar(matrixSize, start, end, numBlockingObjects);
      break;
    case 'BFS':
      [newPath, executionTime] = findPathBFS(matrixSize, start, end, numBlockingObjects);
      break;
    case 'DFS':
      [newPath, executionTime] = findPathDFS(matrixSize, start, end, numBlockingObjects);
      break;
    default:
      console.error('Invalid algorithm option');
  }
  console.log(
    `Algorithm: ${algorithm}
     Matrix Size: ${matrixSize}x${matrixSize}
     Start Coordinate: (${start[0]}, ${start[1]})
     End Coordinate: (${end[0]}, ${end[1]})
     Number of Blocking Objects: ${numBlockingObjects}
     Execution Time: ${executionTime.toFixed(2)}ms`
  );
  return newPath;
};

const Matrix: React.FC = () => {
  const matrixContext = useMatrixContext();

  const {
    matrixSize,
    start,
    end,
    path,
    isRunning,
    setCurrentMove,
    setIsRunning,
    setMatrixSize,
    setStart,
    setEnd,
    selectedAlgorithm,
    setPath,
    numBlockingObjects,
    setNumBlockingObjects,
  } = matrixContext;

  useEffect(() => {
    if (path.length > 0) {
      const interval = setInterval(() => {
        setCurrentMove((prevMove: number) => Math.min(prevMove + 1, path.length));
      }, 200);

      return () => clearInterval(interval);
    }
  }, [path, setCurrentMove]);

  const runAllTests = async () => {
    setIsRunning(true);

    const matrixSizes = [5, 10, 20];
    const blockingObjectsSequences = [
      [1, 2, 3],
      [2, 3, 4],
      [3, 4, 5],
    ];
    const start: Coordinate = [0, 0];

    for (const [index, size] of matrixSizes.entries()) {
      setMatrixSize(size);
      const newEnd: [number, number] = [size - 1, size - 1];
      setEnd(newEnd);
      setStart(start);
      for (const numBlockingObjects of blockingObjectsSequences[index]) {
        const newPath = calculatePath(selectedAlgorithm, size, start, newEnd, numBlockingObjects);

        setNumBlockingObjects(numBlockingObjects);
        setPath(newPath);
        setCurrentMove(0);

        await new Promise((resolve) => setTimeout(resolve, 200 * newPath.length));
      }
    }

    setIsRunning(false);
  };

  const runSingleTest = async () => {
    setIsRunning(true);
    const newPath = calculatePath(selectedAlgorithm, matrixSize, start, end, numBlockingObjects);
    setPath(newPath);
    setCurrentMove(0);
    await new Promise((resolve) => setTimeout(resolve, 200 * newPath.length));
    setIsRunning(false);
  };

  return (
    <>
      <PageContainer>
        <AlgorithmOptions />
        <MatrixOptions />
        <Board />
        <ButtonContainer>
          <Button onClick={runSingleTest} disabled={isRunning}>
            Test
          </Button>
          <Button onClick={runAllTests} disabled={isRunning}>
            Test all
          </Button>
        </ButtonContainer>
      </PageContainer>
    </>
  );
};

export default Matrix;
