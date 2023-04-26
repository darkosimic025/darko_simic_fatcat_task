import { ChangeEvent } from 'react';

export interface SelectProps {
  options: Array<{ value: string; label: string }>;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
  disabled?: boolean; // Add disabled prop
}
