import { useState } from 'react';

import Button from 'src/components/UI/Button/Button';
import { ButtonGroupProps } from 'src/components/UI/ButtonGroup/ButtonGroup.types';

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  options,
  onButtonClick,
  size = 'm',
  disabled = false,
}) => {
  const [activeButton, setActiveButton] = useState<string>(options[0]);

  const handleClick = (option: string) => {
    setActiveButton(option);
    onButtonClick(option);
  };

  return (
    <div>
      {options.map((option) => (
        <Button
          key={option}
          onClick={() => handleClick(option)}
          disabled={disabled}
          active={option === activeButton}
          size={size}
        >
          {option}
        </Button>
      ))}
    </div>
  );
};

export default ButtonGroup;
