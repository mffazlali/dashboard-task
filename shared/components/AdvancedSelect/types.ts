export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  group?: string;
}

export interface SelectGroup {
  label: string;
  options: SelectOption[];
}

export interface AdvancedSelectSingleProps {
  options: SelectOption[];
  value?: string | number;
  onChange: (value: string | number) => void;
  multiple?: false;
  searchable?: boolean;
  placeholder?: string;
  disabled?: boolean;
  virtualized?: boolean;
  showSelectAll?: boolean;
  className?: string;
}

export interface AdvancedSelectMultipleProps {
  options: SelectOption[];
  value?: (string | number)[];
  onChange: (value: (string | number)[]) => void;
  multiple: true;
  searchable?: boolean;
  placeholder?: string;
  disabled?: boolean;
  virtualized?: boolean;
  showSelectAll?: boolean;
  className?: string;
}

export type AdvancedSelectProps = AdvancedSelectSingleProps | AdvancedSelectMultipleProps;
