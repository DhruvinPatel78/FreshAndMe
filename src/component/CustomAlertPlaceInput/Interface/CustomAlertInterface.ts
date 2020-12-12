export interface CustomAlertInterface {
  displayAlert: boolean,
  alertTitleText: string,
  onSubmit : (fields: string[], values: string[]) => void,
  onCancel : () => void,
  value: string,
  field: string
}
