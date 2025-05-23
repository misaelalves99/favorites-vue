export interface FormInputProps {
  label: string;
  type: string;
  name: string;
  value: string;
}

export interface FormButtonProps {
  text: string;
  onClick: () => void;
}
