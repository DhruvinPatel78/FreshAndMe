export interface CustomButtonInterface {
  title: string;
  onClick: () => void;
  backgroundColor: string;
  disabled: boolean;
  loading?: boolean;
}
