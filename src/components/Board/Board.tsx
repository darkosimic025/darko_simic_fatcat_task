import { BoardContainer } from 'src/components/Board/Board.styled';
import Cell from 'src/components/Cell/Cell';
import useMatrixContext from 'src/hooks/useMatrixContext';

const Board: React.FC = () => {
  const matrixContext = useMatrixContext();

  const { matrixSize } = matrixContext;

  return (
    <BoardContainer matrixSize={matrixSize}>
      {Array.from({ length: matrixSize }).map((_, y) =>
        Array.from({ length: matrixSize }).map((_, x) => <Cell key={`${x}-${y}`} x={x} y={y} />)
      )}
    </BoardContainer>
  );
};

export default Board;
