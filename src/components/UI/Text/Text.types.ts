export interface TextProps {
  children: React.ReactNode;
  fontSize: 's' | 'm' | 'l' | 'xl' | 'xxl';
  fontWeight?: string | number;
  color?: string;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
}
