import styled from 'styled-components';

export const CellStyled = styled.div<{
  type: 'empty' | 'start' | 'end' | 'path' | 'blocking';
  matrixSize: number;
}>`
  aspect-ratio: 1 / 1;
  background-color: ${({ type }) =>
    type === 'empty'
      ? '#FAFBFD'
      : type === 'start'
      ? '#017D73'
      : type === 'end'
      ? '#BD271E'
      : type === 'path'
      ? '#006BB4'
      : type === 'blocking'
      ? '#9170B8'
      : '#fff'};
  display: flex;
  align-items: center;
  justify-content: center;
`;
