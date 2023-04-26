import { Label, SelectContainer, SelectField, SelectOption } from './Select.styled';
import { SelectProps } from './Select.types';

const Select: React.FC<SelectProps> = ({ options, value, onChange, label, disabled }) => {
  return (
    <SelectContainer>
      {label && <Label>{label}</Label>}
      <SelectField value={value} onChange={onChange} disabled={disabled}>
        {options.map((option) => (
          <SelectOption key={option.value} value={option.value}>
            {option.label}
          </SelectOption>
        ))}
      </SelectField>
    </SelectContainer>
  );
};

export default Select;
