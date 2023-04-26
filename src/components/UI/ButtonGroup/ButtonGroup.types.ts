export interface ButtonGroupProps {
  options: string[];
  onButtonClick: (selectedOption: string) => void;
  size?: 's' | 'm' | 'l';
  disabled?: boolean;
}
