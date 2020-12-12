import {TextInput} from 'react-native';

export interface InputFieldInterface {
  title: string;
  value: string;
  updateState: (updatedValue: string) => void;
  ref?: React.Ref<TextInput>;
  keyboardType:
    | 'default'
    | 'phone-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address';
  inputType: 'URL' | 'password' | 'telephoneNumber' | 'name';
  returnKey: 'done' | 'go' | 'next';
  onSubmitEditing?: any;
  isPassword: boolean;
  maxLength?: number;
  type?: string;
  toMatchValue?: string,
  displayHint?: boolean,
}
