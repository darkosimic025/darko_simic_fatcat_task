import styled from 'styled-components';

import { TextProps } from 'src/components/UI/Text/Text.types';

const fontSizeMap: Record<TextProps['fontSize'], string> = {
  s: '12px',
  m: '16px',
  l: '20px',
  xl: '24px',
  xxl: '32px',
};

export const StyledText = styled.span<TextProps>`
  font-size: ${(props) => (props.fontSize ? fontSizeMap[props.fontSize] : 'inherit')};
  font-weight: ${(props) => props.fontWeight || 'inherit'};
  color: ${(props) => props.color || 'inherit'};
  text-align: ${(props) => props.textAlign || 'inherit'};
`;
