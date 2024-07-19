interface InputListItemsProp {
  id: number;
  loginFieldName: string,
  placeholder: string,
  type: string,
  data: string,
  required: boolean,
}

export const inputListItems: InputListItemsProp[] = [
  {
    id: 0,
    loginFieldName: 'Account',
    placeholder: '', 
    type: 'text',
    data: 'userName',
    required: true
  },
  {
    id: 1,
    loginFieldName: 'Password',
    placeholder: '', 
    type: 'password',
    data: 'password',
    required: true
  },
]