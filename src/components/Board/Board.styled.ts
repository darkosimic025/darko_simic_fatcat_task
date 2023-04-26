import styled from 'styled-components';

export const BoardContainer = styled.div<{ matrixSize: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.matrixSize}, 1fr);
  grid-template-rows: repeat(${(props) => props.matrixSize}, 1fr);
  grid-gap: 2px;
  width: 300px;
  background-color: #000;
  border: #000 solid;
  margin: 20px auto;

  @media (min-width: 768px) {
    width: 400px;
  }
`;
