import { ChangeEvent } from 'react';

import { SelectContainer } from 'src/components/MatrixOptions/MatrixOptions.styled';
import Select from 'src/components/UI/Select/Select';
import useMatrixContext from 'src/hooks/useMatrixContext';
import { getStartEndOptions } from 'src/utils/helpers/generateStartEndOptions';
import { parseCoordinate } from 'src/utils/helpers/parseCoordinate';

const MatrixOptions: React.FC = () => {
  const matrixContext = useMatrixContext();

  const {
    isRunning,
    matrixSize,
    setMatrixSize,
    setStart,
    start,
    setEnd,
    end,
    numBlockingObjects,
    setNumBlockingObjects,
  } = matrixContext;

  const handleMatrixSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(event.target.value);
    setMatrixSize(newSize);
    setStart([0, 0]);
    setEnd([newSize - 1, newSize - 1]);
  };

  return (
    <SelectContainer>
      <Select
        disabled={isRunning}
        label="Matrix size"
        options={[
          { value: '5', label: '5x5' },
          { value: '10', label: '10x10' },
          { value: '20', label: '20x20' },
        ]}
        value={matrixSize.toString()}
        onChange={handleMatrixSizeChange}
      />
      <Select
        disabled={isRunning}
        label="Start coordinate"
        options={getStartEndOptions(matrixSize, end)}
        value={start.toString()}
        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
          setStart(parseCoordinate(event.target.value))
        }
      />
      <Select
        disabled={isRunning}
        label="End coordinate"
        options={getStartEndOptions(matrixSize, start)}
        value={end.toString()}
        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
          setEnd(parseCoordinate(event.target.value))
        }
      />
      <Select
        disabled={isRunning}
        label="Blocking objects"
        options={[
          { value: '1', label: '1' },
          { value: '2', label: '2' },
          { value: '3', label: '3' },
          { value: '4', label: '4' },
          { value: '5', label: '5' },
        ]}
        value={numBlockingObjects.toString()}
        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
          setNumBlockingObjects(parseInt(event.target.value))
        }
      />
    </SelectContainer>
  );
};

export default MatrixOptions;
