export interface CustomButtonInterface {
  title: string;
  onClick: () => void;
  icon: string;
  backgroundColor: string;
  iconLib: 'font' | 'font5' | 'mat' | 'matCom' | 'ant' | 'fea';
}
