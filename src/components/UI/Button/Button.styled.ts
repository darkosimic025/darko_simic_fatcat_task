import styled from 'styled-components';

export const StyledButton = styled.button<{
  disabled: boolean;
  active: boolean;
  size?: 's' | 'm' | 'l';
}>`
  background-color: ${(props) =>
    props.disabled ? '#ccc' : props.active ? '#0056b3' : 'rgb(0, 119, 204)'};
  border: none;
  border-radius: 4px;
  color: white;
  padding: ${(props) => {
    switch (props.size) {
      case 's':
        return '4px 8px';
      case 'm':
        return '8px 16px';
      case 'l':
        return '12px 24px';
      default:
        return '8px 16px';
    }
  }};
  width: ${(props) => {
    switch (props.size) {
      case 's':
        return '80px';
      case 'm':
        return '100px';
      case 'l':
        return '120px';
      default:
        return '100%';
    }
  }};
  height: ${(props) => {
    switch (props.size) {
      case 's':
        return '24px';
      case 'm':
        return '32px';
      case 'l':
        return '40px';
      default:
        return 'auto';
    }
  }};
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  transition: background-color 0.1s;

  &:hover {
    background-color: ${(props) =>
      props.disabled ? '#ccc' : props.active ? '#004283' : '#0056b3'};
  }
`;
