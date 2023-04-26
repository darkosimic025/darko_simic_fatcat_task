import { StyledText } from 'src/components/UI/Text/Text.styled';
import { TextProps } from 'src/components/UI/Text/Text.types';

const Text: React.FC<TextProps> = ({ children, fontSize = 'm', fontWeight, color, textAlign }) => {
  return (
    <StyledText fontSize={fontSize} fontWeight={fontWeight} color={color} textAlign={textAlign}>
      {children}
    </StyledText>
  );
};

export default Text;
