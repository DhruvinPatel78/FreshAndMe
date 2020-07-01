export interface InputFieldInterface {
  title: string;
  value: string;
  updateState: (updatedValue: string) => void;
  keyboardType:
    | 'default'
    | 'phone-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address';
  inputType: 'URL' | 'password' | 'telephoneNumber' | 'name';
  returnKey: 'done' | 'go' | 'next';
  onSubmitEditing?: any;
}
