import styled, { css } from 'styled-components';

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

export const SelectField = styled.select<{ disabled?: boolean }>`
  padding: 4px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 14px;
  min-width: 70px;
  ${({ disabled }) =>
    disabled &&
    css`
      background-color: #f0f0f0;
    `}
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  word-wrap: none;
`;

export const SelectOption = styled.option``;
