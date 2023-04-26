import { CellStyled } from 'src/components/Cell/Cell.styled';
import { CellProps } from 'src/components/Cell/Cell.types';
import useMatrixContext from 'src/hooks/useMatrixContext';

const Cell: React.FC<CellProps> = ({ x, y }) => {
  const matrixContext = useMatrixContext();

  const { matrixSize, start, end, path, currentMove } = matrixContext;

  function getCellType(): 'empty' | 'start' | 'end' | 'path' | 'blocking' {
    if (x === start[0] && y === start[1]) return 'start';
    if (x === end[0] && y === end[1]) return 'end';
    for (let i = 0; i < currentMove; i++) {
      const move = path[i];

      if (move.movingObjectCoordinates[0] === x && move.movingObjectCoordinates[1] === y)
        return 'path';
    }

    if (
      currentMove > 0 &&
      path[currentMove - 1].blockingObjectCoordinates.some(
        (coord: any) => coord[0] === x && coord[1] === y
      )
    )
      return 'blocking';

    return 'empty';
  }

  return <CellStyled matrixSize={matrixSize} type={getCellType()} />;
};

export default Cell;
