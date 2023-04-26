import { StyledButton } from './Button.styled';
import { ButtonProps } from './Button.types';

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  active = false,
  size = 'm',
}) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled} active={active} size={size}>
      {children}
    </StyledButton>
  );
};

export default Button;
